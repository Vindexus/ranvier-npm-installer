const {
  sourceDir,
  destinationDir,
  ranvierJSON,
  saveRanvier,
  spawnSync,
  projectDir,
  bundleName
} = require('./lib');

console.log('Symlinking bundle')
console.log('from: ' + sourceDir)
console.log('to:   ' + destinationDir)
const cp = spawnSync('ln', ['-s', sourceDir, destinationDir], { env: process.env, cwd: projectDir, stdio: 'inherit' })

if (ranvierJSON.bundles.indexOf(bundleName) == -1) {
  console.log('Adding ' + bundleName + ' to ranvier.json bundles')
  ranvierJSON.bundles.push(bundleName);
  saveRanvier()
}

process.exit();


