import React from "react";
import GalleryImages from "../data/gallery.json";

const Gallery = () => {
  return (
    <div className="gallery-images">
      {GalleryImages.map((i, index) => (
        <img src={i.src} alt={i.alt} key={index} />
      ))}
    </div>
  );
};

export default Gallery;
