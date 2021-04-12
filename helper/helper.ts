export function arrayToObject(array: any[], field: string): any {
  if (!array || !array.length) {
    return {};
  }
  return array.reduce((obj, item) => {
    obj[item[field]] = item;
    return obj;
  }, {});
}

export const messages = {
  error: {
    forbiddenPasswords: 'Password and password confirmation must be the same',
    invalidSearchOptions: 'Search options must have one or more options',
  },
};
