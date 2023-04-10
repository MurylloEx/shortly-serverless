import { StackContext, Api } from 'sst/constructs';

export function ApiStack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'POST   /s/{url}':          'packages/lambda/routes/create-shorten-url.main',
      'DELETE /c/{code}':         'packages/lambda/routes/delete-shorten-url-by-code.main',
      'GET    /c/{code}':         'packages/lambda/routes/redirect-from-shorten-url.main',
      'GET    /c/{code}/clicks':  'packages/lambda/routes/fetch-shorten-url-clicks-by-code.main',
      'PUT    /c/{code}/s/{url}': 'packages/lambda/routes/change-shorten-url-by-code.main',
      'ANY    /*':                'packages/lambda/routes/any.main'
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
