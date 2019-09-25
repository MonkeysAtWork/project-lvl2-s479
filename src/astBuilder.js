import _ from 'lodash';


const propertyActions = [
  {
    type: 'propertyGroupe',
    check: (oldValue, newValue) => (_.isObject(oldValue) && _.isObject(newValue)),
    getContent: (oldValue, newValue, fn) => ({ children: fn(oldValue, newValue) }),
  },
  {
    type: 'sameProperty',
    check: (oldValue, newValue) => oldValue === newValue,
    getContent: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'addedProperty',
    check: (value) => value === '',
    getContent: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'deletedProperty',
    check: (oldValue, newValue) => newValue === '',
    getContent: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'changedProperty',
    check: () => true,
    getContent: (oldValue, newValue) => ({ oldValue, newValue }),
  },
];


const getPropertyAction = (arg1, arg2) => propertyActions.find(({ check }) => check(arg1, arg2));


const getDiff = (data1 = {}, data2 = {}) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));

  return uniqKeys.map((key) => {
    const oldValue = _.has(data1, key) ? data1[key] : '';
    const newValue = _.has(data2, key) ? data2[key] : '';

    const { type, getContent } = getPropertyAction(oldValue, newValue);
    const content = getContent(oldValue, newValue, getDiff);

    return { type, key, ...content };
  });
};


export default getDiff;
