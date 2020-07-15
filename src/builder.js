import _ from 'lodash';

const build = (oldData, newData) => {
  const keys = _.union(_.keys(oldData), _.keys(newData)).sort();
  const reducer = (acc, key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];
    let status;
    if (newValue === undefined) {
      status = 'deleted';
    } else if (oldValue === undefined) {
      status = 'added';
    } else if (oldValue !== newValue) {
      status = 'changed';
    } else {
      status = 'unchanged';
    }
    const children = (_.isObject(oldValue) && _.isObject(newValue))
      ? build(oldValue, newValue)
      : [];
    const node = {
      key,
      oldValue,
      newValue,
      status,
      children,
    };
    return [...acc, node];
  };
  return keys.reduce(reducer, []);
};

export { build as default };
