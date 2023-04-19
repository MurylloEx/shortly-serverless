import { Request, Response } from 'src/protocols/http/payload';
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Context
} from 'aws-lambda';

export type EndpointHandler = (req: Request, res: Response) => void | Promise<void>;
export type EndpointEventHandler = (event: APIGatewayProxyEventV2, context: Context) => Promise<APIGatewayProxyStructuredResultV2>;
