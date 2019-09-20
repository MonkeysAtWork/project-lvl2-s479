import _ from 'lodash';

const buildValue = (data) => {
  if (_.isObject(data)) {
    const [[key, value]] = Object.entries(data);
    return [{ key: `  ${key}`, value: buildValue(value) }];
  }
  return data;
};


const buildStructure = (ast) => ast.reduce((acc, node) => {
  const {
    type, key, children, valueBefore, valueAfter,
  } = node;
  switch (type) {
    case ('propertyGroupe'):
      return [...acc, { key: `  ${key}`, value: buildStructure(children) }];
    case ('changedProperty'):
      return [...acc, { key: `- ${key}`, value: buildValue(valueBefore) },
        { key: `+ ${key}`, value: buildValue(valueAfter) }];
    case ('sameProperty'):
      return [...acc, { key: `  ${key}`, value: buildValue(valueAfter) }];
    case ('deletedProperty'):
      return [...acc, { key: `- ${key}`, value: buildValue(valueBefore) }];
    case ('addedProperty'):
      return [...acc, { key: `+ ${key}`, value: buildValue(valueAfter) }];
    default:
      return null;
  }
}, []);


const getIndent = (level) => {
  const spacesPerLevel = 4;

  return ' '.repeat(level * spacesPerLevel);
};

const makeAsString = (ast, level = 0) => {
  const indent = getIndent(level);

  const func = ({ key, value }) => {
    const newValue = _.isObject(value) ? makeAsString(value, level + 1) : value;
    return `${indent}  ${key}: ${newValue}`;
  };
  return `{\n${ast.map(func).join('\n')}\n${indent}}`;
};

export default (diff) => {
  const structure = buildStructure(diff);
  return makeAsString(structure);
};
