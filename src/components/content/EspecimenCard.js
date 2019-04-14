import React from 'react';
import './Card.css';

const Especimen = ({ redirect, url, especimen }) => (
  <div className='card' onMouseDown={() => redirect(`${url}/${especimen.id}`)}>
    <img src={especimen.imagen} alt={especimen.especie} />
    <h3><a href={`${url}/${especimen.id}`}>{especimen.especie}</a></h3>
  </div>
);

export default Especimen;