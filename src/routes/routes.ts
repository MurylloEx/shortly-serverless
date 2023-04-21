import { Lambda } from 'src/routes/factories';
import { RouterBuilder } from 'src/routes/builders';

export const Router = RouterBuilder.root('/');

Router.group('/v1', (router) => {
  router.post('/shorten', Lambda('shorten/post.main'));

  router.group('/code', (router) => {
    router.group('/{code}', (router) => {
      router.delete('/', Lambda('code/{code}/delete.main'));
      router.get('/', Lambda('code/{code}/get.main'));
      router.get('/info', Lambda('code/{code}/info/get.main'));
      router.put('/shorten', Lambda('code/{code}/shorten/put.main'));
    });
  });
});

Router.any(Lambda('any.main'));

console.log(Router.build())