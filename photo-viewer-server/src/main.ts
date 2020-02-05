import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PhotosModule } from './components/photos/photos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PhotosModule,
  ],
})
export class AppModule {}

(async function main() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT);
})();
