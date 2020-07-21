const indent = (depth) => '  '.repeat(depth);

const renderObjectValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  return `${Object.entries(value)
    .map(([entryKey, entryValue]) => `{\n${indent(depth + 1)}  ${entryKey}: ${entryValue}\n${indent(depth)}}`)}`;
};

const renderNodeByType = {
  nested: (node, depth, process) => `${indent(depth + 1)}${node.name}: {\n${process(node.children, depth + 2).join('')}${indent(depth + 1)}}\n`,
  added: (node, depth) => `${indent(depth)}+ ${node.name}: ${renderObjectValue(node.value, depth + 1)}\n`,
  deleted: (node, depth) => `${indent(depth)}- ${node.name}: ${renderObjectValue(node.value, depth + 1)}\n`,
  changed: (node, depth) => {
    const deletedLine = `${indent(depth)}- ${node.name}: ${renderObjectValue(node.oldValue, depth + 1)}\n`;
    const addedLine = `${indent(depth)}+ ${node.name}: ${renderObjectValue(node.newValue, depth + 1)}\n`;
    return `${deletedLine}${addedLine}`;
  },
  unchanged: (node, depth) => `${indent(depth)}  ${node.name}: ${renderObjectValue(node.value, depth + 1)}\n`,
};
export default (ast) => {
  const render = (tree, depth) => tree
    .map((node) => renderNodeByType[node.type](node, depth, render));
  return `{\n${render(ast, 1).join('')}}\n`;
};
