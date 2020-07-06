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
    if (status === 'deleted') {
      return { ...acc, [`- ${key}`]: prevValue };
    }
    if (status === 'added') {
      return { ...acc, [`+ ${key}`]: newValue };
    }
    if (status === 'changed') {
      return { ...acc, [`- ${key}`]: prevValue, [`+ ${key}`]: newValue };
    }
    return { ...acc, [`  ${key}`]: newValue };
  };
  return arr.reduce(reducer, {});
};
export default (ast) => JSON.stringify(render(ast), null, ' ').replace(/[",]/g, '');
