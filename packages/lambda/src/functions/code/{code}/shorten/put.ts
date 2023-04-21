import { ShortlyService } from '@shortly/core/services';
import { Endpoint, Request, Response } from '@shortly/core/protocols';

export const main = Endpoint(async (req: Request, res: Response) => {
  const shortlyService = new ShortlyService();
  const url = req.query('url');
  const shortCode = req.param('code');
  
  if (url && shortCode) {
    return await shortlyService.changeShortenUrl(shortCode, url);
  }
  
  res.status(400).json({
    error: 'BadRequest',
    message: 'Your request doesnt have the url or the code field in the path param.',
    path: req.getPath(),
    query: req.getQueryMap(),
    params: req.getParamMap(),
  });
});
