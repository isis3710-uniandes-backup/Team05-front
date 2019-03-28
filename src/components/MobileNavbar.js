import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuItems from './MenuItems';
import './MobileNavbar.css';

export default class MobileMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false
    }
  }
  
  handleMouseDown = (e) => {
    this.toggleMenu();
    e.stopPropagation();
  }

  toggleMenu = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <div className='navbar-mobile-content'>
        <h1>
          <NavLink exact to='/'>bioAndes</NavLink>
        </h1>
        <button onClick={this.handleMouseDown}>Menu</button>
        <div id='navbar-opaque'
              onMouseDown={this.handleMouseDown}
              className={this.state.visible ? 'navbar-opaque-show' : 'navbar-opaque-hide'} />
        <div id='navbar-mobile-slide'
            onMouseDown={this.handleMouseDown}
            className={this.state.visible ? 'navbar-mobile-show' : 'navbar-mobile-hide'}>
          <MenuItems />
        </div>
      </div>
    );
  }
}