import AWS from 'aws-sdk';
import { arrayConverter, objectConverter } from './utils';

const minLengthId = 15,
  dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' });

export const getUser = async id =>
  await new Promise((resolve, reject) => {
    const params = {
      TableName: 'mcpeak',
      Key: {
        id: {
          S: id.toString()
        }
      }
    };

    dynamoDB.getItem(
      params,
      (err, data) => (err ? reject(err) : resolve(objectConverter(data.Item)))
    );
  });

export const getUsers = async () =>
  await new Promise((resolve, reject) => {
    const params = {
      TableName: 'mcpeak',
      FilterExpression: 'size(id) > :size',
      ExpressionAttributeValues: {
        ':size': { N: minLengthId.toString() }
      }
    };

    dynamoDB.scan(
      params,
      (err, data) => (err ? reject(err) : resolve(arrayConverter(data.Items)))
    );
  });
