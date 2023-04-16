import { StackContext } from 'sst/constructs';
import { TableBuilder, ShortlySchema } from 'src/database';

export function DynamoStack({ stack }: StackContext) {
  const TableShortUrl = TableBuilder.create('Shortly')
    .withScope(stack)
    .withSchema(ShortlySchema)
    .build();
  
  return {
    TableShortUrl
  };
}
