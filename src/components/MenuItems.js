import React from 'react';
import { NavLink } from 'react-router-dom';

export default class MenuItems extends React.Component {
  render() {
    return (
      <ul className='navbar-items'>
        <li className='navbar-item'>
          <NavLink exact to='/'>Inicio</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink exact to='/clases'>Clases</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink exact to='/nosotros'>Nosotros</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink exact to='/contactenos'>Contáctenos</NavLink>
        </li>
      </ul>
    );
  }
}