import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedJson;
let expectedPlain;
let expectedStylish;

beforeAll(() => {
  expectedJson = readFile('expected_json.txt').trimRight();
  expectedPlain = readFile('expected_plain.txt').trimRight();
  expectedStylish = readFile('expected_stylish.txt').trimRight();
});

test('Gendiff JSON', () => {
  const pathToBefore = getFixturePath('before.json');
  const pathToAfter = getFixturePath('after.json');

  expect(genDiff(pathToBefore, pathToAfter, 'stylish')).toBe(expectedStylish);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(expectedJson);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(expectedPlain);
});

test('Gendiff YAML', () => {
  const pathToBefore = getFixturePath('before.yml');
  const pathToAfter = getFixturePath('after.yml');

  expect(genDiff(pathToBefore, pathToAfter, 'stylish')).toBe(expectedStylish);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(expectedJson);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(expectedPlain);
});

test('Gendiff INI', () => {
  const pathToBefore = getFixturePath('before.ini');
  const pathToAfter = getFixturePath('after.ini');

  expect(genDiff(pathToBefore, pathToAfter, 'stylish')).toBe(expectedStylish);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(expectedJson);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(expectedPlain);
});
