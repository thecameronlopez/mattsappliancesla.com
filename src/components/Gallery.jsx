import React from "react";
import GalleryImages from "../data/gallery.json";

const Gallery = () => {
  return (
    <div className="gallery-images">
      <h2>We got what you need</h2>
      <div className="images-from-gallery">
        {GalleryImages.map((i, index) => (
          <img src={i.src} alt={i.alt} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
