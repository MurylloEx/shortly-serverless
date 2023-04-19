import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import {
  HttpContext,
  HttpQuery,
  HttpParams,
  HttpRequestHeaders,
  HttpRequestContext
} from 'src/protocols/http/types';

export class Request {

  constructor(
    protected readonly event: APIGatewayProxyEventV2,
    protected readonly context: Context
  ) { }

  getRequestContext(): HttpRequestContext {
    return this.event.requestContext;
  }

  getHttpContext(): HttpContext {
    return this.getRequestContext().http;
  }

  getMethod(): string {
    return this.getHttpContext().method;
  }

  getPath(): string {
    return this.getHttpContext().path;
  }

  getQuery(): HttpQuery {
    return this.event.queryStringParameters ?? {};
  }

  getParams(): HttpParams {
    return this.event.pathParameters ?? {};
  }

  getHeaders(): HttpRequestHeaders {
    return this.event.headers ?? {};
  }

  getBody(): string {
    return this.event.body ?? '';
  }

  getJson() {
    try {
      const body = this.getBody();
      const isBodyString = typeof body === 'string';
      return isBodyString ? JSON.parse(body) : undefined;
    } catch (e) {
      return undefined;
    }
  }

}
