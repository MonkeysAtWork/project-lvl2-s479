import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getFormatter from './formatters';


const getDiff = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));

  return uniqKeys.map((key) => {
    const valueBefore = _.has(data1, key) ? data1[key] : '';
    const valueAfter = _.has(data2, key) ? data2[key] : '';
    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return { type: 'propertyGroupe', key, children: getDiff(valueBefore, valueAfter) };
    }
    if (valueBefore === valueAfter) {
      return {
        type: 'sameProperty', key, valueBefore, valueAfter,
      };
    }
    if (valueBefore === '') {
      return {
        type: 'addedProperty', key, valueBefore, valueAfter,
      };
    }
    if (valueAfter === '') {
      return {
        type: 'deletedProperty', key, valueBefore, valueAfter,
      };
    }
    return {
      type: 'changedProperty', key, valueBefore, valueAfter,
    };
  });
};


const getDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).substr(1);

  return getParser(ext)(content);
};

export default (pathToFile1, pathToFile2, format) => {
  const data1 = getDataFromFile(pathToFile1);
  const data2 = getDataFromFile(pathToFile2);

  const ast = getDiff(data1, data2);
  return getFormatter(format)(ast);
};
