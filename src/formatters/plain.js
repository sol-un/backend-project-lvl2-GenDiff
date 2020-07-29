const renderValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderPath = (parentNames, name) => parentNames.concat(name).join('.');

const renderFunctions = {
  nested: (node, parentNames, render) => render(node.children, [...parentNames, node.name]),
  added: (node, parentNames) => `Property '${renderPath(parentNames, node.name)}' was added with value: ${renderValue(node.value)}\n`,
  deleted: (node, parentNames) => `Property '${renderPath(parentNames, node.name)}' was removed\n`,
  changed: (node, parentNames) => {
    const firstSentence = `Property '${renderPath(parentNames, node.name)}' was updated. `;
    const secondSentence = `From ${renderValue(node.oldValue)} to ${renderValue(node.newValue)}\n`;
    return `${firstSentence}${secondSentence}`;
  },
  unchanged: () => '',
};

export default (ast) => {
  const render = (tree, parentNames = []) => tree
    .reduce((acc, node) => `${acc}${renderFunctions[node.type](node, parentNames, render)}`, '');
  return render(ast);
};
