// Netlify Serverless Function Handler for Home Academy
// Delegates /api/* requests to server/apiRouter.js with full REST API and database capabilities

import { handleApiRequest } from '../../server/apiRouter.js';

/**
 * Adapter that converts Node.js handleApiRequest to Netlify standard Response
 */
export default async function handler(request, context) {
  // Extract URL, method, headers
  const url = new URL(request.url);
  const method = request.method;
  
  // Read body if method has body
  let bodyBuffer = '';
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      bodyBuffer = await request.text();
    } catch (e) {}
  }

  // Create mock IncomingMessage
  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    headers[k.toLowerCase()] = v;
  }

  const mockReq = {
    url: url.pathname + url.search,
    method,
    headers,
    body: bodyBuffer,
    on(event, handler) {
      if (event === 'data' && bodyBuffer) {
        handler(Buffer.from(bodyBuffer));
      } else if (event === 'end') {
        handler();
      }
      return this;
    }
  };

  // Create mock ServerResponse that resolves with a web Response
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

// AWS Lambda / Netlify legacy event-based compatibility
export const handlerLegacy = async (event, context) => {
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
