import React from 'react';
import './Card.css';

const ClaseCard = ({ redirect, url, clase, imagen }) => (
  <div className='card' onMouseDown={() => redirect(`${url}?clase=${clase}`)}>
    <img src={imagen} alt={clase} />
    <h2>{clase}</h2>
  </div>
);

export default ClaseCard;