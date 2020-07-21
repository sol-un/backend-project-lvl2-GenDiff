import _ from 'lodash';

const build = (oldData, newData) => {
  const keys = _.union(_.keys(oldData), _.keys(newData)).sort();
  const reducer = (acc, key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];
    const node = {};
    node.name = key;
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      node.type = 'nested';
      node.children = build(oldValue, newValue);
    } else if (newValue === undefined) {
      node.type = 'deleted';
      node.value = oldValue;
    } else if (oldValue === undefined) {
      node.type = 'added';
      node.value = newValue;
    } else if (oldValue !== newValue) {
      node.type = 'changed';
      node.newValue = newValue;
      node.oldValue = oldValue;
    } else {
      node.type = 'unchanged';
      node.value = newValue;
    }
    return [...acc, node];
  };
  return keys.reduce(reducer, []);
};

export { build as default };
