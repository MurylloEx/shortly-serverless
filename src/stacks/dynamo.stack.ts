import { StackContext } from 'sst/constructs';
import { TableBuilder, ShortlySchema } from 'src/database';

export function DynamoStack({ stack }: StackContext) {
  const TableShortly = TableBuilder.create('ShortlyDynamoDb')
    .withScope(stack)
    .withSchema(ShortlySchema)
    .build();
  
  return { TableShortly };
}
