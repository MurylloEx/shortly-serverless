import { TableProps } from 'sst/constructs';

export const SchemaShortUrl: TableProps = {
  fields: {
    pk: 'string',
    sk: 'string',
    shortId: 'string',
    shortCode: 'string',
    realUrl: 'string',
    accessCount: 'number',
    createdAt: 'number',
    updatedAt: 'number',
    deletedAt: 'number'
  },
  primaryIndex: {
    partitionKey: 'pk',
    sortKey: 'sk'
  }
};
