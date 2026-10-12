const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT || 4380);
const page = path.join(__dirname, 'index.html');
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  if (pathname !== '/' && pathname !== '/index.html') { res.writeHead(404); res.end('Not found'); return; }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(page).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Daynote ready at http://127.0.0.1:${port}`));
