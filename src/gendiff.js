import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import build from './builder.js';
import render from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(filepath.toString(), 'utf8');
const getFileExtension = (filepath) => path.extname(filepath);

export default (filepath1, filepath2, format) => {
  const extension = getFileExtension(filepath1);
  const oldData = parse(readFile(filepath1), extension);
  const newData = parse(readFile(filepath2), extension);
  const ast = build(oldData, newData);
  return render(ast, format);
};
