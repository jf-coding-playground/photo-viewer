import { IPhoto } from "./IPhoto";

export interface IPhotoGalleryService {
  getPhotos(range: any): Promise<IPhoto[]>;
  getPhotosInGrayscale(range: any): Promise<IPhoto[]>;
  getListOfDimensions(photos: IPhoto[]): string[];
  filterPhotosByDimension(dimension: string, photos: IPhoto[]): IPhoto[];
}