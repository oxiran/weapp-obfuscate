#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));

let defaultConfig = {
  entry: './',
  excludes: ['node_modules', 'miniprogram_npm'],
  desc: '关于本文件的更多信息，请参考文档 代码加固开发者文档',
  switch: true,
};

if (argv.C || argv.config) {
  const config = require(`${process.cwd()}/${argv.C || argv.config}`);
  defaultConfig = Object.assign(defaultConfig, config);
}

const obfuPaths = [];

function getJsPaths(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  dirents.forEach((dirent) => {
    const { name } = dirent;
    if (defaultConfig.excludes.includes(name)) return;

    const direntPath = path.join(dir, name);

    if (dirent.isDirectory()) {
      getJsPaths(direntPath);
    }

    if (/\.(js|JS)$/.test(name)) {
      obfuPaths.push(path.relative('./', direntPath).replace(/\\/g, '/'));
    }
  });
}

getJsPaths(defaultConfig.entry);

const jsonData = {
  desc: defaultConfig.desc,
  switch: defaultConfig.switch,
  configs: obfuPaths.map((obfuPath) => ({ path: obfuPath, sub_switch: true })),
};

try {
  fs.writeFileSync('./code_obfuscation_config.json', JSON.stringify(jsonData, null, '\t'));
  console.log(chalk.hex('#17C557')('code_obfuscation_config.json written success!'));
} catch (error) {
  console.error(error);
}

