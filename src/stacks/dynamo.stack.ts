import { StackContext } from 'sst/constructs';
import { TableBuilder, ShortlySchema } from 'src/database';

export function DynamoStack({ stack }: StackContext) {
  const TableShortly = TableBuilder.create('ShortlyDynamoDb')
    .withScope(stack)
    .withSchema(ShortlySchema)
    .build();

  stack.addOutputs({
    DynamoTableName: TableShortly.tableName,
    DynamoTableArn: TableShortly.tableArn,
    DynamoStackName: stack.stackName,
  });
  
  return { TableShortly };
}
