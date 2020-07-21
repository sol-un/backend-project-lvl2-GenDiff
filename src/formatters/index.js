import renderPlain from './plain.js';
import renderStylish from './stylish.js';
import renderJson from './json.js';

const formatters = {
  plain: (ast) => renderPlain(ast),
  stylish: (ast) => renderStylish(ast),
  json: (ast) => renderJson(ast),
};

const render = (ast, format) => formatters[format](ast);

export { render as default };
