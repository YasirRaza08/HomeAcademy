// Cross-Platform Build Script for Home Academy (Local & Netlify CI/CD)
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- BUILDING HOME ACADEMY FOR PRODUCTION ---');

const entryPoint = path.join(ROOT, 'js', 'app.js');
const outFile = path.join(ROOT, 'js', 'bundle.js');

try {
  // Attempt to use esbuild programmatically if installed
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
    // Fallback to npx CLI
    const isWin = process.platform === 'win32';
    const cmd = isWin
      ? `cmd /c "npx esbuild js/app.js --bundle --outfile=js/bundle.js --format=iife --platform=browser"`
      : `npx esbuild js/app.js --bundle --outfile=js/bundle.js --format=iife --platform=browser`;
    
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
    console.log('✓ Successfully bundled via npx esbuild CLI -> js/bundle.js');
  }

  // Ensure data directory exists
  const dataDir = path.join(ROOT, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  console.log('--- BUILD COMPLETE & PRODUCTION READY ---');
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
