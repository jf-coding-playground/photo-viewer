export interface IPhotoGalleryContainer {
  loadPhotos(range: {start: number, end: number}): Promise<void>;
  loadPhotoDimensions(): void;
  handleInfiniteScroll(event: any): void;
  handleFilterByDimension(event: any): void;
  handleToggleGrayscale(): void;
}