// Test live production Netlify endpoints
import assert from 'assert';

const BASE_URL = 'https://homeacademylearning.netlify.app';

async function runLiveTests() {
  console.log('====================================================');
  console.log('🌐 RUNNING LIVE PRODUCTION NETLIFY VERIFICATION');
  console.log(`Target: ${BASE_URL}`);
  console.log('====================================================\n');

  // Test 1: Health Check
  console.log('1. Checking Live /api/health/db...');
  const healthRes = await fetch(`${BASE_URL}/api/health/db`);
  assert.strictEqual(healthRes.status, 200);
  const healthJson = await healthRes.json();
  assert.strictEqual(healthJson.connected, true);
  assert.strictEqual(healthJson.database, 'turso');
  console.log('✓ Health check verified against Turso cloud DB.\n');

  // Test 2: Unauthenticated Admin Route Protection (401)
  console.log('2. Verifying Unauthenticated 401 on /api/admin/students...');
  const unauthRes = await fetch(`${BASE_URL}/api/admin/students`);
  assert.strictEqual(unauthRes.status, 401);
  const unauthJson = await unauthRes.json();
  assert.strictEqual(unauthJson.success, false);
  console.log('✓ 401 Unauthorized confirmed on protected admin route.\n');

  // Test 3: Invalid Teacher Login (401)
  console.log('3. Verifying Invalid Password Rejection on /api/admin/login...');
  const badLoginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrUsername: 'teacher', password: 'WrongPassword123!' })
  });
  assert.strictEqual(badLoginRes.status, 401);
  const badLoginJson = await badLoginRes.json();
  assert.strictEqual(badLoginJson.success, false);
  console.log('✓ Invalid password rejected with 401.\n');

  // Test 4: Valid Teacher Login (200 + Cookie + Token)
  console.log('4. Verifying Valid Teacher Login on /api/admin/login...');
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrUsername: 'teacher', password: 'pakistan786', rememberMe: true })
  });
  assert.strictEqual(loginRes.status, 200);
  const loginJson = await loginRes.json();
  assert.strictEqual(loginJson.success, true);
  assert.strictEqual(loginJson.role, 'teacher');
  assert.ok(loginJson.token, 'Must return session token');
  const token = loginJson.token;
  
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('Live Set-Cookie header:', setCookie);
  assert.ok(setCookie && setCookie.includes('ha_admin_session'), 'Live response must set ha_admin_session cookie');
  assert.ok(setCookie.includes('HttpOnly'), 'Live cookie must be HttpOnly');
  console.log('✓ Teacher login successful with secure session token and HTTP-only cookie.\n');

  // Test 5: Verify Session Auto-Restore on /api/admin/me
  console.log('5. Verifying Session Auto-Restore on /api/admin/me with Bearer token...');
  const meRes = await fetch(`${BASE_URL}/api/admin/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert.strictEqual(meRes.status, 200);
  const meJson = await meRes.json();
  assert.strictEqual(meJson.authenticated, true);
  assert.strictEqual(meJson.user.role, 'teacher');
  console.log('✓ Session auto-restore verified on live deployment.\n');

  // Test 6: Verify Admin Student Roster Access (200)
  console.log('6. Verifying Teacher Access to /api/admin/students...');
  const rosterRes = await fetch(`${BASE_URL}/api/admin/students`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert.strictEqual(rosterRes.status, 200);
  const rosterJson = await rosterRes.json();
  assert.ok(Array.isArray(rosterJson.students), 'Students list must be array');
  console.log(`✓ Access granted to teacher roster with ${rosterJson.students.length} real student(s).\n`);

  // Test 7: Verify Password Verification in Change Password
  console.log('7. Verifying Incorrect Current Password Rejection in Change Password...');
  const wrongPassRes = await fetch(`${BASE_URL}/api/admin/security/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword: 'wrongOldPassword',
      newPassword: 'SomeNewPassword123',
      confirmPassword: 'SomeNewPassword123'
    })
  });
  assert.strictEqual(wrongPassRes.status, 401);
  console.log('✓ Wrong current password correctly rejected with 401.\n');

  // Test 8: Logout (Revoke Session & Clear Cookie)
  console.log('8. Verifying Logout on /api/auth/logout...');
  const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({})
  });
  assert.strictEqual(logoutRes.status, 200);
  const logoutCookie = logoutRes.headers.get('set-cookie');
  console.log('Live Logout Set-Cookie header:', logoutCookie);
  assert.ok(logoutCookie && logoutCookie.includes('Max-Age=0'), 'Logout must clear cookie with Max-Age=0');

  // Test 9: Verify Session is Invalidated
  console.log('9. Verifying Session Invalidation after Logout on /api/admin/me...');
  const afterLogoutRes = await fetch(`${BASE_URL}/api/admin/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert.strictEqual(afterLogoutRes.status, 401);
  console.log('✓ Session revocation confirmed in Turso database.\n');

  console.log('====================================================');
  console.log('🎉 ALL LIVE PRODUCTION NETLIFY VERIFICATIONS PASSED 100%!');
  console.log('====================================================\n');
}

runLiveTests().catch(err => {
  console.error('❌ Live test failed:', err);
  process.exit(1);
});
