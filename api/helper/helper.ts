import { DynamoDB } from 'aws-sdk';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';

export const format = 'DD-MMM-YYYY';

export const flatPricePercent = 0.92;

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
    invalidSearchOptions: 'Search options must have one or more options'
  }
};

export function convertDynamoDBRecord(record: AttributeMap): { [p: string]: any } {
  return DynamoDB.Converter.unmarshall(record);
}
