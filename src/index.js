import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const getDiff = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));

  const process = uniqKeys.reduce((acc, key) => {
    const valueBefore = _.has(data1, key) ? data1[key] : '';
    const valueAfter = _.has(data2, key) ? data2[key] : '';
    if (valueBefore !== valueAfter) {
      return [...acc, { key, value: valueAfter, sign: '+' }, { key, value: valueBefore, sign: '-' }];
    }
    return [...acc, { key, value: valueBefore, sign: ' ' }];
  }, [])

    .filter((element) => element.value !== '')
    .map((element) => `  ${element.sign} ${element.key}: ${element.value}`)
    .join('\n');

  return `{\n${process}\n}`;
};

const getDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).substr(1);
  return getParser(ext)(content);
};

export default (pathToFile1, pathToFile2) => {
  const data1 = getDataFromFile(pathToFile1);
  const data2 = getDataFromFile(pathToFile2);

  return getDiff(data1, data2);
};
