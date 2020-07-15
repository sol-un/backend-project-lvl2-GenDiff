const indent = (depth) => '  '.repeat(depth);

const renderObjectValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  return `${Object.entries(value).map(([entryKey, entryValue]) => `{\n${indent(depth + 3)}${entryKey}: ${entryValue}\n${indent(depth + 1)}}`)}`;
};

const nodeActions = {
  added: (item, depth) => `${indent(depth)}+ ${item.key}: ${renderObjectValue(item.newValue, depth)}\n`,
  deleted: (item, depth) => `${indent(depth)}- ${item.key}: ${renderObjectValue(item.oldValue, depth)}\n`,
  changed: (item, depth) => `${indent(depth)}- ${item.key}: ${renderObjectValue(item.oldValue, depth)}\n${indent(depth)}+ ${item.key}: ${renderObjectValue(item.newValue, depth)}\n`,
  unchanged: (item, depth) => `${indent(depth)}  ${item.key}: ${renderObjectValue(item.newValue, depth)}\n`,
};

const renderNode = (item, depth) => {
  if (item.children.length === 0) {
    return nodeActions[item.status](item, depth);
  }
  return `${indent(depth + 1)}${item.key}: {\n${item.children.map((child) => renderNode(child, depth + 2)).join('')}${indent(depth + 1)}}\n`;
};

export default (ast) => `{\n${ast.map((item) => renderNode(item, 1)).join('')}}\n`;
