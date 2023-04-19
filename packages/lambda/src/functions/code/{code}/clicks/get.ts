import { Endpoint, Request, Response } from '@shortly/core';

export const main = Endpoint((req: Request, res: Response) => {
  console.log('Teste')
});
