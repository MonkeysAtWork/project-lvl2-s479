import _ from 'lodash';

const adaptValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const stringify = (data) => {
  if (_.isObject(data)) {
    const [[key, value]] = Object.entries(data);
    return `{${key}: ${value}}`;
  }
  return adaptValue(data);
};

const typesActions = {
  propertyGroupe: (path, value, fn) => fn(value, path),
  changedProperty: (path, value) => `Property '${path.join('.')}' was updated. From ${stringify(value.oldValue)} to ${adaptValue(value.newValue)}`,
  deletedProperty: (path) => `Property '${path.join('.')}' was removed`,
  addedProperty: (path, value) => `Property '${path.join('.')}' was added with value: ${adaptValue(value)}`,
  sameProperty: () => null,
};


const makePropertyList = (data, path = []) => data.map(({ type, key, value }) => {
  const newPath = [...path, key];
  return typesActions[type](newPath, value, makePropertyList);
});

export default (ast) => _.flattenDeep(makePropertyList(ast))
  .filter((e) => e)
  .join('\n');
