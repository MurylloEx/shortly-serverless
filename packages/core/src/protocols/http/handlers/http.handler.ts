import { ApiHandler } from 'sst/node/api';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { RequestBuilder, ResponseBuilder } from 'src/protocols/http/builders';
import { EndpointEventHandler, EndpointHandler } from 'src/protocols/http/types';

export function Endpoint(handler: EndpointHandler): EndpointEventHandler {
  return ApiHandler(async (event: APIGatewayProxyEventV2, context: Context) => {
    const response = new ResponseBuilder().build();
    const request = new RequestBuilder()
      .withContext(context)
      .withEvent(event)
      .build();

    await handler(request, response);

    return response.toProxyResult();
  });
}
