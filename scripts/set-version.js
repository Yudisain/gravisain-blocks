const fs = require('fs');
const path = require('path');

const pluginDir = path.resolve(__dirname, '..');

/**
 * Update Undagital Early Access version inside package.json.
 * Keeps WP.org master files (gravisain-blocks.php, readme.txt) untouched.
 *
 * @param {string} newVersion Target version string (e.g. '0.5.1')
 */
function setUndagitalVersion(newVersion) {
  if (!newVersion || !/^\d+\.\d+(\.\d+)*(-[a-zA-Z0-9.]+)?$/.test(newVersion.trim())) {
    console.error(`❌ Format versi tidak valid: "${newVersion}". Contoh: 0.5.1`);
    process.exit(1);
  }

  const ver = newVersion.trim();
  const pkgPath = path.join(pluginDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.undagitalVersion = ver;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    console.log(`\n✅ Versi Jalur Undagital (Early Access) diset ke: v${ver}`);
    console.log(`   package.json -> "undagitalVersion": "${ver}"`);
    console.log(`   Jalur resmi WP.org tetap di: v${pkg.version}`);
    console.log(`   Siap dibuild dengan: npm run zip:undagital\n`);
  }
  return ver;
}

/**
 * Synchronize plugin version across all official WP.org project files:
 * 1. gravisain-blocks.php (Plugin Header: * Version: X.Y.Z)
 * 2. gravisain-blocks.php (Constant: define( 'GRAVISAIN_BLOCKS_VERSION', 'X.Y.Z' ))
 * 3. readme.txt (Stable tag: X.Y.Z & Changelog entry)
 * 4. package.json (version property)
 *
 * @param {string} newVersion Target version string (e.g. '1.0.0')
 */
function syncVersion(newVersion) {
  if (!newVersion || !/^\d+\.\d+(\.\d+)*(-[a-zA-Z0-9.]+)?$/.test(newVersion.trim())) {
    console.error(`❌ Format versi tidak valid: "${newVersion}". Contoh yang benar: 1.0.1 atau 1.0.0.1`);
    process.exit(1);
  }

  const ver = newVersion.trim();
  console.log(`\n🔄 Menyeragamkan versi resmi (WP.org) Gravisain Blocks ke: v${ver}...`);

  // 1. Update gravisain-blocks.php
  const phpPath = path.join(pluginDir, 'gravisain-blocks.php');
  if (fs.existsSync(phpPath)) {
    let phpContent = fs.readFileSync(phpPath, 'utf8');

    // Update Header: * Version: X.Y.Z
    phpContent = phpContent.replace(
      /(\*\s*Version:\s*)([^\r\n]+)/i,
      `$1${ver}`
    );

    // Update Constant: define( 'GRAVISAIN_BLOCKS_VERSION', 'X.Y.Z' );
    phpContent = phpContent.replace(
      /(define\(\s*['"]GRAVISAIN_BLOCKS_VERSION['"]\s*,\s*['"])([^'"]+)(['"]\s*\);)/,
      `$1${ver}$3`
    );

    fs.writeFileSync(phpPath, phpContent, 'utf8');
    console.log(`  ✓ gravisain-blocks.php (Header & GRAVISAIN_BLOCKS_VERSION: ${ver})`);
  }

  // 2. Update readme.txt
  const readmePath = path.join(pluginDir, 'readme.txt');
  if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // Update Stable tag: X.Y.Z
    readmeContent = readmeContent.replace(
      /(Stable tag:\s*)([^\r\n]+)/i,
      `$1${ver}`
    );

    // If changelog does not have this version yet, add placeholder
    const changelogPattern = new RegExp(`=\\s*${ver.replace(/\./g, '\\.')}\\s*=`);
    if (!changelogPattern.test(readmeContent)) {
      const changelogHeader = '== Changelog ==';
      if (readmeContent.includes(changelogHeader)) {
        const newEntry = `== Changelog ==\n\n= ${ver} =\n* Maintenance update and performance improvements.`;
        readmeContent = readmeContent.replace(changelogHeader, newEntry);
      }
    }

    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log(`  ✓ readme.txt (Stable tag: ${ver})`);
  }

  // 3. Update package.json
  const pkgPath = path.join(pluginDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    // If version has 4 segments (e.g. 1.0.0.1), use 3-segment base for package.json to prevent npm/webpack crash
    const semverSafe = ver.split('.').length > 3 ? ver.split('.').slice(0, 3).join('.') : ver;
    pkg.version = semverSafe;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    console.log(`  ✓ package.json (version: ${semverSafe}${semverSafe !== ver ? ' [SemVer-safe]' : ''})`);
  }

  console.log(`✅ Seluruh file versi resmi berhasil diseragamkan ke v${ver}!\n`);
  return ver;
}

// Allow running directly from CLI: node scripts/set-version.js 1.2.3 OR node scripts/set-version.js --undagital 0.5.1
if (require.main === module) {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  if (args[0] === '--undagital' || args[0] === '-u') {
    const targetVer = args[1];
    if (!targetVer) {
      console.log('Penggunaan:');
      console.log('  npm run set-version:undagital <nomor_versi>');
      console.log('\nContoh:');
      console.log('  npm run set-version:undagital 0.5.1\n');
      process.exit(1);
    }
    setUndagitalVersion(targetVer);
  } else {
    const targetVer = args[0];
    if (!targetVer) {
      console.log('Penggunaan:');
      console.log('  npm run set-version <nomor_versi>           (Untuk versi resmi WP.org)');
      console.log('  npm run set-version:undagital <nomor_versi> (Untuk versi jalur Undagital)');
      console.log('\nContoh:');
      console.log('  npm run set-version 1.0.0');
      console.log('  npm run set-version:undagital 0.5.1\n');
      process.exit(1);
    }
    syncVersion(targetVer);
  }
}

module.exports = { syncVersion, setUndagitalVersion };
