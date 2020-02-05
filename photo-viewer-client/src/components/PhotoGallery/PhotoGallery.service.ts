import { Api } from "../../api";
import { IPhotoGalleryService } from "./interfaces/IPhotoGalleryService";
import { IPhotoDto } from "./interfaces/IPhotoDto";
import { IPhoto } from "./interfaces/IPhoto";

export class PhotoGalleryService implements IPhotoGalleryService {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  async getPhotos(range: any): Promise<IPhoto[]> {
    const { start, end } = range;
    const url = `/photos/${start}/${end}`;
    const photosFromServer: IPhotoDto[] = await this.api.makeRequest(url);

    if (!photosFromServer || photosFromServer.length < 0) {
      return [];
    }

    const photos: IPhoto[] = this.mapDtoToEntity(photosFromServer);

    return photos;
  }

  async getPhotosInGrayscale(range: any): Promise<IPhoto[]> {
    const { start, end } = range;
    const url = `/photos/${start}/${end}/grayscale`;
    const photosFromServer: IPhotoDto[] = await this.api.makeRequest(url);

    if (!photosFromServer || photosFromServer.length < 0) {
      return [];
    }
    
    const photos: IPhoto[] = this.mapDtoToEntity(photosFromServer);

    return photos;
  }

  getListOfDimensions(photos: IPhoto[]): string[] {
    const dimensions = photos.map(({ width, height }) => `${width}X${height}`);

    return [...new Set(dimensions)]
  }

  filterPhotosByDimension(selectedDimension: string, photos: IPhoto[]): IPhoto[] {
    if (!selectedDimension && photos) {
      photos = photos.map(photo => ({...photo, showPhoto: true}));
    } 
    else if (photos) {
      photos = photos.map(photo => {
        const { width, height } = photo;
        const dimension = `${width}X${height}`;
        photo.showPhoto = selectedDimension === dimension;

        return photo;
      });
    }

    return photos;
  }

  private mapDtoToEntity(dto: IPhotoDto[]): IPhoto[] {
    return dto.map(item => ({
      ...item,
      showPhoto: true
    }));
  }
}
