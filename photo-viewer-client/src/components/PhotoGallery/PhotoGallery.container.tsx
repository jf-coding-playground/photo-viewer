import React, { Component } from "react";
import { PhotoGallery } from "./PhotoGallery";
import { PhotoGalleryService } from "./PhotoGallery.service";
import { IPhoto } from "./interfaces/IPhoto";
import { IPhotoGalleryContainer } from "./interfaces/IPhotoGalleryContainer";
import { debounce } from "../../tools/helpers";

interface IState {
  range: {
    start: number;
    end: number;
  };
  photos: IPhoto[] | null;
  dimensions: string[] | null;
  selectedDimension: string | null;
  isGrayscale: boolean;
}

export default class PhotoGalleryContainer extends Component<{}, IState>
  implements IPhotoGalleryContainer {
  private photoGalleryService: PhotoGalleryService;

  constructor(props: any) {
    super(props);

    this.photoGalleryService = new PhotoGalleryService();
    this.state = {
      range: {
        start: 0,
        end: 10
      },
      photos: null,
      dimensions: null,
      selectedDimension: null,
      isGrayscale: false,
    };
  }

  async componentDidMount() {
    const { range } = this.state;

    await this.loadPhotos(range);
    window.onscroll = debounce(() => this.handleInfiniteScroll(), 500);
  }

  loadPhotos = async (range: { start: number; end: number }) => {
    let { photos, isGrayscale, selectedDimension } = this.state;
    const newPhotos: IPhoto[] = isGrayscale
      ? await this.photoGalleryService.getPhotosInGrayscale(range)
      : await this.photoGalleryService.getPhotos(range);

    if (newPhotos.length > 0) {
      if (!photos) {
        photos = newPhotos;
      } else if (photos && newPhotos.length > 0) {
        photos = [...photos, ...newPhotos];
      }

      if (selectedDimension) {
        photos = this.photoGalleryService.filterPhotosByDimension(
          selectedDimension,
          photos
        );
      }

      await this.setState({ photos });
      this.loadPhotoDimensions();
    }
  };

  loadPhotoDimensions = () => {
    let { dimensions, photos } = this.state;

    if (photos) {
      dimensions = this.photoGalleryService.getListOfDimensions(photos);
      this.setState({ dimensions });
    }
  };

  handleInfiniteScroll = async () => {
    const { range, selectedDimension } = this.state;
    const lastPhoto: HTMLElement | null = document.querySelector("div.photo-gallery-photos > div:last-child");
    const lastPhotoOffset = lastPhoto ? lastPhoto.offsetTop + lastPhoto.clientHeight : null;
    const pageOffset = window.pageYOffset + window.innerHeight;

    console.log(pageOffset, lastPhotoOffset)

    if (lastPhotoOffset && pageOffset >= lastPhotoOffset && !selectedDimension) {
      range.start = range.end;
      range.end += 10;

      await this.setState({ range });
      await this.loadPhotos(range);
    }
  };

  handleFilterByDimension = (e: any) => {
    let { photos } = this.state;
    const selectedDimension = e.target.value;

    photos = photos
      ? this.photoGalleryService.filterPhotosByDimension(
          selectedDimension,
          photos
        )
      : photos;

    this.setState({ photos, selectedDimension });
  };

  handleToggleGrayscale = async () => {
    let { isGrayscale, range, photos } = this.state;
    const loadedPhotos = {
      start: 0,
      end: range.end
    };

    isGrayscale = !isGrayscale;
    photos = null;

    await this.setState({ isGrayscale, photos });
    await this.loadPhotos(loadedPhotos);
  };

  render() {
    const { photos, dimensions, isGrayscale } = this.state;

    return (
      <PhotoGallery
        photos={photos}
        dimensions={dimensions}
        grayscale={isGrayscale}
        filterByDimension={this.handleFilterByDimension}
        toggleGrayscale={this.handleToggleGrayscale}
      />
    );
  }
}
