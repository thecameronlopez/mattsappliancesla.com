import React from "react";

const LocationCard = ({ name, address, phone_number, link_address }) => {
  const directionsUrl =
    address !== "Coming Soon"
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
      : null;

  return (
    <article className="location-card">
      <p className="location-card-kicker">Showroom location</p>
      <h3>{name}</h3>
      {address !== "Coming Soon" ? (
        <address>{address}</address>
      ) : (
        <p>Coming Soon!</p>
      )}
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
      <div className="location-card-action">
        <a className="view-em" href={`/locations/${link_address}`}>
          View store details
        </a>
        {directionsUrl && (
          <a
            className="map-link"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="map-link-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M12 22s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Zm0-8.5A2.5 2.5 0 1 0 12 8a2.5 2.5 0 0 0 0 5Z"
                fill="currentColor"
              />
            </svg>
            <span>Get directions</span>
          </a>
        )}
      </div>
    </article>
  );
};

export default LocationCard;
