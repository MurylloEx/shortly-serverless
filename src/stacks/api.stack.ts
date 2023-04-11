import { Router } from 'src/routes';
import { TableBuilder } from 'src/database';
import { SchemaShortenUrls } from 'src/database/schemas';
import { StackContext, Api } from 'sst/constructs';

export function ApiStack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: Router.build()
  });

  const TableShortenUrls = TableBuilder.create('ShortenUrls')
    .withScope(stack)
    .withSchema(SchemaShortenUrls)
    .build();

  api.bind([TableShortenUrls]);

  api.attachPermissions(['dynamodb']);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
