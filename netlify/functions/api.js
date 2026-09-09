// Netlify Serverless Function Handler for Home Academy
// Connects to Turso Cloud Database, executes self-healing migration on cold start,
// and delegates /api/* requests to server/apiRouter.js with full REST API and SSE support.

import { handleApiRequest } from '../../server/apiRouter.js';
import { initDatabase } from '../../data/db.js';

let initPromise = null;
function ensureDatabaseInitialized() {
  if (!initPromise) {
    initPromise = initDatabase()
      .then(() => {
        console.log('[Home Academy] Production database schema verified on cold start.');
      })
      .catch(err => {
        console.warn('[Home Academy] Database initialization notice on cold start:', err.message);
        initPromise = null; // Reset to allow retry on next request
      });
  }
  return initPromise;
}

/**
 * Universal Handler: Supports both Netlify V1 (AWS Lambda event) and Netlify V2 (Web Request)
 */
export const handler = async (eventOrRequest, context) => {
  // Ensure DB migration in background
  ensureDatabaseInitialized().catch(() => {});

  // Detection: Web API standard Request (Netlify Functions v2)
  if (eventOrRequest && typeof eventOrRequest.text === 'function' && typeof eventOrRequest.url === 'string') {
    return handleWebRequest(eventOrRequest, context);
  }

  // AWS Lambda / Netlify Functions v1 event format
  return handleLambdaEvent(eventOrRequest, context);
};

export default handler;
export const handlerLegacy = handler;

async function handleLambdaEvent(event = {}, context) {
  const rawPath = event.path || '/api';
  const queryString = event.rawQuery ? `?${event.rawQuery}` : (
    event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0
      ? '?' + new URLSearchParams(event.queryStringParameters).toString()
      : ''
  );
  const fullUrlPath = (rawPath.startsWith('/') ? rawPath : `/${rawPath}`) + queryString;

  const mockReq = {
    url: fullUrlPath,
    method: (event.httpMethod || 'GET').toUpperCase(),
    headers: event.headers || {},
    body: event.body || '',
    on(ev, fn) {
      if (ev === 'data' && event.body) fn(Buffer.from(event.body));
      if (ev === 'end') fn();
      return this;
    }
  };

  return new Promise((resolve) => {
    let statusCode = 200;
    const responseHeaders = {
      'content-type': 'application/json; charset=UTF-8',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'access-control-allow-headers': 'Content-Type, Authorization, X-Requested-With'
    };
    const responseChunks = [];

    const mockRes = {
      headersSent: false,
      writeHead(code, h = {}) {
        statusCode = code;
        for (const [k, v] of Object.entries(h)) {
          responseHeaders[k.toLowerCase()] = v;
        }
        this.headersSent = true;
      },
      setHeader(name, val) {
        responseHeaders[name.toLowerCase()] = val;
      },
      write(chunk) {
        if (chunk) responseChunks.push(typeof chunk === 'string' ? chunk : chunk.toString());
      },
      end(data) {
        if (data) responseChunks.push(typeof data === 'string' ? data : data.toString());
        const multiValueHeaders = {};
        if (responseHeaders['set-cookie']) {
          const cookieVal = responseHeaders['set-cookie'];
          multiValueHeaders['Set-Cookie'] = Array.isArray(cookieVal) ? cookieVal : [cookieVal];
          responseHeaders['Set-Cookie'] = Array.isArray(cookieVal) ? cookieVal[0] : cookieVal;
        }
        resolve({
          statusCode,
          headers: responseHeaders,
          multiValueHeaders,
          body: responseChunks.join('')
        });
      }
    };

    handleApiRequest(mockReq, mockRes).catch(err => {
      console.error('[API Router Error]:', err);
      resolve({
        statusCode: 500,
        headers: responseHeaders,
        body: JSON.stringify({ error: err.message, success: false })
      });
    });
  });
}

async function handleWebRequest(request, context) {
  const url = new URL(request.url);
  const method = request.method;
  let bodyBuffer = '';
  if (method !== 'GET' && method !== 'HEAD') {
    try { bodyBuffer = await request.text(); } catch (e) {}
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
      if (event === 'data' && bodyBuffer) fn(Buffer.from(bodyBuffer));
      if (event === 'end') fn();
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
        const webHeaders = new Headers();
        for (const [k, v] of Object.entries(responseHeaders)) {
          if (k.toLowerCase() === 'set-cookie') {
            const cookieList = Array.isArray(v) ? v : [v];
            for (const c of cookieList) {
              webHeaders.append('Set-Cookie', c);
            }
          } else {
            webHeaders.set(k, Array.isArray(v) ? v.join(', ') : v);
          }
        }
        resolve(new Response(responseChunks.join(''), {
          status: statusCode,
          headers: webHeaders
        }));
      }
    };

    handleApiRequest(mockReq, mockRes).catch(err => {
      resolve(new Response(JSON.stringify({ error: err.message, success: false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    });
  });
}
