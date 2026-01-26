import {
  faFacebook,
  faGoogle,
  faInstagram,
  faYelp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialMediaBadges = () => {
  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const links = [
    {
      icon: faFacebook,
      url: "https://www.facebook.com/mattsusedappliances",
      label: "Facebook",
    },
    {
      icon: faInstagram,
      url: "https://www.instagram.com/mattsnewandusedappliances/",
      label: "Instagram",
    },
    {
      icon: faGoogle,
      url: "https://share.google/TX6j2E94YnGBUmvgp",
      label: "Google",
    },
    {
      icon: faYelp,
      url: "https://www.yelp.com/biz/matts-appliances-lake-charles-3?osq=Matt%E2%80%99s+Appliances",
      label: "Yelp",
    },
  ];

  return (
    <div className="social-media-badges">
      {links.map(({ icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaBadges;
