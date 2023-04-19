import { Router } from 'src/routes';
import { StackContext, Api, use } from 'sst/constructs';
import { DynamoStack } from './dynamo.stack';

export function ApiStack({ stack }: StackContext) {
  const { TableShortly } = use(DynamoStack);

  const api = new Api(stack, 'ShortlyApi');

  api.bind([TableShortly]);
  api.attachPermissions(['dynamodb']);
  api.addRoutes(stack, Router.build());

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
