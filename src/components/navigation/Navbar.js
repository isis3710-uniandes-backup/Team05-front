import React from 'react';
import { NavLink } from 'react-router-dom';
import base from '../../base';
import './Navbar.css';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false
    }
  }

  componentDidMount() {
    base.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ signedIn: true });
      } else {
        this.setState({ signedIn: false });
      }
    });
  }

  render() {
    let userViews = null;
    if (this.state.signedIn) {
      userViews = (
        <ul className='navbar-items'>
          <li className='navbar-item'>
            <NavLink exact to='/'>Inicio</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink exact to='/especimen/record-new'>Añadir espécimen</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink exact to='/nosotros'>Nosotros</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink exact to='/logout'>Cerrar sesión</NavLink>
          </li>
        </ul>
      )
    } else {
      userViews = (
        <ul className='navbar-items'>
          <li className='navbar-item'>
            <NavLink exact to='/'>Inicio</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink exact to='/nosotros'>Nosotros</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink exact to='/login'>Inicia sesión</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink exact to='/signup'>Regístrate</NavLink>
          </li>
        </ul>
      );
    }

    return (
      <nav className='navbar'>
        <div className='navbar-content'>
          <h1 className='navbar-banner'>
            <NavLink exact to='/'>bioAndes</NavLink>
          </h1>
          {userViews}
        </div>
      </nav>
    );
  }
}

export default Navbar;