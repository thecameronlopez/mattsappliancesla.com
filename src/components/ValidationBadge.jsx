import React from "react";

const ValidationBadge = ({ icon, title, desc }) => {
  return (
    <div className="validation-badge">
      <img src={icon} alt={title} className="validation-badge-svg" />
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ValidationBadge;
