const renderValueByType = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const nodeActions = {
  added: (item, keys) => `Property '${keys.join('.')}' was added with value: ${renderValueByType(item.newValue)}\n`,
  deleted: (item, keys) => `Property '${keys.join('.')}' was removed\n`,
  changed: (item, keys) => `Property '${keys.join('.')}' was updated. From ${renderValueByType(item.oldValue)} to ${renderValueByType(item.newValue)}\n`,
  unchanged: () => '',
};

const renderNode = (node, keys) => {
  if (node.children.length === 0) {
    return nodeActions[node.status](node, keys);
  }
  return node.children.map((child) => renderNode(child, [...keys, child.key])).join('');
};

export default (ast) => ast.map((node) => renderNode(node, [node.key])).join('');
