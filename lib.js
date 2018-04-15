const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const bundleName = process.argv[2]
const projectDir = process.env.INIT_CWD || path.resolve("../../", __dirname);

if (!bundleName) {
  console.log()
  console.error('ERROR: Bundle name not provided by pre/postinstall script')
  console.log('Make sure to do `"postinstall": "node ./node_modules/ranvier-npm-installer/addtoranvier.js NAME_OF_YOUR_BUNDLE_HERE"')
  console.log()
  process.exit()
}

const sourceDir = path.resolve(projectDir, 'node_modules', bundleName);
const packageJSON = JSON.parse(fs.readFileSync(path.join(sourceDir, 'package.json')));

console.log('bundleName', bundleName);

console.log('process.env.INIT_CWD', process.env.INIT_CWD);
console.log('projectDir', projectDir);
const bundlesDir = path.resolve(projectDir, 'bundles');
const destinationDir = path.join(bundlesDir, bundleName);
console.log('destinationDir', destinationDir);
const ranvierJSONPath = path.join(projectDir, 'ranvier.json')
console.log('ranvierJSONPath', ranvierJSONPath);
const ranvierJSON = require(ranvierJSONPath);

function saveRanvier () {
  const json = JSON.stringify(ranvierJSON, null, 2)
  try {
    JSON.parse(json)
  }
  catch (ex) {
    console.log('Ended up with invalid JSON')
    console.log(json);
    process.exit()
  }
  fs.writeFileSync(ranvierJSONPath, json);
}

module.exports = {
  sourceDir,
  bundlesDir,
  bundleName,
  destinationDir,
  ranvierJSONPath,
  ranvierJSON,
  saveRanvier,
  spawnSync
}