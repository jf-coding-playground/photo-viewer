import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import * as fs from 'fs';

import { Photo } from './photo';
import { CsvPhoto } from './csvPhoto';

@Injectable()
export class PhotosService {
  constructor(private readonly csvParser: CsvParser) {}

  async getPhotos(range: any): Promise<Photo[]> {
    const photos = await this.getPhotosFromCsv();
    const { start, end } = range;

    return this.photoEntityMapper(photos.list.slice(start, end));
  }

  async getPhotosInGrayScale(range: any): Promise<Photo[]> {
    const photos = await this.getPhotosFromCsv();
    const { start, end } = range;

    return this.photoEntityMapper(photos.list.slice(start, end), true);
  }

  private async getPhotosFromCsv() {
    const stream = fs.createReadStream(__dirname + '/../../../data/photos.csv');
    const photos = await this.csvParser.parse(stream, CsvPhoto);

    return photos;
  }

  private getAttributesFromUrl(url) {
    /**
     *
     * https://picsum.photos/id/12/300/200
     *                      /id/{id}/{width}/{height}
     */
    const segments = url.split('/');

    return {
      id: segments[4],
      width: segments[5],
      height: segments[6],
    };
  }

  private photoEntityMapper(photoUrls: CsvPhoto[], isGrayScale: boolean = false): Photo[] {
    return photoUrls.map((photo: CsvPhoto) => {
      let { url } = photo;
      const { id, width, height } = this.getAttributesFromUrl(url);

      if (isGrayScale) {
        url += '?grayscale';
      }

      return {
        id,
        url,
        width,
        height,
      };
    });
  }
}
