import { AppError, CommonErrors } from '@helper/app-error';
import { MediaInfoCurlService } from '@services/media-info-curl.service';

export class MediaInfoService {
  async getMediaInfo(mediaInfoCurlService: MediaInfoCurlService, url: string) {
    /**
     * Try to catch unexpected errors
     */
    let mediaInfo;
    try {
      mediaInfo = await mediaInfoCurlService.getMediaInfo(url);
    } catch (e) {
      throw new AppError(CommonErrors.InternalServerError, e.message);
    }
    /**
     * If !mediaInfo it means that the URL is broken or doesn't have access
     */
    if (!mediaInfo) {
      throw new AppError(CommonErrors.BadRequest, 'Can\'t extract media info. Please, check your URL');
    }
    return mediaInfo;
  }
}
