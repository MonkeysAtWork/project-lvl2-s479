import _ from 'lodash';


const getIndent = (nestingLevel) => {
  const spacesPerLevel = 4;

  return ' '.repeat(nestingLevel * spacesPerLevel);
};

const stringify = (data, level) => {
  const indent = getIndent(level);
  if (_.isObject(data)) {
    const [[key, value]] = Object.entries(data);
    return `{\n${indent}    ${key}: ${value}\n${indent}}`;
  }
  return data;
};

const typesActions = {
  propertyGroupe: (key, value, level, fn) => `    ${key}: ${fn(value, level + 1)}`,
  changedProperty: (key, value, level) => [`  - ${key}: ${stringify(value.oldValue, level + 1)}`, `  + ${key}: ${stringify(value.newValue, level + 1)}`],
  sameProperty: (key, value, level) => `    ${key}: ${stringify(value, level + 1)}`,
  deletedProperty: (key, value, level) => `  - ${key}: ${stringify(value, level + 1)}`,
  addedProperty: (key, value, level) => `  + ${key}: ${stringify(value, level + 1)}`,
};


const render = (data, level = 0) => {
  const indent = getIndent(level);
  const mapped = data.map(({ type, key, value }) => (
    typesActions[type](key, value, level, render)));
  return `{\n${indent}${(_.flatten(mapped).join(`\n${indent}`))}\n${indent}}`;
};


export default render;
