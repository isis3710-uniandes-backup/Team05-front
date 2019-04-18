import React from 'react';
import './Card.css';

const ClaseCard = ({ redirect, url, clase, imagen }) => {
  const imageStyle = {
    backgroundImage: `url(${imagen})`
  };

  return (
    <div className='card' onClick={() => redirect(`${url}?clase=${clase}`)}>
      <div style={imageStyle} />
      <h2><a href={`${url}?clase=${clase}`}>{clase}</a></h2>
    </div>
  );
};

export default ClaseCard;