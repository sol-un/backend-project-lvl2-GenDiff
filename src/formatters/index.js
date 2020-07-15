import renderPlain from './plain.js';
import renderStylish from './stylish.js';
import renderJson from './json.js';

const formatters = [
  {
    name: 'plain',
    process: (ast) => renderPlain(ast),
  },
  {
    name: 'stylish',
    process: (ast) => renderStylish(ast),
  },
  {
    name: 'json',
    process: (ast) => renderJson(ast),
  },
];

const render = (ast, format) => {
  const formatter = formatters.find(({ name }) => name === format);
  return formatter.process(ast);
};

export { render as default };
