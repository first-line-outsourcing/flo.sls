import { execFile } from 'child_process';
import { promisify } from 'util';
import * as parser from 'xml2js';

export class MediaInfoCurlService {
  private readonly mediaInfoCurl = './mediainfo-curl';

  async getMediaInfo(url: string) {
    const execPromise = promisify(execFile);
    const mediaInfoXML = await execPromise(this.mediaInfoCurl, ['--Output=XML', '-f', url], {});

    const parserPromise = promisify(parser.parseString);
    const mediaInfo = await parserPromise(mediaInfoXML.stdout);
    return mediaInfo?.MediaInfo?.media[0]?.track?.[0];
  }
}
