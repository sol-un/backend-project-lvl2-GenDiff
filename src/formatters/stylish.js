const indent = (depth) => '  '.repeat(depth);

const renderValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const reducer = (acc, [entryKey, entryValue]) => {
    const processedEntryValue = (entryValue instanceof Object)
      ? renderValue(entryValue, depth + 2)
      : entryValue;
    return `${acc}${indent(2)}${entryKey}: ${processedEntryValue}\n${indent(depth)}`;
  };
  return `{\n${indent(depth)}${Object.entries(value).reduce(reducer, '')}}`;
};

const renderLine = (node, depth, prefix) => `${indent(depth)}${prefix}${node.name}: ${renderValue(node.value, depth + 1)}\n`;

const renderFunctions = {
  nested: (node, depth, render) => `${indent(depth + 1)}${node.name}: ${render(node.children, depth + 1)}`,
  added: (node, depth) => renderLine(node, depth, '+ '),
  deleted: (node, depth) => renderLine(node, depth, '- '),
  changed: (node, depth) => {
    const deletedLine = renderLine({ name: node.name, value: node.oldValue }, depth, '- ');
    const addedLine = renderLine({ name: node.name, value: node.newValue }, depth, '+ ');
    return `${deletedLine}${addedLine}`;
  },
  unchanged: (node, depth) => renderLine(node, depth, '  '),
};
export default (ast) => {
  const render = (tree, depth = 0) => {
    const renderedNodes = tree
      .reduce((acc, node) => `${acc}${renderFunctions[node.type](node, depth + 1, render)}`, '');
    return `{\n${renderedNodes}${indent(depth)}}\n`;
  };
  return render(ast);
};
