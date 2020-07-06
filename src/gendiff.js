import _ from 'lodash';
import parse from './parser.js';
import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const build = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const reducer = (acc, key) => {
    const prevValue = obj1[key];
    const newValue = obj2[key];
    let status;
    if (newValue === undefined) {
      status = 'deleted';
    } else if (prevValue === undefined) {
      status = 'added';
    } else if (prevValue !== newValue) {
      status = 'changed';
    } else {
      status = 'unchanged';
    }
    const children = (_.isObject(prevValue) && _.isObject(newValue))
      ? build(prevValue, newValue)
      : [];
    const node = {
      key,
      prevValue,
      newValue,
      status,
      children,
    };
    return [...acc, node];
  };
  const ast = keys.reduce(reducer, []);
  return ast;
};

const genDiff = (filepath1, filepath2, format) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const ast = build(data1, data2);
  switch (format) {
    case 'stylish':
      return renderStylish(ast);
    case 'plain':
      return renderPlain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      console.log('Unknown output format');
  }
};

export { genDiff as default };
