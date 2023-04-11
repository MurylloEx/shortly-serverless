import { Time } from '@shortly/core';
import { ApiHandler } from 'sst/node/api';

export const main = ApiHandler(async (evt, ctx)  => {
  return {
    body: `Hello world! Current hour: ${Time.now()}`
  };
});
