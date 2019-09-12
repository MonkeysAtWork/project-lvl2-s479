import _ from 'lodash';
import fs from 'fs';

const getDiff = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));

  const changesStructure = uniqKeys.map((key) => {
    const valueBefore = _.has(data1, key) ? data1[key] : '';
    const valueAfter = _.has(data2, key) ? data2[key] : '';
    return { key, valueBefore, valueAfter };
  });

  const structureAsLines = changesStructure.reduce((acc, { key, valueBefore, valueAfter }) => {
    if (valueBefore !== valueAfter) {
      return [...acc, { key, value: valueAfter, sign: '+' }, { key, value: valueBefore, sign: '-' }];
    }
    return [...acc, { key, value: valueBefore, sign: ' ' }];
  }, [])

    .filter((element) => element.value !== '')
    .map((element) => `  ${element.sign} ${element.key}: ${element.value}`)
    .join('\n');

  return `{\n${structureAsLines}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1);
  const file2 = fs.readFileSync(pathToFile2);
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  return getDiff(data1, data2);
};
