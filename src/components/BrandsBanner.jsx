import React from "react";
import BRANDS from "../data/brands.json";

const BrandsBanner = () => {
  const DUPLICATED = [...BRANDS, ...BRANDS];
  return (
    <div className="brand-banner">
      <h2>We carry top brands that you know and trust</h2>
      <div className="brand-trail">
        {BRANDS.map((i, index) => (
          <img src={i.src} alt={i.alt} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BrandsBanner;
