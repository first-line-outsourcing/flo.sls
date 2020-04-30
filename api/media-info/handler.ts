import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { MediaInfoManager } from './media-info.manager';

export async function getMediaInfo(event, context) {
  log(event);

  try {
    const manager = new MediaInfoManager();
    return await manager.getMediaInfo(event.body.url);
  } catch (e) {
    errorHandler(e);
  }
}
