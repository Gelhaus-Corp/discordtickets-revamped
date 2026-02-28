#!/usr/bin/env node
// scripts/vendor-settings.js
// Downloads the @discord-tickets/settings package tarball and extracts
// it into `src/dashboard` so the UI is vendored into this repository.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PKG = '@discord-tickets/settings@latest';
const CWD = process.cwd();
const DEST = path.join(CWD, 'src', 'dashboard');

function run(cmd) {
  console.log('>', cmd);
  return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' }).toString();
}

if (fs.existsSync(DEST)) {
  console.log('Destination already exists at', DEST);
  process.exit(0);
}

try {
  console.log('Packing', PKG);
  const tarball = run(`npm pack ${PKG}`).trim().split('\n').pop().trim();
  if (!tarball || !fs.existsSync(path.join(CWD, tarball))) {
    console.error('Failed to download package tarball:', tarball);
    process.exit(2);
  }

  // extract tarball into a temp directory
  const tmp = path.join(CWD, 'tmp_vendor_settings');
  if (fs.existsSync(tmp)) fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  console.log('Extracting', tarball, 'to', tmp);
  run(`tar -xzf ${tarball} -C ${tmp}`);

  const pkgDir = path.join(tmp, 'package');
  if (!fs.existsSync(pkgDir)) {
    console.error('Extracted package not found at', pkgDir);
    process.exit(3);
  }

  // move package contents into src/dashboard
  fs.renameSync(pkgDir, DEST);
  console.log('Vendored dashboard into', DEST);

  // cleanup tarball and tmp (tmp now moved)
  try { fs.unlinkSync(path.join(CWD, tarball)); } catch (e) {}
  try { fs.rmSync(path.join(CWD, 'tmp_vendor_settings'), { recursive: true, force: true }); } catch (e) {}

  console.log('\nDone. You should restart the app so `src/http.js` will prefer the vendored handler.');
} catch (err) {
  console.error('Vendor step failed:', err);
  process.exit(1);
}
