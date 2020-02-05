import { Controller, Get, Param, BadRequestException, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './photo';

@Controller('photos')
@UseInterceptors(CacheInterceptor)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get(':startIndex/:endIndex')
  async getPhotos(@Param('startIndex') startIndex: string, @Param('endIndex') endIndex: string): Promise<Photo[]> {
    let photos: Photo[];
    const range = this.validateRangeParameters(startIndex, endIndex);
    photos = await this.photosService.getPhotos(range);

    return photos;
  }

  @Get(':startIndex/:endIndex/grayscale')
  async getPhotosInGrayScale(@Param('startIndex') startIndex: string, @Param('endIndex') endIndex: string): Promise<Photo[]> {
    let photos: Photo[];
    const range = this.validateRangeParameters(startIndex, endIndex);
    photos = await this.photosService.getPhotosInGrayScale(range);

    return photos;
  }

  private validateRangeParameters(startIdx, endIdx) {
    const radix  = 10;
    const num1 = parseInt(startIdx, radix);
    const num2 = parseInt(endIdx, radix);

    if (isNaN(num1) && isNaN(num2) || num1 < 0 || num2 < 0) {
      throw new BadRequestException('Invalid parameter');
    }

    return {
      start: num1,
      end: num2,
    };
  }
}
