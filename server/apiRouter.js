// Home Academy - Complete Production REST API Router & Real-Time SSE Broker
// Section 35 Endpoints, Server-Side Grading, Questions Bank & Real Notifications
// Fully Asynchronous, Turso Cloud Database Ready

import { URL } from 'url';
import * as db from '../data/db.js';

// Server-Sent Events active subscriber clients
const sseClients = new Set();

/**
 * Broadcast an event to all connected SSE clients (e.g. real-time leaderboard or admin notifications)
 */
export function broadcastSSE(eventType, data = {}) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (err) {
      sseClients.delete(client);
    }
  }
}

/**
 * Parse incoming JSON request body
 */
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    if (typeof req.body === 'string' && req.body.trim()) {
      try { return resolve(JSON.parse(req.body)); } catch (e) { return reject(new Error('Invalid JSON body')); }
    }

    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 2 * 1024 * 1024) reject(new Error('Request payload too large'));
    });
    req.on('end', () => {
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie || req.headers.Cookie;
  if (!rc) return list;
  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift().trim();
    if (name) {
      list[name] = decodeURIComponent(parts.join('='));
    }
  });
  return list;
}

function buildCookieHeader(name, value, options = {}) {
  const {
    path = '/',
    maxAge,
    httpOnly = true,
    sameSite = 'Lax',
    secure = false
  } = options;

  let cookie = `${name}=${encodeURIComponent(value)}; Path=${path}; SameSite=${sameSite}`;
  if (httpOnly) cookie += '; HttpOnly';
  if (secure) cookie += '; Secure';
  if (maxAge !== undefined) cookie += `; Max-Age=${maxAge}`;
  return cookie;
}

function getCorsHeaders(req) {
  const origin = req.headers.origin || req.headers.Origin || '*';
  const isSpecificOrigin = origin !== '*';
  return {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': isSpecificOrigin ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true'
  };
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    ...extraHeaders
  };
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

function sendJsonWithCookie(req, res, statusCode, data, cookies = []) {
  const corsHeaders = getCorsHeaders(req);
  const cookieHeaders = Array.isArray(cookies) ? cookies : [cookies];
  const headers = {
    ...corsHeaders
  };
  if (cookieHeaders.length > 0) {
    headers['Set-Cookie'] = cookieHeaders.length === 1 ? cookieHeaders[0] : cookieHeaders;
  }
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message, extra = {}) {
  sendJson(res, statusCode, { error: message, success: false, ...extra });
}

// In-Memory Sliding Window Rate Limiter (Brute-force protection)
const rateLimitMap = new Map();

function checkRateLimit(key, maxAttempts = 5, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    return { allowed: true, remaining: maxAttempts };
  }
  if (record.count >= maxAttempts) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  return { allowed: true, remaining: maxAttempts - record.count };
}

function recordFailedAttempt(key, maxAttempts = 5, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
  } else {
    record.count += 1;
  }
}

function resetRateLimit(key) {
  rateLimitMap.delete(key);
}

function getAuthToken(req, url) {
  // 1. Authorization: Bearer <token>
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  // 2. HTTP-Only Cookie: ha_admin_session or ha_session
  const cookies = parseCookies(req);
  if (cookies.ha_admin_session) {
    return cookies.ha_admin_session;
  }
  if (cookies.ha_session) {
    return cookies.ha_session;
  }

  // 3. Query string fallback: ?token=...
  return url.searchParams.get('token') || null;
}

async function requireStudentAuth(req, url) {
  const token = getAuthToken(req, url);
  if (!token) return null;
  const session = await db.getSession(token);
  if (!session || !session.student_id) return null;
  const student = await db.getStudentById(session.student_id);
  if (!student) return null;
  return { session, student, token };
}

async function requireAdminAuth(req, url) {
  const token = getAuthToken(req, url);
  if (!token) {
    return { status: 'unauthenticated', session: null, token: null };
  }
  const session = await db.getSession(token);
  if (!session) {
    return { status: 'unauthenticated', session: null, token: null };
  }
  if (session.role === 'student') {
    return { status: 'forbidden', session, token };
  }
  if (session.role !== 'teacher' && session.role !== 'admin') {
    return { status: 'forbidden', session, token };
  }
  return { status: 'authorized', session, token };
}

/**
 * Main API Request Dispatcher
 */
