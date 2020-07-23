import _ from 'lodash';

const build = (oldData, newData) => {
  const keys = _.union(_.keys(oldData), _.keys(newData)).sort();
  const mapKeyToNode = (key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        name: key,
        type: 'nested',
        children: build(oldValue, newValue),
      };
    } if (newValue === undefined) {
      return {
        name: key,
        type: 'deleted',
        value: oldValue,
      };
    } if (oldValue === undefined) {
      return {
        name: key,
        type: 'added',
        value: newValue,
      };
    } if (oldValue !== newValue) {
      return {
        name: key,
        type: 'changed',
        newValue,
        oldValue,
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: newValue,
    };
  };
  return keys.map(mapKeyToNode);
};

export { build as default };
