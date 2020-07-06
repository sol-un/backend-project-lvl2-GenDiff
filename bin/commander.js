#!/usr/bin/env node

import program from 'commander';
import parse from '../src/parser.js';
import genDiff from '../src/gendiff.js';
import render from '../src/stylish.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two config files and shows the difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format: stylish, plain, or json', 'stylish')
  .arguments('<filepath1> <filepath2> [format]')
  .action((filepath1, filepath2, format) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
