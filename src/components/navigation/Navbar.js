import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className='navbar'>
    <div className='navbar-content'>
      <h1 className='navbar-banner'>
        <NavLink exact to='/'>bioAndes</NavLink>
      </h1>
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
          <NavLink exact to='/signup'>Regístrate</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;