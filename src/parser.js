import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, extenstion) => {
  switch (extenstion) {
    case '.json':
      return JSON.parse(data);
    case '.yml' || '.yaml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error('Invalid file format!');
  }
};

export { parse as default };
