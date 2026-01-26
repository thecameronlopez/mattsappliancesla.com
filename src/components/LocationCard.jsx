import React from "react";

const LocationCard = ({ name, address, phone_number, link_address }) => {
  return (
    <article className="location-card">
      <h3>{name}</h3>
      {address !== "Coming Soon" && <address>{address}</address>}
      {phone_number !== "Coming Soon" && (
        <p>
          tel:{" "}
          <a
            className="dial-phone"
            href={`tel:${phone_number.replace(/\D/g, "")}`}
          >
            {phone_number}
          </a>
        </p>
      )}
      <p>
        <a className="view-em" href={`/locations/${link_address}`}>
          View store details
        </a>
      </p>
    </article>
  );
};

export default LocationCard;
