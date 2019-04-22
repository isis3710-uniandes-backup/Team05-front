import React from "react";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-content">
      <h1 className="navbar-banner">
        <NavLink exact to="/">
          bioAndes
        </NavLink>
      </h1>
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink exact to="/">
            <FormattedMessage id="nav.inicio" defaultMessage="Inicio" />
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink exact to="/nosotros">
            <FormattedMessage id="nav.nosotros" defaultMessage="Nosotros" />
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink exact to="/login">
          <FormattedMessage id="nav.sesion" defaultMessage="Inicia sesión" />
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink exact to="/signup">
            <FormattedMessage id="nav.registrar" defaultMessage="Regístrate"/>
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
