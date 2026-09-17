from pathlib import Path
from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
ROOT=Path(__file__).resolve().parents[1]
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(ROOT/'prototype')))
Thread(target=server.serve_forever,daemon=True).start()
URL=f'http://127.0.0.1:{server.server_port}/index.html'
HTML=(ROOT/'prototype'/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+ (ROOT/'prototype'/'style.css').read_text()+'</style>').replace('<script src="app.js"></script>','<script>'+ (ROOT/'prototype'/'app.js').read_text()+'</script>')
OUT=ROOT/'fullpage';OUT.mkdir(exist_ok=True)
DEVICES=[('Desktop',1440,900),('Tablet',820,1180),('Mobile',390,844)]
ROUTES=[('home','Beranda'),('services','Layanan'),('programs','Program_Kesehatan'),('insights','Kesehatan_Wilayah'),('public','Informasi_Publik'),('office','Kantor_Virtual')]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
 for device,w,h in DEVICES:
  context=browser.new_context(viewport={'width':w,'height':h},device_scale_factor=1,reduced_motion='reduce')
  pg=context.new_page();errors=[];pg.on('pageerror',lambda err:errors.append(str(err)))
  pg.set_content(HTML,wait_until='load');pg.evaluate('document.fonts.ready')
  for route,label in ROUTES:
   pg.evaluate('(route) => navigate(route, false)',route)
   assert pg.locator('.page.active').count()==1,(device,route,'visible page count')
   assert pg.locator('#page-'+route+'.active').count()==1,(device,route,'wrong route')
   dims=pg.evaluate('({viewport:innerWidth, scroll:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight})')
   assert dims['scroll']<=w+2,(device,route,'horizontal overflow',dims)
   assert dims['height']>h,(device,route,'not full page',dims)
   if route=='services':
    assert pg.locator('.svc-card').count()==6
    pg.locator('#service-search').fill('gigi')
    assert pg.locator('.svc-card').count()==1
    pg.locator('#service-reset').click()
    assert pg.locator('.svc-card').count()==6
    pg.locator('[data-service="ckg"]').click()
    assert pg.locator('#service-detail').is_visible()
    pg.locator('#detail-close').click()
    assert pg.locator('#service-detail').is_hidden()
   if route=='insights':
    pg.locator('[data-topic="ptm"]').click()
    assert 'PTM' in pg.locator('#topic-title').inner_text()
    pg.locator('[data-topic="ckg"]').click()
    assert pg.locator('.health-number-grid strong').all_inner_texts()==['—','—','—']
   if route=='office': assert pg.locator('.o-stat strong').all_inner_texts()==['—']*4
   pg.evaluate('window.scrollTo(0,0)');pg.wait_for_timeout(120)
   path=OUT/f'{label}_{device}_{w}_FULLPAGE.png'
   pg.screenshot(path=str(path),full_page=True,animations='disabled',timeout=30000)
   print(f'PASS {label:23s} {device:7s} {w}x{dims["height"]} overflow=0 -> {path.name}')
  if device=='Mobile':
   pg.locator('#menu-toggle').click()
   assert pg.locator('#navigation').evaluate('(el)=>el.classList.contains("open")')
   pg.locator('#navigation [data-go="services"]').click()
   assert pg.locator('#page-services.active').count()==1
   print('PASS mobile navigation opens and routes')
  assert not errors,(device,'JS errors',errors)
  context.close()
 browser.close()
server.shutdown()
print('ALL CHECKS PASSED: 18 full-page PNGs, six routes x three viewports, menu, search, filters, details, insight topics, no fabricated KPI, no horizontal overflow, no JavaScript errors.')
