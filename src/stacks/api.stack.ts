import { Router } from 'src/routes';
import { StackContext, Api, use } from 'sst/constructs';
import { DynamoStack } from './dynamo.stack';

export function ApiStack({ stack }: StackContext) {
  const { TableShortly } = use(DynamoStack);

  const domains: Record<string, string> = {
    prod: 'api.shortly.com.br',
    develop: 'api-dev.shortly.com.br'
  };

  const stageDomain = `api-${stack.stage}.shortly.com.br`;
  const domainName = domains[stack.stage] ?? stageDomain;

  const ApiShortly = new Api(stack, 'ShortlyApi', { 
    customDomain: {
      domainName,
      hostedZone: 'shortly.com.br'
    },
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
