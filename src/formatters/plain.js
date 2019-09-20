import _ from 'lodash';

const makeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderPlain = (ast, path = []) => ast.map((node) => {
  const {
    type, key, children, valueBefore, valueAfter,
  } = node;

  const newPath = [...path, key];

  switch (type) {
    case ('propertyGroupe'):
      return _.flatten(renderPlain(children, newPath));
    case ('changedProperty'):
      return `Property '${newPath.join('.')}' was updated. From ${makeValue(valueBefore)} to ${makeValue(valueAfter)}`;
    case ('deletedProperty'):
      return `Property '${newPath.join('.')}' was removed`;
    case ('addedProperty'):
      return `Property '${newPath.join('.')}' was added with value: ${makeValue(valueAfter)}`;
    default:
      return null;
  }
});

export default (ast) => _.flatten(renderPlain(ast))
  .filter((e) => e)
  .join('\n');
