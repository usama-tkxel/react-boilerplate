import { camelCase, mapKeys, snakeCase } from 'lodash';

export const convertIntoCamelCase = (obj = {}) =>
  mapKeys(obj, (v, k) => camelCase(k));

export const converArrayDataToCamelCase = (arr = []) =>
  arr.map(convertIntoCamelCase);

export const appendObjectInFormData = ({
  obj = {},
  parentKey = '',
  data,
  snakifyKeys = true,
}) => {
  Object.entries(obj).forEach(([key, value]) => {
    const isValueObj = Boolean(value && typeof value === 'object');
    const isIteratingArray = Array.isArray(value);
    const keyName = snakifyKeys ? snakeCase(key) : key;
    const propName = keyName;
    const isAttachment = [File, Blob].includes(value?.constructor);

    const newKey = `${parentKey}${propName}`;

    if (!isAttachment && isValueObj && !isIteratingArray) {
      return appendObjectInFormData({
        parentKey: newKey,
        obj: value,
        data,
        snakifyKeys,
      });
    }
    if (isIteratingArray) {
      // Loop through array elements and append each with the array index
      value.forEach((arrayValue, index) => {
        const arrayKey = `${newKey}[${index}]`;
        data.append(arrayKey, JSON.stringify(arrayValue));
      });
    } else {
      data.append(newKey, value);
    }
  });
};

export const appendObjectInFormDataCreateOrder = ({
  obj = {},
  parentKey = '',
  data,
  snakifyKeys = true,
}) => {
  Object.entries(obj).forEach(([key, value]) => {
    const isValueObj = Boolean(value && typeof value === 'object');
    const isIteratingArray = Array.isArray(value);
    const keyName = snakifyKeys ? snakeCase(key) : key;
    const propName = keyName;
    const isAttachment = [File, Blob].includes(value?.constructor);

    const newKey = `${parentKey}${propName}`;

    if (!isAttachment && isValueObj && !isIteratingArray) {
      return appendObjectInFormData({
        parentKey: newKey,
        obj: value,
        data,
        snakifyKeys,
      });
    }
    if (isIteratingArray) {
      // Loop through array elements and append each with the array index
      value.forEach((arrayValue, index) => {
        let arrayKey = `${newKey}[${index}]`;

        if (typeof arrayValue == 'object') {
          Object.keys(arrayValue).map((objKey) => {
            arrayKey = `${newKey}[${index}][${objKey}]`;
            const isImage = [File, Blob].includes(
              arrayValue[objKey]?.constructor
            );
            if (isImage) {
              data.append(arrayKey, arrayValue[objKey], 'image.png');
            } else {
              data.append(arrayKey, JSON.stringify(arrayValue[objKey]));
            }
          });
        } else {
          data.append(arrayKey, JSON.stringify(arrayValue));
        }
      });
    } else {
      data.append(newKey, value);
    }
  });
};

export const snakifyKeys = (obj = {}) =>
  mapKeys(obj, (v, k) => (k == '_destroy' ? k : snakeCase(k)));

export const showCurrency = (value) => Number.parseFloat(value).toFixed(2);
