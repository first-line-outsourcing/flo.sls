import { execFile } from 'child_process';
import { promisify } from 'util';
import * as parser from 'xml2js';

/**
 * This file contains the service that works with some third party library, API, etc.
 * This file should contain all required interfaces for this service
 */

export interface MediaInfo {
  MediaInfo?: {
    media?: Media[];
  };
}

export interface Media {
  track?: Track[];
}

export interface Track {
  duration: number;
}

/**
 * This services works with some third party library, API, etc.
 */
export class MediaInfoCurlService {
  private readonly mediaInfoCurl = 'mediainfo-curl';

  async getMediaInfo(url: string): Promise<Track | undefined> {
    /**
     * Get Media Info from mediainfo-curl
     */
    const execPromise = promisify(execFile);
    const mediaInfoXML = await execPromise(
      this.mediaInfoCurl,
      [
        '--Output=XML',
        '-f',
        // https://github.com/MediaArea/MediaInfoLib/issues/221#issuecomment-615178083
        '--urlencode',
        url,
      ],
      {}
    );

    /**
     * Parse XML to JS
     */
    const parserPromise = promisify(parser.parseString);
    const mediaInfo: MediaInfo = await parserPromise(mediaInfoXML.stdout);

    return mediaInfo?.MediaInfo?.media?.[0]?.track?.[0];
  }
}
