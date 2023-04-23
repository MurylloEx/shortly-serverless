import { Router } from 'src/routes';
import { StackContext, Api, use } from 'sst/constructs';
import { DynamoStack } from './dynamo.stack';

export function ApiStack({ stack }: StackContext) {
  const { TableShortly } = use(DynamoStack);

  const domains: Record<string, string> = {
    production: 'shortly.com.br',
    develop: 'dev.shortly.com.br'
  };

  const stageDomain = `${stack.stage}.shortly.com.br`;
  const customDomain = domains[stack.stage] ?? stageDomain;

  const api = new Api(stack, 'ShortlyApi', { 
    customDomain,
    defaults: {
      throttle: {
        burst: 25,
        rate: 10
      }
    }
  });

  api.setCors({
    allowMethods: ['ANY'],
    allowHeaders: ['*'],
    allowOrigins: ['*'],
    allowCredentials: false,
  });

  api.bind([TableShortly]);
  api.attachPermissions(['dynamodb']);
  api.addRoutes(stack, Router.build());

  stack.addOutputs({
    ApiEndpoint: api.url,
    ApiCustomEndpoint: api.customDomainUrl,
    ApiHttpArn: api.httpApiArn,
    ApiStackName: stack.stackName
  });
}
