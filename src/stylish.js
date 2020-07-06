import _ from 'lodash';

const render = (arr) => {
  const reducer = (acc, item) => {
    const {
      key,
      prevValue,
      newValue,
      status,
      children,
    } = item;
    if (children.length !== 0) {
      return { ...acc, [`  ${key}`]: render(children) };
    }
    switch (status) {
      case 'deleted':
        return { ...acc, [`- ${key}`]: prevValue };
      case 'added':
        return { ...acc, [`+ ${key}`]: newValue };
      case 'changed':
        return { ...acc, [`- ${key}`]: prevValue, [`+ ${key}`]: newValue };
      case 'unchanged':
        return { ...acc, [`  ${key}`]: newValue };
      default:
        // nothing
    }
  };
  return arr.reduce(reducer, {});
};
export default (ast) => JSON.stringify(render(ast), null, ' ').replace(/[",]/g, '');
