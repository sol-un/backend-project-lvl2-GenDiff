#!/usr/bin/env node

import program from 'commander';
import compareFiles from '../src/comparator';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two config files and shows the difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const output = compareFiles(filepath1, filepath2);
    console.log(output);
  });

program.parse(process.argv);
