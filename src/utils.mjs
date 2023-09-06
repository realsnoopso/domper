export const getType = (value) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Promise) return 'promise';
  if (value instanceof Map) return 'map';
  if (value instanceof Set) return 'set';

  return typeof value;
};
