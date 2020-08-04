import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extenstion) => {
  switch (extenstion) {
    case '.json': {
      return JSON.parse(data);
    }
    case '.yml' || '.yaml': {
      return yaml.safeLoad(data);
    }
    case '.ini': {
      const parsed = ini.parse(data);
      const extractNumFromString = (value) => {
        if (!(value instanceof Object)) {
          return parseFloat(value, 10) || value;
        }
        return _.mapValues(value, extractNumFromString);
      };
      return _.mapValues(parsed, extractNumFromString);
    }
    default: {
      throw new Error('Invalid file format!');
    }
  }
};
