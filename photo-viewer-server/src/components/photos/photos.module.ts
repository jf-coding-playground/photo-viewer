import { Module, CacheModule } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';

@Module({
  imports: [
    CsvModule,
    CacheModule.register(),
  ],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
