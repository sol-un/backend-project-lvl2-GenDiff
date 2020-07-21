const renderValueByType = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderNodeByType = {
  nested: (node, names, process) => process(node.children, [...names, node.name]).join(''),
  added: (node, names) => `Property '${names.concat(node.name).join('.')}' was added with value: ${renderValueByType(node.value)}\n`,
  deleted: (node, names) => `Property '${names.concat(node.name).join('.')}' was removed\n`,
  changed: (node, names) => `Property '${names.concat(node.name).join('.')}' was updated. From ${renderValueByType(node.oldValue)} to ${renderValueByType(node.newValue)}\n`,
  unchanged: () => '',
};

export default (ast) => {
  const render = (tree, names) => tree
    .map((node) => renderNodeByType[node.type](node, names, render));
  return render(ast, []).join('');
};
