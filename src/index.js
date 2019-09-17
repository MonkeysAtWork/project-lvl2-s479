import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';


const getIndent = (level) => {
  const spacesPerLevel = 4;

  return ' '.repeat(level * spacesPerLevel);
};

const stringify = (data, level = 0) => {
  if (!(data instanceof Object)) {
    return data;
  }
  const indent = getIndent(level);
  const [[key, value]] = Object.entries(data);

  return `{\n${indent}    ${key}: ${value}\n${indent}}`;
};

const sign = {
  sameString: ' ',
  addedString: '+',
  deletedString: '-',
  stringGroupe: ' ',
};

const render = (ast, level = 0) => {
  const indent = getIndent(level);

  const func = (({ type, key, content }) => {
    const process = type === 'stringGroupe' ? render : stringify;
    const value = process(content, level + 1);
    return `${indent}  ${sign[type]} ${key}: ${value}`;
  });

  return `{\n${ast.map(func).join('\n')}\n${indent}}`;
};


const stryngTypeActions = [
  {
    check: (val1, val2) => val1 instanceof Object && val2 instanceof Object,
    process: (key, val1, val2, f) => ({ key, content: f(val1, val2), type: 'stringGroupe' }),
  },
  {
    check: (val1, val2) => val1 === val2,
    process: (key, val) => ({ key, type: 'sameString', content: val }),
  },
  {
    check: () => true,
    process: (key, val1, val2) => [{ key, type: 'deletedString', content: val1 },
      { key, type: 'addedString', content: val2 }]
      .filter(({ content }) => (content !== '')),
  },
];

const getDiff = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));

  const structur = uniqKeys.map((key) => {
    const valueBefore = _.has(data1, key) ? data1[key] : '';
    const valueAfter = _.has(data2, key) ? data2[key] : '';
    const { process } = stryngTypeActions.find(({ check }) => check(valueBefore, valueAfter));
    return process(key, valueBefore, valueAfter, getDiff);
  });

  return _.flatten(structur);
};


const getDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).substr(1);

  return getParser(ext)(content);
};

export default (pathToFile1, pathToFile2) => {
  const data1 = getDataFromFile(pathToFile1);
  const data2 = getDataFromFile(pathToFile2);

  const ast = getDiff(data1, data2);

  return render(ast);
};
