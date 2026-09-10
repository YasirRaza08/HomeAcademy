// Netlify Serverless Function Handler for Home Academy
// Connects to Turso Cloud Database, executes self-healing migration on cold start,
// and delegates /api/* requests to server/apiRouter.js with full REST API and SSE support.

import { handleApiRequest } from '../../server/apiRouter.js';
import { initDatabase } from '../../data/db.js';

let initPromise = null;
function ensureDatabaseInitialized() {
  if (!initPromise) {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Database init timeout')), 4000)
    );
    initPromise = Promise.race([initDatabase(), timeoutPromise])
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
  // Ensure DB migration and schema initialization are executed with timeout protection
  try {
    await ensureDatabaseInitialized();
  } catch (err) {
    console.warn('[Home Academy] DB init notice:', err.message);
  }

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
  let rawPath = event.path || '/api';
  if (rawPath.startsWith('/.netlify/functions/api')) {
    rawPath = rawPath.replace('/.netlify/functions/api', '/api');
  }
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
        const cleanHeaders = {};

        for (const [k, v] of Object.entries(responseHeaders)) {
          if (k.toLowerCase() === 'set-cookie') {
            const list = Array.isArray(v) ? v : [v];
            multiValueHeaders['Set-Cookie'] = list;
            if (list.length === 1) {
              cleanHeaders['Set-Cookie'] = list[0];
            }
          } else {
            cleanHeaders[k] = Array.isArray(v) ? v.join(', ') : String(v);
          }
        }

        resolve({
          statusCode,
          headers: cleanHeaders,
          multiValueHeaders: Object.keys(multiValueHeaders).length > 0 ? multiValueHeaders : undefined,
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

  let reqPath = url.pathname;
  if (reqPath.startsWith('/.netlify/functions/api')) {
    reqPath = reqPath.replace('/.netlify/functions/api', '/api');
  }

  const mockReq = {
    url: reqPath + url.search,
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
