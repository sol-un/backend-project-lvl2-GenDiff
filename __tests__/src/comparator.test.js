import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import compareFiles from '../../src/comparator';

test('Gendiff', () => {
  const before = path.join(__dirname, '..', '..', '__fixtures__', 'before.json');
  const after = path.join(__dirname, '..', '..', '__fixtures__', 'after.json');
  const result = fs.readFileSync(`${__dirname}/../../__fixtures__/result.txt`, 'utf8');
  expect(compareFiles(before, after)).toBe(result);
});
