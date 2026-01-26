import React, { useEffect, useState } from "react";
import Images from "../data/carousel.json";

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-carousel">
      <img
        src={Images[currentImageIndex].src}
        alt={Images[currentImageIndex].alt}
      />
    </div>
  );
};

export default ImageCarousel;
