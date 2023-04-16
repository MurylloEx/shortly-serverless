import { Router } from 'src/routes';
import { TableBuilder } from 'src/database';
import { SchemaShortUrl } from 'src/database/schemas';
import { StackContext, Api } from 'sst/constructs';

export function ApiStack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: Router.build()
  });

  const TableShortUrl = TableBuilder.create('ShortUrl')
    .withScope(stack)
    .withSchema(SchemaShortUrl)
    .build();

  api.bind([TableShortUrl]);

  api.attachPermissions(['dynamodb']);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
