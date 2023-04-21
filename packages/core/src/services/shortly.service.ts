import { ShortUrl } from 'src/database';
import { Repository } from 'src/repositories';

export class ShortlyService {

  protected readonly ShortlyRepository = Repository.from(ShortUrl);

  async createByRealUrl(realUrl: string) {
    return await this.ShortlyRepository.create({ realUrl });
  }

  async getByCode(shortCode: string) {
    try {
      const shortenUrl = await this.ShortlyRepository.getOne({ shortCode });
      return shortenUrl;
    } catch (e) {
      return false;
    }
  }

  async deleteByCode(shortCode: string) {
    try {
      const shortenUrl = await this.ShortlyRepository.remove({ shortCode });
      return shortenUrl;
    } catch (e) {
      return false;
    }
  }

  async changeShortenUrl(shortCode: string, realUrl: string) {
    const oldShortenUrl = await this.ShortlyRepository.getOne({ shortCode });
    return await this.ShortlyRepository.update(oldShortenUrl, { realUrl });
  }

  async incrementAccessCountByCode(shortCode: string) {
    const oldShortenUrl = await this.ShortlyRepository.getOne({ shortCode });
    return await this.ShortlyRepository.update(oldShortenUrl, { 
      accessCount: oldShortenUrl.accessCount + 1 
    });
  }

}
