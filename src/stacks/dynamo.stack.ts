import { StackContext } from 'sst/constructs';
import { TableBuilder, SchemaShortUrl } from 'src/database';

export function DynamoStack({ stack }: StackContext) {
  const TableShortUrl = TableBuilder.create('ShortUrl')
    .withScope(stack)
    .withSchema(SchemaShortUrl)
    .build();
  
  return {
    TableShortUrl
  };
}
