import { posix } from 'path';
import {
  FunctionInlineDefinition,
  ApiAuthorizer,
  ApiRouteProps
} from 'sst/constructs';

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Any = 'ANY'
}

interface RouteSchema {
  method: HttpMethod;
  path: string;
  lambda: FunctionInlineDefinition;
}

export class RouterBuilder<Authorizers extends Record<string, ApiAuthorizer> = Record<string, ApiAuthorizer>, AuthorizerKeys = keyof Authorizers> {

  private prefix: string;
  private schemas: RouteSchema[];

  private constructor(prefix: string = '') {
    this.prefix = prefix;
    this.schemas = [];
  }

  protected addRoute(method: HttpMethod, path: string, lambda: FunctionInlineDefinition) {
    this.schemas.push({
      method,
      path: posix.join(this.prefix, path).replace(/\/$/, ''),
      lambda
    });
  }

  static root<Authorizers extends Record<string, ApiAuthorizer>>(prefix?: string) {
    return new RouterBuilder<Authorizers>(prefix);
  }

  group(prefix: string, groupBuilder: (route: this) => void): void {
    const oldPrefix = this.prefix;
    this.prefix = posix.join(oldPrefix, prefix);
    groupBuilder(this);
    this.prefix = oldPrefix;
  }

  get(path: string, lambda: FunctionInlineDefinition) {
    this.addRoute(HttpMethod.Get, path, lambda);
  }

  post(path: string, lambda: FunctionInlineDefinition) {
    this.addRoute(HttpMethod.Post, path, lambda);
  }

  put(path: string, lambda: FunctionInlineDefinition) {
    this.addRoute(HttpMethod.Put, path, lambda);
  }

  patch(path: string, lambda: FunctionInlineDefinition) {
    this.addRoute(HttpMethod.Patch, path, lambda);
  }

  delete(path: string, lambda: FunctionInlineDefinition) {
    this.addRoute(HttpMethod.Delete, path, lambda);
  }

  any(lambda: FunctionInlineDefinition) {
    this.addRoute(HttpMethod.Any, '{proxy+}', lambda);
  }

  build(): Record<string, ApiRouteProps<AuthorizerKeys>> {
    const routes: Record<string, ApiRouteProps<AuthorizerKeys>> = {};

    for (const schema of this.schemas) {
      routes[schema.method + ' ' + schema.path] = schema.lambda;
    }

    return routes;
  }

}
