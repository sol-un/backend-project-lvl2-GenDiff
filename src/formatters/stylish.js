const indent = (depth) => '  '.repeat(depth);

const renderLine = (depth, prefix, key, value) => `${indent(depth)}${prefix}${key}: ${value}`;

const renderValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const fn = ([entryKey, entryValue]) => `${renderLine(depth, '      ', entryKey, renderValue(entryValue, depth + 1))}\n`;
  return `{\n${Object.entries(value).map(fn).join('')}${indent(depth + 1)}}`;
};

const renderFunctions = {
  nested: (node, depth, render) => renderLine(depth, '  ', node.name, render(node.children, depth + 1)),
  added: (node, depth) => renderLine(depth, '+ ', node.name, renderValue(node.value, depth)),
  deleted: (node, depth) => renderLine(depth, '- ', node.name, renderValue(node.value, depth)),
  changed: (node, depth) => {
    const deletedLine = renderLine(depth, '- ', node.name, renderValue(node.oldValue, depth));
    const addedLine = renderLine(depth, '+ ', node.name, renderValue(node.newValue, depth));
    return `${deletedLine}\n${addedLine}`;
  },
  unchanged: (node, depth) => renderLine(depth, '  ', node.name, renderValue(node.value, depth)),
};
export default (ast) => {
  const render = (tree, depth = 0) => {
    const renderedNodes = tree
      .reduce((acc, node) => `${acc}${renderFunctions[node.type](node, depth + 1, render)}\n`, '');
    return `{\n${renderedNodes}${indent(depth)}}`;
  };
  return `${render(ast)}\n`;
};
