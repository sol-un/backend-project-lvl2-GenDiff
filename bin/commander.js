#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/gendiff.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two config files and shows the difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'set output format to stylish, plain, or json', 'stylish')
  .arguments('<filepath1> <filepath2> [format]')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
