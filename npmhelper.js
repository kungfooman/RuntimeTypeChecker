import {readFileSync, writeFileSync} from 'fs';
import {execSync} from 'child_process';
/*
cd plugin-parcel1 && npm publish
cd ..
cd plugin-parcel2 && npm publish
cd ..
cd plugin-rollup && npm publish
cd ..
cd plugin-webpack4 && npm publish
cd ..
cd plugin-webpack5 && npm publish
cd ..
*/
const dirs = [
  '@runtime-type-inspector/runtime',
  '@runtime-type-inspector/transpiler',
  'plugin-parcel1',
  'plugin-parcel2',
  'plugin-rollup',
  'plugin-webpack',
  'plugin-webpack4',
  'plugin-webpack5',
  'repl',
];
const newVersion = '3.2.0';
for (const dir of dirs) {
  const file = `${dir}/package.json`;
  const command = [
    `cd ${dir}`,
    'npm publish'
  ].join(' && ');
  //console.log(`# Package: ${dir}`);
  //console.log(command);
  //execSync(command);
  const content = readFileSync(file, 'utf8');
  const json = JSON.parse(content);
  json.version = newVersion;
  for (const key in json.dependencies) {
    if (key.includes('runtime-type-inspector')) {
      json.dependencies[key] = `^${newVersion}`;
    }
  }
  const newContent = JSON.stringify(json, null, 2) + '\n';
  writeFileSync(file, newContent);
}
for (const dir of dirs) {
  const command = [
    `cd ${dir}`,
    'npm publish',
  ].join(' && ') + '\ncd ..';
  console.log(command);
}
for (const dir of dirs) {
  const file = `${dir}/package.json`;
  const content = readFileSync(file, 'utf8');
  const json = JSON.parse(content);
  console.log(`Publish ${json.name}@${json.version}`);
}