export async function handleApiRequest(req, res) {
  const host = req.headers.host || 'localhost';
  const url = new URL(req.url, `http://${host}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  // ------------------------------------------------------------------------
  // 0. HEALTH CHECK ENDPOINT (GET /api/health/db)
  // ------------------------------------------------------------------------
  if (pathname === '/api/health/db' && method === 'GET') {
    const health = await db.checkHealth();
    return sendJson(res, health.ok ? 200 : 503, health);
  }

  // ------------------------------------------------------------------------
  // 1. REAL-TIME SERVER-SENT EVENTS (SSE)
  // ------------------------------------------------------------------------
  if (pathname === '/api/events' && method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(`: ping\n\n`);
    res.write(`event: connected\ndata: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`);

    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  // ------------------------------------------------------------------------
  // 2. PUBLIC CLASS CONFIGURATION
  // ------------------------------------------------------------------------
  if ((pathname === '/api/class-info' || pathname === '/api/class/info') && method === 'GET') {
    const settings = await db.getClassSettings();
    return sendJson(res, 200, {
      success: true,
      code: settings.code,
      classCode: settings.code,
      name: settings.name,
      className: settings.name,
      teacher: settings.teacher,
      teacherName: settings.teacher
    });
  }

  // ------------------------------------------------------------------------
  // 3. AUTHENTICATION (POST /auth/join & POST /auth/login)
  // ------------------------------------------------------------------------
  if ((pathname === '/api/auth/join' || pathname === '/api/auth/register') && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const name = body.name || body.fullName;
      const { email, password, avatar, classCode } = body;

      if (!name || !name.trim()) return sendError(res, 400, 'Student name is required');
      if (!email || !email.trim() || !email.includes('@')) return sendError(res, 400, 'A valid email address is required');
      if (!password || password.length < 4) return sendError(res, 400, 'Password must be at least 4 characters long');

      const settings = await db.getClassSettings();
      if (!classCode || classCode.trim().toUpperCase() !== settings.code.toUpperCase()) {
        return sendError(res, 400, 'That class code is not correct. Please check with your teacher.');
      }

      const existing = await db.getStudentByEmail(email);
      if (existing) {
        return sendError(res, 409, 'An account already exists with this email. Please log in instead.');
      }

      const salt = db.generateSaltServer(16);
      const passwordHash = db.hashPasswordServer(password, salt);

      const student = await db.createStudent({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        passwordSalt: salt,
        avatar: avatar || '🦁',
        classCode: settings.code
      });

      const token = await db.createSession(student.userId, student.studentId, 'student');

      // Real-time broadcast for Admin & Leaderboard
      broadcastSSE('student_joined', { studentId: student.id, name: student.name, email: student.email });
      broadcastSSE('new_student_notification', {
        title: 'New Student Joined',
        message: `${student.name} enrolled in the class!`,
        studentId: student.id
      });
      broadcastSSE('leaderboard_update', { trigger: 'new_student' });

      return sendJson(res, 201, {
        success: true,
        token,
        student
      });
    } catch (err) {
      console.error('[API Error Register/Join]:', err);
      return sendError(res, 500, err.message || 'Something went wrong. Please try again.');
    }
  }

  if (pathname === '/api/auth/login' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      if (body.role === 'teacher' || (!body.email && body.password) || body.emailOrUsername || body.username) {
        const identifier = body.emailOrUsername || body.username || body.email || body.identifier;
        const password = body.password;
        const rememberMe = Boolean(body.rememberMe);

        if (!password) return sendError(res, 400, 'Teacher password is required');

        const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || '127.0.0.1';
        const rateLimitKey = `admin_login:${clientIp}:${(identifier || 'teacher').toLowerCase()}`;
        const rateCheck = checkRateLimit(rateLimitKey, 5, 5 * 60 * 1000);
        if (!rateCheck.allowed) {
          return sendError(res, 429, 'Too many failed login attempts. Please wait 5 minutes and try again.', {
            retryAfter: rateCheck.retryAfter
          });
        }

        const teacherUser = await db.verifyTeacherCredentials(identifier, password);
        if (!teacherUser) {
          recordFailedAttempt(rateLimitKey, 5, 5 * 60 * 1000);
          return sendError(res, 401, 'Incorrect password. Please try again.');
        }

        resetRateLimit(rateLimitKey);
        const sessionInfo = await db.createTeacherSession(teacherUser.userId, rememberMe);
        const settings = await db.getClassSettings();

        const isSecure = Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
        const cookieHeader = buildCookieHeader('ha_admin_session', sessionInfo.token, {
          maxAge: sessionInfo.maxAgeSeconds,
          secure: isSecure,
          httpOnly: true,
          sameSite: 'Lax',
          path: '/'
        });

        return sendJsonWithCookie(req, res, 200, {
          success: true,
          token: sessionInfo.token,
          role: 'teacher',
          user: {
            id: teacherUser.userId,
            name: teacherUser.name,
            email: teacherUser.email,
            role: 'teacher'
          },
          teacher: { name: settings.teacher || teacherUser.name, code: settings.code }
        }, cookieHeader);
      }

      const { email, password } = body;
      if (!email || !password) return sendError(res, 400, 'Both email and password are required');

      const student = await db.verifyStudentCredentials(email, password);
      if (!student) {
        return sendError(res, 401, 'Invalid email or password. Please try again.');
      }

      const token = await db.createSession(student.userId, student.studentId, 'student');
      const isSecure = Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
      const studentCookie = buildCookieHeader('ha_session', token, {
        maxAge: 72 * 3600,
        secure: isSecure,
        httpOnly: true,
        sameSite: 'Lax',
        path: '/'
      });

      return sendJsonWithCookie(req, res, 200, { success: true, token, student }, studentCookie);
    } catch (err) {
      console.error('[Login Error]:', err);
      return sendError(res, 500, 'Something went wrong. Please try again.');
    }
  }

  if ((pathname === '/api/auth/logout' || pathname === '/api/admin/logout') && method === 'POST') {
    const token = getAuthToken(req, url);
    if (token) await db.deleteSession(token);
    const isSecure = Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
    const clearAdminCookie = buildCookieHeader('ha_admin_session', '', { maxAge: 0, path: '/', secure: isSecure, httpOnly: true });
    const clearStudentCookie = buildCookieHeader('ha_session', '', { maxAge: 0, path: '/', secure: isSecure, httpOnly: true });
    return sendJsonWithCookie(req, res, 200, { success: true, message: 'Logged out successfully' }, [clearAdminCookie, clearStudentCookie]);
  }

  // ------------------------------------------------------------------------
  // 4. AUTH & USER PROFILE AUTO-RESTORATION (GET /api/auth/me)
  // ------------------------------------------------------------------------
  if (pathname === '/api/auth/me' && method === 'GET') {
    const token = getAuthToken(req, url);
    if (!token) {
      return sendError(res, 401, 'Your session has expired. Please log in again.', { authenticated: false });
    }

    const session = await db.getSession(token);
    if (!session) {
      return sendError(res, 401, 'Your session has expired. Please log in again.', { authenticated: false });
    }

    if (session.role === 'teacher' || session.role === 'admin') {
      const settings = await db.getClassSettings();
      return sendJson(res, 200, {
        success: true,
        authenticated: true,
        role: 'teacher',
        user: {
          id: session.user_id,
          name: settings.teacher || 'Sir Zubair',
          role: 'teacher',
          email: 'teacher@homeacademy.com'
        }
      });
    }

    if (session.role === 'student' && session.student_id) {
      const student = await db.getStudentById(session.student_id);
      if (!student) {
        return sendError(res, 401, 'Student profile not found', { authenticated: false });
      }
      return sendJson(res, 200, {
        success: true,
        authenticated: true,
        role: 'student',
        student,
        user: {
          id: student.userId || student.id,
          name: student.name,
          role: 'student',
          avatar: student.avatar
        }
      });
    }

    return sendError(res, 401, 'Invalid session', { authenticated: false });
  }

  // Student Private Dashboard Data (GET /api/student/me or /api/student/dashboard)
  if ((pathname === '/api/student/me' || pathname === '/api/student/dashboard') && method === 'GET') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized: Invalid or expired student session');
    const [topics, roleplays] = await Promise.all([
      db.getCurriculumTopics(),
      db.getRoleplays()
    ]);
    return sendJson(res, 200, {
      success: true,
      student: auth.student,
      topics,
      roleplays
    });
  }

  if (pathname === '/api/student/progress' && method === 'GET') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');
    return sendJson(res, 200, { success: true, progress: auth.student.topicProgress });
  }

  if (pathname === '/api/student/activities' && method === 'GET') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');
    const attemptsRes = await db.client.execute({
      sql: `SELECT * FROM activity_attempts WHERE student_id = ? ORDER BY completed_at DESC`,
      args: [auth.student.id]
    });
    return sendJson(res, 200, { success: true, activities: attemptsRes.rows });
  }

  if (pathname === '/api/student/roleplays' && method === 'GET') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');
    return sendJson(res, 200, { success: true, roleplays: auth.student.roleplayProgress });
  }

  if (pathname === '/api/student/achievements' && method === 'GET') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');
    return sendJson(res, 200, { success: true, achievements: auth.student.unlockedAchievements });
  }

  // ------------------------------------------------------------------------
  // 5. SERVER-SIDE XP & SUBMISSIONS
  // ------------------------------------------------------------------------

  // Mark Topic Learned
  const learnMatch = pathname.match(/^\/api\/curriculum\/([^/]+)\/learn$/);
  if (learnMatch && method === 'POST') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');

    const topicId = learnMatch[1];
    const result = await db.recordTopicLearn(auth.student.id, topicId);
    if (result.xpAwarded > 0) {
      broadcastSSE('leaderboard_update', { studentId: auth.student.id, topicId });
    }
    return sendJson(res, 200, { success: true, result });
  }

  // Topic Practice
  const practiceMatch = pathname.match(/^\/api\/curriculum\/([^/]+)\/practice$/);
  if (practiceMatch && method === 'POST') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');

    const topicId = practiceMatch[1];
    const body = await parseJsonBody(req);
    const count = parseInt(body.count || 1, 10);
    const result = await db.recordTopicPractice(auth.student.id, topicId, count);
    broadcastSSE('leaderboard_update', { studentId: auth.student.id, topicId });
    return sendJson(res, 200, { success: true, result });
  }

  // Submit Quiz (POST /api/quiz/submit or /api/curriculum/:topicId/quiz)
  const isQuizSubmit = (pathname === '/api/quiz/submit' || pathname.match(/^\/api\/curriculum\/([^/]+)\/quiz$/)) && method === 'POST';
  if (isQuizSubmit) {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');

    const body = await parseJsonBody(req);
    const topicId = body.topicId || pathname.split('/')[3] || 'adjectives';
    const { submissionToken, score, totalQuestions, total, correctAnswers, incorrectAnswers, percentage, percent } = body;

    if (!submissionToken) return sendError(res, 400, 'Missing submissionToken');

    const numTotal = Math.max(1, parseInt(totalQuestions || total || 5, 10));
    const numCorrect = Math.max(0, parseInt(correctAnswers !== undefined ? correctAnswers : (score || 0), 10));
    const numIncorrect = incorrectAnswers !== undefined ? parseInt(incorrectAnswers, 10) : (numTotal - numCorrect);
    const calculatedPercent = Math.min(100, Math.max(0, Math.round((numCorrect / numTotal) * 100)));
    const finalPercent = percentage !== undefined ? percentage : (percent !== undefined ? percent : calculatedPercent);

    const result = await db.recordQuizSubmission({
      studentId: auth.student.id,
      topicId,
      submissionToken,
      score: numCorrect,
      totalQuestions: numTotal,
      correctAnswers: numCorrect,
      incorrectAnswers: Math.max(0, numIncorrect),
      percentage: finalPercent
    });

    if (result.xpEarned > 0) {
      broadcastSSE('leaderboard_update', { studentId: auth.student.id, topicId });
    }

    const xpAwarded = result.xpEarned || 0;
    const newXP = result.student?.xp || 0;
    return sendJson(res, 200, {
      success: true,
      ...result,
      xpAwarded,
      newXP,
      result
    });
  }

  // Complete Activity (POST /api/activities/complete or /api/activities/submit)
  if ((pathname === '/api/activities/complete' || pathname === '/api/activities/submit') && method === 'POST') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');

    const body = await parseJsonBody(req);
    const { topicId, activityType, score = 100, xpReward = 25, idempotencyKey } = body;

    if (!topicId || !activityType) return sendError(res, 400, 'topicId and activityType are required');

    const result = await db.recordActivityCompletion({
      studentId: auth.student.id,
      topicId,
      activityType,
      score: parseInt(score, 10) || 100,
      xpReward: Math.min(50, Math.max(10, parseInt(xpReward, 10) || 25)),
      idempotencyKey
    });

    if (result.xpAwarded > 0) {
      broadcastSSE('leaderboard_update', { studentId: auth.student.id, activityType });
    }

    const xpAwarded = result.xpAwarded !== undefined ? result.xpAwarded : 25;
    const newXP = result.student?.xp || 0;
    return sendJson(res, 200, {
      success: true,
      ...result,
      xpAwarded,
      newXP,
      result
    });
  }

  // Complete Roleplay (POST /api/roleplay/complete or /api/roleplays/:id/complete)
  const rpCompleteMatch = pathname.match(/^\/api\/roleplays?\/([^/]+)\/complete$/) || (pathname === '/api/roleplay/complete' ? [null, 'rp_01'] : null);
  if (rpCompleteMatch && method === 'POST') {
    const auth = await requireStudentAuth(req, url);
    if (!auth) return sendError(res, 401, 'Unauthorized');

    const body = await parseJsonBody(req);
    const roleplayId = body.roleplayId || rpCompleteMatch[1];
    const percent = Math.min(100, Math.max(0, parseInt(body.percent || body.score || 100, 10)));
    const score = parseInt(body.score || percent, 10);
    const speakingScore = parseInt(body.speakingScore || percent, 10);

    const result = await db.recordRoleplayAttempt({
      studentId: auth.student.id,
      roleplayId,
      score,
      speakingScore,
      percent
    });

    if (result.xpEarned > 0) {
      broadcastSSE('leaderboard_update', { studentId: auth.student.id, roleplayId });
    }

    const xpAwarded = result.xpEarned !== undefined ? result.xpEarned : 50;
    const newXP = result.student?.xp || 0;
    return sendJson(res, 200, {
      success: true,
      ...result,
      xpAwarded,
      newXP,
      result
    });
  }

  // ------------------------------------------------------------------------
  // 6. PUBLIC QUESTIONS & RANDOM PRACTICE
  // ------------------------------------------------------------------------
  const qByTopicMatch = pathname.match(/^\/api\/curriculum\/([^/]+)\/questions$/);
  if (qByTopicMatch && method === 'GET') {
    const topicId = qByTopicMatch[1];
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const randomize = url.searchParams.get('random') !== 'false';
    const questions = await db.getQuestionsByTopic(topicId, limit, randomize);
    return sendJson(res, 200, { success: true, questions });
  }

  // ------------------------------------------------------------------------
  // 7. REAL LEADERBOARD (NO EMAIL PRIVACY LEAK)
  // ------------------------------------------------------------------------
  if (pathname === '/api/leaderboard' && method === 'GET') {
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const leaderboard = await db.getLeaderboard(limit);
    return sendJson(res, 200, { success: true, leaderboard, count: leaderboard.length });
  }

  // ------------------------------------------------------------------------
  // 8. PUBLIC CURRICULUM & ROLEPLAYS
  // ------------------------------------------------------------------------
  if (pathname === '/api/curriculum' && method === 'GET') {
    const topics = await db.getCurriculumTopics(false);
    return sendJson(res, 200, { success: true, topics });
  }

  if (pathname === '/api/roleplays' && method === 'GET') {
    const roleplays = await db.getRoleplays(false);
    return sendJson(res, 200, { success: true, roleplays });
  }

  // ------------------------------------------------------------------------
  // 9. TEACHER / ADMIN DASHBOARD & MANAGEMENT (SERVER-SIDE PROTECTED)
  // ------------------------------------------------------------------------
  if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/login') {
    const adminAuth = await requireAdminAuth(req, url);
    if (adminAuth.status === 'unauthenticated') {
      return sendError(res, 401, "You don't have permission to access this area.", { code: 'UNAUTHORIZED' });
    }
    if (adminAuth.status === 'forbidden') {
      return sendError(res, 403, 'Access denied. Teacher privileges required.', { code: 'FORBIDDEN' });
    }
    req.adminAuth = adminAuth;
  }

  if (pathname === '/api/admin/login' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const identifier = body.emailOrUsername || body.username || body.email || body.identifier;
      const password = body.password;
      const rememberMe = Boolean(body.rememberMe);

      if (!password) return sendError(res, 400, 'Teacher password is required');

      // Rate limit check: max 5 failed attempts per 5 minutes per IP + identifier
      const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || '127.0.0.1';
      const rateLimitKey = `admin_login:${clientIp}:${(identifier || 'teacher').toLowerCase()}`;
      const rateCheck = checkRateLimit(rateLimitKey, 5, 5 * 60 * 1000);
      if (!rateCheck.allowed) {
        return sendError(res, 429, 'Too many failed login attempts. Please wait 5 minutes and try again.', {
          retryAfter: rateCheck.retryAfter
        });
      }

      const teacherUser = await db.verifyTeacherCredentials(identifier, password);
      if (!teacherUser) {
        recordFailedAttempt(rateLimitKey, 5, 5 * 60 * 1000);
        return sendError(res, 401, 'Incorrect password. Please try again.');
      }

      resetRateLimit(rateLimitKey);
      const sessionInfo = await db.createTeacherSession(teacherUser.userId, rememberMe);
      const settings = await db.getClassSettings();

      const isSecure = Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
      const cookieHeader = buildCookieHeader('ha_admin_session', sessionInfo.token, {
        maxAge: sessionInfo.maxAgeSeconds,
        secure: isSecure,
        httpOnly: true,
        sameSite: 'Lax',
        path: '/'
      });

      return sendJsonWithCookie(req, res, 200, {
        success: true,
        token: sessionInfo.token,
        role: 'teacher',
        user: {
          id: teacherUser.userId,
          name: teacherUser.name,
          email: teacherUser.email,
          role: 'teacher'
        },
        teacher: { name: settings.teacher || teacherUser.name, code: settings.code }
      }, cookieHeader);
    } catch (err) {
      console.error('[Admin Login Error]:', err);
      return sendError(res, 500, 'Internal Server Error');
    }
  }

  if (pathname === '/api/admin/me' && method === 'GET') {
    const settings = await db.getClassSettings();
    return sendJson(res, 200, {
      success: true,
      authenticated: true,
      user: {
        id: req.adminAuth.session.user_id,
        name: settings.teacher || 'Sir Zubair',
        role: 'teacher',
        email: 'teacher@homeacademy.com'
      }
    });
  }

  // Admin: Overview Stats (GET /api/admin/overview)
  if (pathname === '/api/admin/overview' && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');

    const [students, settings] = await Promise.all([
      db.getAllStudents(),
      db.getClassSettings()
    ]);
    const totalXP = students.reduce((sum, s) => sum + (s.xp || 0), 0);
    const avgLevel = students.length > 0 ? (students.reduce((sum, s) => sum + (s.level || 1), 0) / students.length).toFixed(1) : '1.0';

    return sendJson(res, 200, {
      success: true,
      stats: {
        totalStudents: students.length,
        classCode: settings.code,
        className: settings.name,
        teacher: settings.teacher,
        totalXP,
        averageLevel: avgLevel,
        activeTopics: 6,
        activeRoleplays: 5
      }
    });
  }

  // Admin: Get all students roster (GET /api/admin/students or /api/admin/roster)
  if ((pathname === '/api/admin/students' || pathname === '/api/admin/roster') && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const students = await db.getAllStudents();
    return sendJson(res, 200, { success: true, students, count: students.length });
  }

  // Admin: Student Dossier Profile (GET /api/admin/students/:id)
  const studentDetailMatch = pathname.match(/^\/api\/admin\/students\/([^/]+)$/);
  if (studentDetailMatch && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');

    const studentId = studentDetailMatch[1];
    const profile = await db.getStudentDetailedProfile(studentId);
    if (!profile) return sendError(res, 404, 'Student record not found');
    return sendJson(res, 200, { success: true, profile });
  }

  // Admin: Delete student (DELETE /api/admin/students/:id)
  if (studentDetailMatch && method === 'DELETE') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');

    const studentId = studentDetailMatch[1];
    const success = await db.deleteStudentById(studentId);
    broadcastSSE('leaderboard_update', { trigger: 'student_deleted' });
    return sendJson(res, 200, { success, message: 'Student removed from database' });
  }

  // Admin: Award manual XP
  if (pathname === '/api/admin/award-xp' && method === 'POST') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');

    try {
      const body = await parseJsonBody(req);
      const { studentId, amount, reason } = body;
      const numAmount = parseInt(amount, 10);
      if (!studentId || isNaN(numAmount) || numAmount <= 0) {
        return sendError(res, 400, 'Valid studentId and positive XP amount required');
      }

      const result = await db.awardXP({
        studentId,
        amount: numAmount,
        source: reason ? `teacher_bonus: ${reason}` : 'teacher_bonus'
      });

      broadcastSSE('leaderboard_update', { trigger: 'xp_awarded', studentId });
      return sendJson(res, 200, { success: true, result });
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  }

  // Admin: Questions Management
  if (pathname === '/api/admin/questions' && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const topicId = url.searchParams.get('topicId') || null;
    const questions = await db.getAllQuestionsAdmin(topicId);
    return sendJson(res, 200, { success: true, questions, count: questions.length });
  }

  if (pathname === '/api/admin/questions' && method === 'POST') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      const body = await parseJsonBody(req);
      const qId = await db.createQuestion(body);
      return sendJson(res, 201, { success: true, questionId: qId, question: { questionId: qId, ...body } });
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  }

  const qAdminMatch = pathname.match(/^\/api\/admin\/questions\/([^/]+)$/);
  if (qAdminMatch && method === 'PATCH') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      const body = await parseJsonBody(req);
      await db.updateQuestion(qAdminMatch[1], body);
      return sendJson(res, 200, { success: true, updated: qAdminMatch[1] });
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  }

  const qIdToDelete = qAdminMatch ? qAdminMatch[1] : (pathname === '/api/admin/questions' ? url.searchParams.get('id') : null);
  if (qIdToDelete && method === 'DELETE') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    await db.deleteQuestion(qIdToDelete);
    return sendJson(res, 200, { success: true, deleted: qIdToDelete });
  }

  // Admin: Real-Time Notifications
  if (pathname === '/api/admin/notifications' && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const notifications = await db.getNotifications('teacher', limit);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return sendJson(res, 200, { success: true, notifications, count: notifications.length, unreadCount });
  }

  if ((pathname === '/api/admin/notifications/read' || pathname === '/api/admin/notifications/mark-read') && (method === 'PATCH' || method === 'POST')) {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    await db.markNotificationsAsRead('teacher');
    return sendJson(res, 200, { success: true, message: 'All notifications marked as read' });
  }

  // Admin: Curriculum Management
  if (pathname === '/api/admin/curriculum' && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const topics = await db.getCurriculumTopics(true);
    return sendJson(res, 200, { success: true, topics });
  }

  const currToggleMatch = pathname.match(/^\/api\/admin\/curriculum\/([^/]+)\/toggle$/);
  if (currToggleMatch && method === 'PATCH') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      const active = await db.toggleCurriculumTopic(currToggleMatch[1]);
      broadcastSSE('curriculum_updated', { topicId: currToggleMatch[1], active });
      return sendJson(res, 200, { success: true, active });
    } catch (err) {
      return sendError(res, 404, err.message);
    }
  }

  const currDeleteMatch = pathname.match(/^\/api\/admin\/curriculum\/([^/]+)$/);
  if (currDeleteMatch && method === 'DELETE') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      await db.deleteCurriculumTopic(currDeleteMatch[1]);
      broadcastSSE('curriculum_updated', { deleted: currDeleteMatch[1] });
      const topics = await db.getCurriculumTopics(true);
      return sendJson(res, 200, { success: true, topics });
    } catch (err) {
      return sendError(res, 404, err.message);
    }
  }

  if (pathname === '/api/admin/curriculum/reset' && method === 'POST') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const topics = await db.resetCurriculumTopics();
    broadcastSSE('curriculum_updated', { reset: true });
    return sendJson(res, 200, { success: true, topics });
  }

  // Admin: Roleplay Management
  if (pathname === '/api/admin/roleplays' && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const roleplays = await db.getRoleplays(true);
    return sendJson(res, 200, { success: true, roleplays });
  }

  const rpToggleMatch = pathname.match(/^\/api\/admin\/roleplays\/([^/]+)\/toggle$/);
  if (rpToggleMatch && method === 'PATCH') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      const active = await db.toggleRoleplayActive(rpToggleMatch[1]);
      broadcastSSE('roleplay_updated', { roleplayId: rpToggleMatch[1], active });
      return sendJson(res, 200, { success: true, active });
    } catch (err) {
      return sendError(res, 404, err.message);
    }
  }

  const rpUpdateMatch = pathname.match(/^\/api\/admin\/roleplays\/([^/]+)$/);
  if (rpUpdateMatch && method === 'PUT') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      const body = await parseJsonBody(req);
      const updated = await db.updateRoleplay(rpUpdateMatch[1], body);
      broadcastSSE('roleplay_updated', { updated: rpUpdateMatch[1] });
      return sendJson(res, 200, { success: true, roleplay: updated });
    } catch (err) {
      return sendError(res, 404, err.message);
    }
  }

  const rpDeleteMatch = pathname.match(/^\/api\/admin\/roleplays\/([^/]+)$/);
  if (rpDeleteMatch && method === 'DELETE') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      await db.deleteRoleplay(rpDeleteMatch[1]);
      broadcastSSE('roleplay_updated', { deleted: rpDeleteMatch[1] });
      const roleplays = await db.getRoleplays(true);
      return sendJson(res, 200, { success: true, roleplays });
    } catch (err) {
      return sendError(res, 404, err.message);
    }
  }

  if (pathname === '/api/admin/roleplays/reset' && method === 'POST') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const roleplays = await db.resetRoleplays();
    broadcastSSE('roleplay_updated', { reset: true });
    return sendJson(res, 200, { success: true, roleplays });
  }

  // Admin: Class Settings
  if (pathname === '/api/admin/settings' && method === 'GET') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    const settings = await db.getClassSettings();
    return sendJson(res, 200, { success: true, settings });
  }

  if (pathname === '/api/admin/settings' && method === 'PUT') {
    const admin = await requireAdminAuth(req, url);
    if (!admin) return sendError(res, 401, 'Unauthorized');
    try {
      const body = await parseJsonBody(req);
      const updated = await db.updateClassSettings(body);
      broadcastSSE('settings_updated', updated);
      return sendJson(res, 200, { success: true, settings: updated });
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  }

  // Admin: Change Password (POST /api/admin/security/change-password or /api/admin/change-password)
  if ((pathname === '/api/admin/security/change-password' || pathname === '/api/admin/change-password') && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { newPassword, currentPassword, confirmPassword } = body;

      if (!currentPassword) {
        return sendError(res, 400, 'Current password is required.');
      }
      if (!newPassword || newPassword.length < 6) {
        return sendError(res, 400, 'New password must be at least 6 characters long.');
      }
      if (confirmPassword && newPassword !== confirmPassword) {
        return sendError(res, 400, 'New passwords do not match.');
      }
      if (newPassword === currentPassword) {
        return sendError(res, 400, 'New password must be different from current password.');
      }

      // Rate limit password change attempts
      const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || '127.0.0.1';
      const pwRateKey = `admin_pw_change:${clientIp}`;
      const pwRate = checkRateLimit(pwRateKey, 5, 5 * 60 * 1000);
      if (!pwRate.allowed) {
        return sendError(res, 429, 'Too many failed password change attempts. Please wait 5 minutes and try again.', {
          retryAfter: pwRate.retryAfter
        });
      }

      const isValidCurrent = await db.verifyTeacherPassword(currentPassword);
      if (!isValidCurrent) {
        recordFailedAttempt(pwRateKey, 5, 5 * 60 * 1000);
        return sendError(res, 401, 'Current password is incorrect.');
      }

      resetRateLimit(pwRateKey);
      await db.updateTeacherPassword(newPassword);

      // Issue a fresh active session for the authenticated teacher so current portal stays open
      const newSession = await db.createTeacherSession(req.adminAuth.session.user_id, req.adminAuth.session.remember_me === 1);
      const isSecure = Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
      const newCookie = buildCookieHeader('ha_admin_session', newSession.token, {
        maxAge: newSession.maxAgeSeconds,
        secure: isSecure,
        httpOnly: true,
        sameSite: 'Lax',
        path: '/'
      });

      return sendJsonWithCookie(req, res, 200, {
        success: true,
        message: 'Your password has been changed successfully.',
        token: newSession.token
      }, newCookie);
    } catch (err) {
      return sendError(res, 500, err.message || 'Failed to update password.');
    }
  }

  // Admin: Logout All Devices (POST /api/admin/security/logout-all or /api/admin/logout-all)
  if ((pathname === '/api/admin/security/logout-all' || pathname === '/api/admin/logout-all') && method === 'POST') {
    try {
      await db.revokeAllTeacherSessions(req.adminAuth.session.user_id);
      const isSecure = Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https');
      const clearCookie = buildCookieHeader('ha_admin_session', '', { maxAge: 0, path: '/', secure: isSecure, httpOnly: true });
      return sendJsonWithCookie(req, res, 200, {
        success: true,
        message: 'Logged out of all devices successfully.'
      }, clearCookie);
    } catch (err) {
      return sendError(res, 500, 'Failed to log out from all devices.');
    }
  }

  return sendError(res, 404, `API route not found: ${method} ${pathname}`);
}
