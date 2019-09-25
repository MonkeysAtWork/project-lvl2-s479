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


const makePath = (path, newElement) => path.concat(newElement);


const typesActions = {
  propertyGroupe: (node, fn) => fn(node.children, makePath(node.path, node.key)),
  changedProperty: (node) => `Property '${makePath(node.path, node.key).join('.')}' was updated. From ${stringify(node.oldValue)} to ${adaptValue(node.newValue)}`,
  deletedProperty: (node) => `Property '${makePath(node.path, node.key).join('.')}' was removed`,
  addedProperty: (node) => `Property '${makePath(node.path, node.key).join('.')}' was added with value: ${adaptValue(node.newValue)}`,
  sameProperty: () => null,
};


const makePropertyList = (data, path = []) => data.map((node) => (
  typesActions[node.type]({ ...node, path }, makePropertyList)));


export default (ast) => _.flattenDeep(makePropertyList(ast))
  .filter((e) => e)
  .join('\n');
