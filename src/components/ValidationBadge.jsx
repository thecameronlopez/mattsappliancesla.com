import React from "react";

const ValidationBadge = ({ icon, title, desc }) => {
  return (
    <div className="validation-badge">
      <img
        src={icon}
        alt={title}
        className="validation-badge-svg"
        width="86"
        height="86"
        loading="lazy"
        decoding="async"
      />
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ValidationBadge;
