import parse from './parser.js';
import build from './builder.js';
import render from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const oldData = parse(filepath1);
  const newData = parse(filepath2);
  const ast = build(oldData, newData);
  return render(ast, format);
};

export { genDiff as default };
