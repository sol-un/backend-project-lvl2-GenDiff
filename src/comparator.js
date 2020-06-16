import fs from 'fs';
import _ from 'lodash';

const convertFileToObj = (filepath) => {
  const fileContents = fs.readFileSync(filepath.toString(), 'utf8');
  const result = JSON.parse(fileContents);
  return result;
}

const compareFiles = (filepath1, filepath2) => {
  const obj1 = convertFileToObj(filepath1);
  const obj2 = convertFileToObj(filepath2);

  const oldKeys = Object.keys(obj1);
  const newKeys = Object.keys(obj2);
  const deleted = _.difference(oldKeys, newKeys);
  const added = _.difference(newKeys, oldKeys);

  let output = '';
  const metaObj = {...obj1, ...obj2};
  for (const key in metaObj) {
    if (deleted.includes(key)) {
      output += `  - ${key}: ${metaObj[key]}\n`;
    } else if (added.includes(key)) {
      output += `  + ${key}: ${metaObj[key]}\n`
    } else if (obj1[key] === obj2[key]) {
      output += `    ${key}: ${metaObj[key]}\n`
    } else {
      output+=`  + ${key}: ${obj2[key]}\n`;
      output += `  - ${key}: ${obj1[key]}\n`;
    }
  }
  const result = "{\n" + output + "}\r\n"
  return result;
};

export { compareFiles as default };
