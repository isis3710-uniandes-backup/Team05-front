import React from 'react';
import './Card.css';

const ClaseCard = ({ redirect, url, clase, imagen }) => (
  <div className='card' onMouseDown={() => redirect(`${url}?clase=${clase}`)}>
    <img src={imagen} alt={clase} />
    <h2><a href={`${url}?clase=${clase}`}>{clase}</a></h2>
  </div>
);

export default ClaseCard;