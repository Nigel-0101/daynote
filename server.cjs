const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT || 4380);
const page = path.join(__dirname, 'index.html');
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  const assets = {'/assets/SourceHanSansCN-VF.woff2':['assets/SourceHanSansCN-VF.woff2','font/woff2'],'/assets/SourceHanSans-LICENSE.txt':['assets/SourceHanSans-LICENSE.txt','text/plain; charset=utf-8'],'/manifest.webmanifest':['manifest.webmanifest','application/manifest+json'],'/icons/daynote-192.png':['icons/daynote-192.png','image/png'],'/icons/daynote-512.png':['icons/daynote-512.png','image/png']};
  const asset = assets[pathname];
  if (pathname !== '/' && pathname !== '/index.html' && !asset) { res.writeHead(404); res.end('Not found'); return; }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  const target=asset?path.join(__dirname,asset[0]):page;
  if(!fs.existsSync(target)){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200, { 'Content-Type': asset?asset[1]:'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(target).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Daynote ready at http://127.0.0.1:${port}`));
