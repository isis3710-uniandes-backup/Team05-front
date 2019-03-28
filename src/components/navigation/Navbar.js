import React from 'react';
import { NavLink } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import MenuItems from './MenuItems';
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
            <MenuItems />
          </div>

          <div className='navbar-mobile'>
            <MobileNavbar />
          </div>
        </div>
      </nav>
    );
  }
}