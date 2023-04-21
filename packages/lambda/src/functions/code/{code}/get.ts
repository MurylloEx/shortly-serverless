import { ShortlyService } from '@shortly/core/services';
import { Endpoint, Request, Response } from '@shortly/core/protocols';

export const main = Endpoint(async (req: Request, res: Response) => {
  const shortlyService = new ShortlyService();
  const shortCode = req.param('code');

  if (shortCode) {
    const shortenUrl = await shortlyService.getByCode(shortCode);
    
    if (shortenUrl) {
      await shortlyService.incrementAccessCountByCode(shortCode);

      return res.status(301)
        .header('Location', shortenUrl.realUrl)
        .json(shortenUrl);
    }
  }

  res.status(404).json({
    error: 'NotFound',
    message: 'This short code was not found in our database of shorten urls.',
    path: req.getPath(),
    query: req.getQueryMap(),
    params: req.getParamMap(),
  });
});
