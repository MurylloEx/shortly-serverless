import { TableProps } from 'sst/constructs';

export const SchemaShortenUrls: TableProps = {
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
