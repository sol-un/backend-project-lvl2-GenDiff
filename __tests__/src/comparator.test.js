import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../../src/gendiff.js';

let currentDir;
beforeAll(() => {
  currentDir = process.cwd();
});

test('Gendiff JSON', () => {
  const pathTobefore = path.resolve(currentDir, '__fixtures__', 'json', 'before.json');
  const pathToafter = path.resolve(currentDir, '__fixtures__', 'json', 'after.json');

  const pathToExpectedJson = path.resolve(currentDir, '__fixtures__', 'expected', 'json.txt');
  const expectedJson = fs.readFileSync(pathToExpectedJson, 'utf8');
  const pathToExpectedPlain = path.resolve(currentDir, '__fixtures__', 'expected', 'plain.txt');
  const expectedPlain = fs.readFileSync(pathToExpectedPlain, 'utf8');
  const pathToExpectedStylish = path.resolve(currentDir, '__fixtures__', 'expected', 'stylish.txt');
  const expectedStylish = fs.readFileSync(pathToExpectedStylish, 'utf8');

  expect(`${genDiff(pathTobefore, pathToafter, 'json')}\n`).toBe(expectedJson);
  expect(genDiff(pathTobefore, pathToafter, 'plain')).toBe(expectedPlain);
  expect(`${genDiff(pathTobefore, pathToafter, 'stylish')}\n`).toBe(expectedStylish);
});

test('Gendiff YAML', () => {
  const pathTobefore = path.resolve(currentDir, '__fixtures__', 'yaml', 'before.yml');
  const pathToafter = path.resolve(currentDir, '__fixtures__', 'yaml', 'after.yml');

  const pathToExpectedJson = path.resolve(currentDir, '__fixtures__', 'expected', 'json.txt');
  const expectedJson = fs.readFileSync(pathToExpectedJson, 'utf8');
  const pathToExpectedPlain = path.resolve(currentDir, '__fixtures__', 'expected', 'plain.txt');
  const expectedPlain = fs.readFileSync(pathToExpectedPlain, 'utf8');
  const pathToExpectedStylish = path.resolve(currentDir, '__fixtures__', 'expected', 'stylish.txt');
  const expectedStylish = fs.readFileSync(pathToExpectedStylish, 'utf8');

  expect(`${genDiff(pathTobefore, pathToafter, 'json')}\n`).toBe(expectedJson);
  expect(genDiff(pathTobefore, pathToafter, 'plain')).toBe(expectedPlain);
  expect(`${genDiff(pathTobefore, pathToafter, 'stylish')}\n`).toBe(expectedStylish);
});

test('Gendiff INI', () => {
  const pathTobefore = path.resolve(currentDir, '__fixtures__', 'ini', 'before.ini');
  const pathToafter = path.resolve(currentDir, '__fixtures__', 'ini', 'after.ini');

  // const pathToExpectedJson = path.resolve(currentDir, '__fixtures__', 'expected', 'json.txt');
  // const expectedJson = fs.readFileSync(pathToExpectedJson, 'utf8');
  const pathToExpectedPlain = path.resolve(currentDir, '__fixtures__', 'expected', 'plain.txt');
  const expectedPlain = fs.readFileSync(pathToExpectedPlain, 'utf8');
  const pathToExpectedStylish = path.resolve(currentDir, '__fixtures__', 'expected', 'stylish.txt');
  const expectedStylish = fs.readFileSync(pathToExpectedStylish, 'utf8');

  // expect(`${genDiff(pathTobefore, pathToafter, 'json')}\n`).toBe(expectedJson);
  expect(genDiff(pathTobefore, pathToafter, 'plain')).toBe(expectedPlain);
  expect(`${genDiff(pathTobefore, pathToafter, 'stylish')}\n`).toBe(expectedStylish);
});
