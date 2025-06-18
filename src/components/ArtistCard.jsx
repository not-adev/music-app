import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ name, image, link }) => {
  return (
    <div className="artist-card">
      <Link to={link}>
        <div>
          <img src={image} alt={name} className="artist-image" />
        </div>
        <div className="artist-info">
          <div>{name}</div>
          <div>Artist</div>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;