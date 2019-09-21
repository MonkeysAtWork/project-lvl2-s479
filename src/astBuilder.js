import _ from 'lodash';

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

export default getDiff;
