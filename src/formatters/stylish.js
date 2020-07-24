const indent = (depth) => '  '.repeat(depth);

const renderLine = (node, depth, prefix, fn) => `${indent(depth)}${prefix}${node.name}: ${fn(node.children || node.value, depth + 1)}`;

const renderValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const reducer = (acc, [entryKey, entryValue]) => {
    const processedEntryValue = (entryValue instanceof Object)
      ? renderValue(entryValue, depth + 1)
      : entryValue;
    return `${acc}  ${renderLine({ name: entryKey, value: processedEntryValue }, depth, '  ', renderValue)}\n${indent(depth)}`;
  };
  return `{\n${Object.entries(value).reduce(reducer, '')}}`;
};

const renderFunctions = {
  nested: (node, depth, render) => renderLine(node, depth, '  ', render),
  added: (node, depth) => renderLine(node, depth, '+ ', renderValue),
  deleted: (node, depth) => renderLine(node, depth, '- ', renderValue),
  changed: (node, depth) => {
    const deletedLine = renderLine({ name: node.name, value: node.oldValue }, depth, '- ', renderValue);
    const addedLine = renderLine({ name: node.name, value: node.newValue }, depth, '+ ', renderValue);
    return `${deletedLine}\n${addedLine}`;
  },
  unchanged: (node, depth) => renderLine(node, depth, '  ', renderValue),
};
export default (ast) => {
  const render = (tree, depth = 0) => {
    const renderedNodes = tree
      .reduce((acc, node) => `${acc}${renderFunctions[node.type](node, depth + 1, render)}\n`, '');
    return `{\n${renderedNodes}${indent(depth)}}`;
  };
  return render(ast);
};
