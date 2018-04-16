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
const args = ['-sf', sourceDir, destinationDir]
const cp = spawnSync('ln', args, { env: process.env, cwd: projectDir, stdio: 'inherit' })
console.log('ln ' + args.join(" "))

if (ranvierJSON.bundles.indexOf(bundleName) == -1) {
  console.log('Adding ' + bundleName + ' to ranvier.json bundles')
  ranvierJSON.bundles.push(bundleName);
  saveRanvier()
}

process.exit();


