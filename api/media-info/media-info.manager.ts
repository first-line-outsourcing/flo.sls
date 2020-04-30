import { AppError, CommonErrors } from '@helper/app-error';
import { MediaInfoCurlService } from '@services/media-info-curl.service';
import { MediaInfoService } from './media-info.service';

export class MediaInfoManager {
  private readonly service: MediaInfoService;

  constructor() {
    this.service = new MediaInfoService();
  }

  getMediaInfo(url: string) {
    if (!url) {
      throw new AppError(CommonErrors.BadRequest, "The param 'url' is required.");
    }

    const mediaInfoCurlService = new MediaInfoCurlService();
    return this.service.getMediaInfo(mediaInfoCurlService, url);
  }
}
