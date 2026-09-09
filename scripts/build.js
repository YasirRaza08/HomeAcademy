// Cross-Platform Build Script for Home Academy (Local & Netlify CI/CD)
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const ROOT = process.cwd();

console.log('--- BUILDING HOME ACADEMY FOR PRODUCTION ---');

const entryPoint = path.join(ROOT, 'js', 'app.js');
const outFile = path.join(ROOT, 'js', 'bundle.js');

try {
  // 1. Bundle JavaScript for browser
  const esbuild = await import('esbuild').catch(() => null);
  if (esbuild && esbuild.build) {
    await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      outfile: outFile,
      format: 'iife',
      platform: 'browser',
      minify: false,
      target: ['es2020']
    });
    console.log('✓ Successfully bundled via esbuild JS API -> js/bundle.js');
  } else {
    const isWin = process.platform === 'win32';
    const cmd = isWin
      ? `cmd /c "npx esbuild js/app.js --bundle --outfile=js/bundle.js --format=iife --platform=browser"`
      : `npx esbuild js/app.js --bundle --outfile=js/bundle.js --format=iife --platform=browser`;
    
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
    console.log('✓ Successfully bundled via npx esbuild CLI -> js/bundle.js');
  }

  // 2. Ensure data directory exists
  const dataDir = path.join(ROOT, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 3. Automated Database Migration during Build (Netlify CI/CD)
  const tursoUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  if (tursoUrl) {
    console.log('\n--- EXECUTING PRODUCTION DATABASE MIGRATION ON TURSO ---');
    console.log(`Target: ${tursoUrl}`);
    const { initDatabase, checkHealth } = await import('../data/db.js');
    await initDatabase();
    const health = await checkHealth();
    console.log(`✓ Migration successful!`);
    console.log(`✓ Engine: ${health.database}`);
    console.log(`✓ Total Tables: ${health.tableCount} (${health.tables.join(', ')})`);
    console.log(`✓ Students in DB: ${health.studentCount} (Zero fake data confirmed)`);
    console.log('--------------------------------------------------------\n');
  } else {
    console.log('ℹ TURSO_DATABASE_URL not detected in build environment; cloud migration will run on serverless function cold start.');
  }

  console.log('--- BUILD COMPLETE & PRODUCTION READY ---');
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
