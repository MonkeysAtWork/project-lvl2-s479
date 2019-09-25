import _ from 'lodash';


const getIndent = (nestingLevel) => {
  const spacesPerLevel = 4;

  return ' '.repeat(nestingLevel * spacesPerLevel);
};


const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const indent = getIndent(level);
  const [[key, value]] = Object.entries(data);

  return `{\n${indent}    ${key}: ${value}\n${indent}}`;
};


const typesActions = {
  propertyGroupe: (node, level, fn) => `    ${node.key}: ${fn(node.children, level + 1)}`,
  changedProperty: (node, level) => [`  - ${node.key}: ${stringify(node.oldValue, level + 1)}`, `  + ${node.key}: ${stringify(node.newValue, level + 1)}`],
  sameProperty: (node, level) => `    ${node.key}: ${stringify(node.oldValue, level + 1)}`,
  deletedProperty: (node, level) => `  - ${node.key}: ${stringify(node.oldValue, level + 1)}`,
  addedProperty: (node, level) => `  + ${node.key}: ${stringify(node.newValue, level + 1)}`,
};


const render = (data, level = 0) => {
  const indent = getIndent(level);
  const mapped = data.map((node) => (
    typesActions[node.type](node, level, render)));

  return `{\n${indent}${(_.flatten(mapped).join(`\n${indent}`))}\n${indent}}`;
};


export default render;
