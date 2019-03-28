import React from 'react';
import { NavLink } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import './Navbar.css';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-content'>
          <div className='navbar-desktop'>
            <h1 className='navbar-banner'>
              <NavLink exact to='/'>bioAndes</NavLink>
            </h1>
            <ul className='navbar-items'>
              <li className='navbar-item'>
                <NavLink exact to='/'>Inicio</NavLink>
              </li>
              <li className='navbar-item'>
                <NavLink exact to='/colecciones'>Colecciones</NavLink>
              </li>
              <li className='navbar-item'>
                <NavLink exact to='/nosotros'>Nosotros</NavLink>
              </li>
              <li className='navbar-item'>
                <NavLink exact to='/contactenos'>Contáctenos</NavLink>
              </li>
            </ul>
          </div>

          <div className='navbar-mobile'>
            <MobileNavbar />
          </div>
        </div>
      </nav>
    );
  }
}