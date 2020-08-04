/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

const build = (oldData, newData) => {
  const keys = _.union(_.keys(oldData), _.keys(newData)).sort();
  const mapKeyToNode = (key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];
    if (!_.has(newData, key)) {
      return {
        name: key,
        type: 'deleted',
        value: oldValue,
      };
    }
    if (!_.has(oldData, key)) {
      return {
        name: key,
        type: 'added',
        value: newValue,
      };
    }
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        name: key,
        type: 'nested',
        children: build(oldValue, newValue),
      };
    }
    if (oldValue !== newValue) {
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

export default build;
