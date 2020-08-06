import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import build from './builder.js';
import render from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(filepath.toString(), 'utf8');
const getFileExtension = (filepath) => path.extname(filepath);

export default (filepath1, filepath2, format) => {
  const extension1 = getFileExtension(filepath1);
  const extension2 = getFileExtension(filepath2);
  const oldData = parse(readFile(filepath1), extension1);
  const newData = parse(readFile(filepath2), extension2);
  const ast = build(oldData, newData);
  return render(ast, format);
};
