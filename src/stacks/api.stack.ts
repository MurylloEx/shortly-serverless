import { Router } from 'src/routes';
import { StackContext, Api, use } from 'sst/constructs';
import { DynamoStack } from './dynamo.stack';

export function ApiStack({ stack }: StackContext) {
  const { TableShortUrl } = use(DynamoStack);

  const api = new Api(stack, 'api', {
    routes: Router.build()
  });

  api.bind([TableShortUrl]);
  api.attachPermissions(['dynamodb']);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
