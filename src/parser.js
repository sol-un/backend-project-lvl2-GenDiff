import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (filepath) => {
  const data = fs.readFileSync(filepath.toString(), 'utf8');
  const format = path.extname(filepath);
  let result;

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error('Invalid file format!');
  }
};

export { parse as default };
