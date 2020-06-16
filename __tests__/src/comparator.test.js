import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import compareFiles from '../../src/comparator.js';

test('Gendiff', () => {
  const currentDir = process.cwd();
  const before = path.resolve(currentDir, '__fixtures__', 'before.json');
  const after = path.resolve(currentDir, '__fixtures__', 'after.json');
  const resultPath = path.resolve(currentDir, '__fixtures__', 'result.txt');
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(compareFiles(before, after)).toBe(result);
});
