import { Endpoint, Request, Response } from '@shortly/core/protocols';

export const main = Endpoint((req: Request, res: Response) => {
  console.log('Teste')
});
