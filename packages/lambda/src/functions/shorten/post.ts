import { ShortlyService } from '@shortly/core/services';
import { Endpoint, Request, Response } from '@shortly/core/protocols';


export const main = Endpoint(async (req: Request, res: Response) => {
  const shortlyService = new ShortlyService();
  const url = req.query('url');

  if (url) {
    return await shortlyService.createByRealUrl(url);
  }

  res.status(400).json({
    error: 'BadRequest',
    message: 'Your request doesnt have the url field in path param.',
    path: req.getPath(),
    query: req.getQueryMap(),
    params: req.getParamMap(),
  });
});
