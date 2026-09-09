// Netlify Serverless Function Handler for Home Academy
// Connects to Turso Cloud Database, executes self-healing migration on cold start,
// and delegates /api/* requests to server/apiRouter.js with full REST API and SSE support.

import { handleApiRequest } from '../../server/apiRouter.js';
import { initDatabase } from '../../data/db.js';

// Self-healing schema initialization on serverless function cold start
let initPromise = null;
function ensureDatabaseInitialized() {
  if (!initPromise) {
    initPromise = initDatabase()
      .then(() => {
        console.log('[Home Academy] Production database schema verified on cold start.');
      })
      .catch(err => {
        console.error('[Home Academy] Database initialization error on cold start:', err);
        initPromise = null; // Reset to allow retry on next request
        throw err;
      });
  }
  return initPromise;
}

/**
 * Netlify Function Handler (Modern Web Standard Request/Response)
 */
export default async function handler(request, context) {
  try {
    await ensureDatabaseInitialized();
  } catch (initErr) {
    return new Response(JSON.stringify({
      error: 'Database connection or initialization failed: ' + initErr.message,
      success: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Extract URL, method, headers
  const url = new URL(request.url);
  const method = request.method;
  
  let bodyBuffer = '';
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      bodyBuffer = await request.text();
    } catch (e) {}
  }

  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    headers[k.toLowerCase()] = v;
  }

  const mockReq = {
    url: url.pathname + url.search,
    method,
    headers,
    body: bodyBuffer,
    on(event, fn) {
      if (event === 'data' && bodyBuffer) {
        fn(Buffer.from(bodyBuffer));
      } else if (event === 'end') {
        fn();
      }
      return this;
    }
  };

  return new Promise((resolve) => {
    let statusCode = 200;
    const responseHeaders = {};
    const responseChunks = [];

    const mockRes = {
      headersSent: false,
      writeHead(code, headersObj = {}) {
        statusCode = code;
        Object.assign(responseHeaders, headersObj);
        this.headersSent = true;
      },
      setHeader(name, value) {
        responseHeaders[name.toLowerCase()] = value;
      },
      write(chunk) {
        if (chunk) responseChunks.push(typeof chunk === 'string' ? chunk : chunk.toString());
      },
      end(data) {
        if (data) responseChunks.push(typeof data === 'string' ? data : data.toString());
        const bodyContent = responseChunks.join('');
        resolve(new Response(bodyContent, {
          status: statusCode,
          headers: responseHeaders
        }));
      }
    };

    handleApiRequest(mockReq, mockRes).catch(err => {
      console.error('[Netlify Function API Error]:', err);
      resolve(new Response(JSON.stringify({ error: err.message, success: false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    });
  });
}

/**
 * AWS Lambda / Netlify legacy event-based compatibility handler
 */
export const handlerLegacy = async (event, context) => {
  try {
    await ensureDatabaseInitialized();
  } catch (initErr) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Database initialization failed: ' + initErr.message, success: false })
    };
  }

  const url = new URL(event.rawUrl || `http://localhost${event.path}`);
  const req = {
    url: url.pathname + url.search,
    method: event.httpMethod,
    headers: event.headers || {},
    body: event.body || '',
    on(ev, fn) {
      if (ev === 'data' && event.body) fn(event.body);
      if (ev === 'end') fn();
      return this;
    }
  };

  return new Promise((resolve) => {
    let statusCode = 200;
    const headers = {};
    const chunks = [];

    const res = {
      writeHead(code, h = {}) {
        statusCode = code;
        Object.assign(headers, h);
      },
      write(c) { chunks.push(c); },
      end(data) {
        if (data) chunks.push(data);
        resolve({
          statusCode,
          headers,
          body: chunks.join('')
        });
      }
    };

    handleApiRequest(req, res).catch(err => {
      resolve({
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: err.message, success: false })
      });
    });
  });
};
