import _ from 'lodash';

const renderNode = (node, keys) => {
  const {
    key,
    prevValue,
    status,
    children,
  } = node;
  let newLine;
  const newValue = _.isObject(node.newValue) ? '[complex value]' : node.newValue;
  if (children.length !== 0) {
    return children.map((item) => renderNode(item, [...keys, key])).join('');
  }
  switch (status) {
    case 'deleted':
      newLine = `Property '${[...keys, key].join('.')}' was removed\n`;
      break;
    case 'added':
      newLine = `Property '${[...keys, key].join('.')}' was added with value: '${newValue}'\n`;
      break;
    case 'changed':
      newLine = `Property '${[...keys, key].join('.')}' was updated. From '${prevValue}' to '${newValue}'\n`;
      break;
    default:
      // nothing
  }
  return newLine;
};

export default (arr) => arr.map((item) => renderNode(item, [])).join('');
