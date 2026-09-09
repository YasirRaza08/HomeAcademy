// Lightweight Zero-Dependency ES Module Static Server for Home Academy
import http from 'http';
import fs from 'fs';
import path from 'path';
import { handleApiRequest } from './server/apiRouter.js';
import { initDatabase } from './data/db.js';

const PORT = process.env.PORT || 3000;
const BASE_DIR = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer(async (req, res) => {
  // Delegate API routes to persistent backend router
  if (req.url.startsWith('/api/') || req.url === '/api') {
    try {
      await handleApiRequest(req, res);
    } catch (err) {
      console.error('[Unhandled Server Error]:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error', success: false }));
      }
    }
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const fullPath = path.join(BASE_DIR, reqPath);

  if (!fullPath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(fullPath).pipe(res);
  });
});

async function startServer() {
  try {
    await initDatabase();
  } catch (dbErr) {
    console.warn('[Database Warning]:', dbErr.message);
  }

  server.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`  HOME ACADEMY — English Language Program`);
    console.log(`  Server running at http://localhost:${PORT}/`);
    console.log(`=========================================`);
  });
}

startServer();