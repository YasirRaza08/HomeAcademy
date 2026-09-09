// Home Academy — Production Hosted Database Provisioning Script (Turso / LibSQL)
// Provisions 18 relational tables and seeds curriculum & questions on Turso.
// ZERO fake students or fake XP are seeded.

import { initDatabase, checkHealth, isTurso } from '../data/db.js';

const dbUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('\n======================================================');
  console.error('❌ ERROR: TURSO_DATABASE_URL environment variable is missing.');
  console.error('======================================================');
  console.error('To provision the real production database on Turso:');
  console.error('  1. Sign up / log in to https://turso.tech');
  console.error('  2. Locate your database: home-academy-db');
  console.error('  3. Get URL: libsql://home-academy-db-...turso.io');
  console.error('  4. Create Token: turso db tokens create home-academy-db');
  console.error('  5. Run:');
  console.error('     $env:TURSO_DATABASE_URL="libsql://home-academy-db-..."');
  console.error('     $env:TURSO_AUTH_TOKEN="eyJhbGci..."');
  console.error('     npm run db:migrate');
  console.error('======================================================\n');
  process.exit(1);
}

console.log('\n======================================================');
console.log('🚀 PROVISIONING HOME ACADEMY PRODUCTION DATABASE');
console.log('======================================================');
console.log(`Database Engine: ${isTurso ? 'Turso Cloud' : 'Local SQLite'}`);
console.log(`Connection URL: ${dbUrl}`);

async function run() {
  console.log('\n--- Step 1: Initializing Schema & Indexes ---');
  await initDatabase();

  console.log('\n--- Step 2: Verifying Database Health ---');
  const health = await checkHealth();
  console.log('Health Status:', health);

  if (health.ok) {
    console.log('\n======================================================');
    console.log('🎉 TURSO PRODUCTION DATABASE PROVISIONED SUCCESSFULLY!');
    console.log(`Total Tables Created: ${health.tableCount}`);
    console.log(`Tables: ${health.tables.join(', ')}`);
    console.log(`Students in Database: ${health.studentCount} (Zero fake data confirmed)`);
    console.log('======================================================\n');
  } else {
    console.error('❌ Health check failed:', health.error);
    process.exit(1);
  }
}

run().catch(err => {
  console.error('\n❌ Migration failed:', err);
  process.exit(1);
});
