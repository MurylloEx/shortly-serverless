import { Lambda } from 'src/routes/factories';
import { RouterBuilder } from 'src/routes/builders';

export const Router = RouterBuilder.root('/');

Router.group('/', (router) => {
  router.group('/shorten', (router) => {
    router.post('/{url}', Lambda('shorten/post.main'));
  });

  router.group('/code', (router) => {
    router.group('/{code}', (router) => {
      router.delete('/', Lambda('code/{code}/delete.main'));
      router.get('/', Lambda('code/{code}/get.main'));
      router.get('/clicks', Lambda('code/{code}/clicks/get.main'));
      router.put('/shorten/{url}', Lambda('code/{code}/put.main'));
    });
  });

  router.any(Lambda('any.main'));
});

