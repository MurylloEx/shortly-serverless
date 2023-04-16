import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const DynamoClient = new DynamoDBClient({
  maxAttempts: 2,
  region: 'us-east-1',
});

export const DynamoDocumentClient = DynamoDBDocumentClient.from(DynamoClient);
