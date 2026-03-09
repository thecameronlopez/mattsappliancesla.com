import React from "react";
import BRANDS from "../data/brands.json";

const logoDimensions = {
  "/images/brand-logos/frigidaire.png": { width: 64, height: 8 },
  "/images/brand-logos/ge.png": { width: 64, height: 64 },
  "/images/brand-logos/lg.png": { width: 64, height: 30 },
  "/images/brand-logos/samsung.png": { width: 64, height: 18 },
  "/images/brand-logos/whirlpool.png": { width: 64, height: 22 },
  "/images/brand-logos/kenmore.png": { width: 64, height: 65 },
};

const BrandsBanner = () => {
  return (
    <div className="brand-banner">
      <h2>We carry top brands that you know and trust</h2>
      <div className="brand-trail">
        {BRANDS.map((i, index) => {
          const dims = logoDimensions[i.src] || { width: 64, height: 32 };
          return (
            <img
              src={i.src}
              alt={i.alt}
              key={index}
              width={dims.width}
              height={dims.height}
              loading="lazy"
              decoding="async"
            />
          );
        })}
      </div>
    </div>
  );
};

export default BrandsBanner;
