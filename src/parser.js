import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, extenstion) => {
  switch (extenstion) {
    case '.json': {
      return JSON.parse(data);
    }
    case '.yml' || '.yaml': {
      return yaml.safeLoad(data);
    }
    case '.ini': {
      const parsed = ini.parse(data);
      const replaceStringWithInt = (value) => {
        if (!(value instanceof Object)) {
          return (/^-?\d+(.d+)?/.test(value))
            ? parseInt(value, 10)
            : value;
        }
        return _.mapValues(value, replaceStringWithInt);
      };
      return _.mapValues(parsed, replaceStringWithInt);
    }
    default: {
      throw new Error('Invalid file format!');
    }
  }
};

export { parse as default };
