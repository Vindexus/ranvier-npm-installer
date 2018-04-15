const {
  sourceDir,
  destinationDir,
  ranvierJSON,
  saveRanvier,
  spawnSync,
  projectDir,
  bundleName
} = require('./lib');

console.log('');
console.log('UNINSTALLING');
console.log('Deleting symlink folder', destinationDir)
const cp = spawnSync('rm', ['-rf', destinationDir], { env: process.env, cwd: projectDir, stdio: 'inherit' })

const index = ranvierJSON.bundles.indexOf(bundleName)
if (index > 0) {
  ranvierJSON.bundles.splice(index, 1)
  console.log('Removing ' + bundleName + ' from ranvier.json bundles')
  saveRanvier()
}

process.exit();


