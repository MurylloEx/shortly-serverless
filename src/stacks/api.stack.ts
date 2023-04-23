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

  const ApiShortly = new Api(stack, 'ShortlyApi', { 
    customDomain,
    defaults: {
      throttle: {
        burst: 25,
        rate: 10
      }
    }
  });

  ApiShortly.setCors({
    allowMethods: ['ANY'],
    allowHeaders: ['*'],
    allowOrigins: ['*'],
    allowCredentials: false,
  });

  ApiShortly.bind([TableShortly]);
  ApiShortly.attachPermissions(['dynamodb']);
  ApiShortly.addRoutes(stack, Router.build());

  stack.addOutputs({
    ApiEndpoint: ApiShortly.url,
    ApiCustomEndpoint: ApiShortly.customDomainUrl,
    ApiHttpArn: ApiShortly.httpApiArn,
    ApiStackName: stack.stackName
  });

  return { ApiShortly }
}
