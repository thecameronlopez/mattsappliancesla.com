import {
  faFacebook,
  faGoogle,
  faInstagram,
  faYelp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialMediaBadges = () => {
  return (
    <div className="social-media-badges">
      <FontAwesomeIcon icon={faFacebook} />
      <FontAwesomeIcon icon={faInstagram} />
      <FontAwesomeIcon icon={faGoogle} />
      <FontAwesomeIcon icon={faYelp} />
    </div>
  );
};

export default SocialMediaBadges;
