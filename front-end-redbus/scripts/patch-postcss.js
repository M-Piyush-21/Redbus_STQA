const fs = require('fs');
const path = require('path');

function patchPostcssPackage(pkgPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  if (!pkg.exports) {
    return false;
  }

  delete pkg.exports;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  return true;
}

function walkPostcssPackages(dir, patched) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name === 'postcss') {
      const pkgPath = path.join(fullPath, 'package.json');
      if (fs.existsSync(pkgPath) && patchPostcssPackage(pkgPath)) {
        patched.push(pkgPath);
      }
      continue;
    }

    if (entry.name === 'node_modules' || entry.name[0] !== '.') {
      walkPostcssPackages(fullPath, patched);
    }
  }
}

const nodeModulesDir = path.join(__dirname, '../node_modules');
const patched = [];

walkPostcssPackages(nodeModulesDir, patched);

if (patched.length) {
  console.log(`Patched postcss exports in ${patched.length} package(s).`);
}
