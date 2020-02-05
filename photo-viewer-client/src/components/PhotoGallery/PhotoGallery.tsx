import React from "react";
import { IPhoto } from "./interfaces/IPhoto";
import "./PhotoGallery.css";

export const PhotoGallery = ({
  photos,
  dimensions,
  grayscale,
  filterByDimension,
  toggleGrayscale
}: {
  photos: IPhoto[] | null;
  dimensions: string[] | null;
  grayscale: boolean;
  filterByDimension(e: any): void;
  toggleGrayscale(): void;
}) => (
  <div className="photo-gallery-container">
    <div className="photo-gallery-controls">
      <div className="photo-gallery-options">
        <select className="photo-gallery-option" onChange={filterByDimension}>
          <option key={"opt-blank"} value={""}>All dimensions</option>
          {dimensions?.map((dimension, i: number) => <option key={"opt-"+i} value={dimension}>{dimension}</option>)}
        </select>
        <div className="select_arrow"></div>
      </div>

      <button 
        className={`photo-gallery-grayscale-btn ${grayscale ? "photo-gallery-grayscale-btn--on" : "photo-gallery-grayscale-btn--off"}`} 
        onClick={toggleGrayscale}>
          Toggle grayscale
      </button>
    </div>

    <div className="photo-gallery-photos">
      {photos &&
        photos.map((photo: IPhoto, i: number) => {
          const { showPhoto } = photo;
          // add regular class to every two photos, add class small to the next three photos afterwards
          const className: string = (i % 5 < 2) ? "photo-item" : "photo-item-small";

          return (showPhoto &&
            <div key={"photo-item-"+i} className={className}>
              <img
                key={photo.id}
                src={photo.url}
                width={photo.width}
                height={photo.height}
                alt=""
              />
            </div>
          );
        })}
        {!photos && <div>Unable to fetch photos. </div>}
    </div>
  </div>
);
