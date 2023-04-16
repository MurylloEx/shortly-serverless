import { StackContext } from 'sst/constructs';
import { TableBuilder, SchemaShortUrl } from 'src/database';

export function DynamoStack({ stack }: StackContext) {
  const TableShortUrl = TableBuilder.create('Shortly')
    .withScope(stack)
    .withSchema(SchemaShortUrl)
    .build();
  
  return {
    TableShortUrl
  };
}
