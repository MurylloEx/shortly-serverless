import { TableProps } from 'sst/constructs';

export const SchemaShortUrl: TableProps = {
  fields: {
    pk: 'string',
    code: 'string',
    url: 'string',
    accessCount: 'number'
  },
  primaryIndex: {
    partitionKey: 'pk',
    sortKey: 'code'
  },
};
