import { Endpoint, Request, Response } from '@shortly/core/protocols';

export const main = Endpoint((req: Request, res: Response) => {
  res.status(404);
  res.json({
    error: 'NotFound',
    message: 'The requested resource was not found in this server'
  });
});
