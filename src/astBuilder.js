import _ from 'lodash';

const propertyActions = [
  {
    type: 'propertyGroupe',
    check: (oldValue, newValue) => (_.isObject(oldValue) && _.isObject(newValue)),
    getValue: (oldValue, newValue, fn) => fn(oldValue, newValue),
  },
  {
    type: 'sameProperty',
    check: (oldValue, newValue) => oldValue === newValue,
    getValue: (value) => value,
  },
  {
    type: 'addedProperty',
    check: (value) => value === '',
    getValue: (oldValue, newValue) => newValue,
  },
  {
    type: 'deletedProperty',
    check: (oldValue, newValue) => newValue === '',
    getValue: (value) => value,
  },
  {
    type: 'changedProperty',
    check: () => true,
    getValue: (oldValue, newValue) => ({ oldValue, newValue }),
  },
];

const getPropertyAction = (arg1, arg2) => propertyActions.find(({ check }) => check(arg1, arg2));


const getDiff = (data1 = {}, data2 = {}) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));

  return uniqKeys.map((key) => {
    const oldValue = _.has(data1, key) ? data1[key] : '';
    const newValue = _.has(data2, key) ? data2[key] : '';
    const { type, getValue } = getPropertyAction(oldValue, newValue);
    const value = getValue(oldValue, newValue, getDiff);

    return { type, key, value };
  });
};

export default getDiff;
