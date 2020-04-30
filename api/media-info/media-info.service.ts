import { AppError, CommonErrors } from '@helper/app-error';
import { MediaInfoCurlService } from '@services/media-info-curl.service';

export class MediaInfoService {
  async getMediaInfo(mediaInfoCurlService: MediaInfoCurlService, url: string) {
    try {
      return await mediaInfoCurlService.getMediaInfo(url);
    } catch (e) {
      throw new AppError(CommonErrors.InternalServerError, e.message);
    }
  }
}
