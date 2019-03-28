import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <h1 className='navbar-banner'>
          <NavLink exact to='/'>bioAndes</NavLink>
        </h1>
        <div className='navbar-item'>
          <NavLink exact to='/colecciones'>Colecciones</NavLink>
        </div>
        <div className='navbar-item'>
          <NavLink exact to='/nosotros'>Nosotros</NavLink>
        </div>
        <div className='navbar-item'>
          <NavLink exact to='/contactenos'>Contáctenos</NavLink>
        </div>
      </nav>
    );
  }
}