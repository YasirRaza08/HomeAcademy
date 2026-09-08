// Test Suite: Netlify Function Handler
import assert from 'assert';
import handler, { handlerLegacy } from './netlify/functions/api.js';

async function testNetlifyFunction() {
  console.log('--- STARTING NETLIFY FUNCTION HANDLER TEST ---');

  // 1. Test GET /api/class-info via Web API Request
  const getReq = new Request('https://home-academy.netlify.app/api/class-info', {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  const getRes = await handler(getReq);
  assert.strictEqual(getRes.status, 200);
  const infoData = await getRes.json();
  console.log('✓ Netlify Function GET /api/class-info:', infoData);
  assert.strictEqual(infoData.success, true);
  assert.strictEqual(infoData.classCode, 'HOME-ENGLISH');
  assert.strictEqual(infoData.teacher, 'Sir Zubair');

  // 2. Test GET /api/leaderboard via Web API Request
  const lbReq = new Request('https://home-academy.netlify.app/api/leaderboard', {
    method: 'GET'
  });
  const lbRes = await handler(lbReq);
  assert.strictEqual(lbRes.status, 200);
  const lbData = await lbRes.json();
  assert.ok(Array.isArray(lbData.leaderboard));
  console.log(`✓ Netlify Function GET /api/leaderboard returned ${lbData.leaderboard.length} entries`);

  // 3. Test POST /api/auth/login with invalid credentials
  const badLoginReq = new Request('https://home-academy.netlify.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'fake@example.com', password: 'wrong' })
  });
  const badLoginRes = await handler(badLoginReq);
  assert.strictEqual(badLoginRes.status, 401);
  console.log('✓ Netlify Function handled rejected authentication with 401');

  // 4. Test Legacy Handler (AWS Lambda format)
  const legacyEvent = {
    rawUrl: 'https://home-academy.netlify.app/api/class-info',
    path: '/api/class-info',
    httpMethod: 'GET',
    headers: {}
  };
  const legacyRes = await handlerLegacy(legacyEvent);
  assert.strictEqual(legacyRes.statusCode, 200);
  const legacyData = JSON.parse(legacyRes.body);
  assert.strictEqual(legacyData.classCode, 'HOME-ENGLISH');
  console.log('✓ Netlify Legacy Event Handler verified (AWS Lambda compatibility)');

  console.log('--- ALL NETLIFY FUNCTION TESTS PASSED SUCCESSFULLY! ---');
}

testNetlifyFunction().catch(err => {
  console.error('Netlify Function Test Failed:', err);
  process.exit(1);
});
