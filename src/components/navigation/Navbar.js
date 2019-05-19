import React from "react";
import { NavLink } from "react-router-dom";
import base from "../../base";
import "./Navbar.css";
import { FormattedMessage } from "react-intl";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false
    };
  }

  componentDidMount() {
    base.auth().onAuthStateChanged(user => {
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
        <ul className="navbar-items">
          <li className="navbar-item">
            <NavLink exact to="/">
              <FormattedMessage id="nav.inicio" defaultMessage="Inicio" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/especimen/record-new">
            <FormattedMessage id="nav.add" defaultMessage="Añadir espécimen" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/vistaGlobal">
              <FormattedMessage id="nav.global" defaultMessage="Vista global" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/nosotros">
              <FormattedMessage id="nav.nosotros" defaultMessage="Nosotros" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/logout">
              <FormattedMessage id="logout.navbar" defaultMessage="Cerrar sesión" />
            </NavLink>
          </li>
        </ul>
      );
    } else {
      userViews = (
        <ul className="navbar-items">
          <li className="navbar-item">
            <NavLink exact to="/">
              <FormattedMessage id="nav.inicio" defaultMessage="Inicio" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/vistaGlobal">
              <FormattedMessage id="nav.global" defaultMessage="Vista global" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/nosotros">
              <FormattedMessage id="nav.nosotros" defaultMessage="Nosotros" />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/login">
              <FormattedMessage
                id="nav.sesion"
                defaultMessage="Inicia sesión"
              />
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/signup">
              <FormattedMessage
                id="nav.registrar"
                defaultMessage="Regístrate"
              />
            </NavLink>
          </li>
        </ul>
      );
    }

    return (
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-banner">
            <NavLink exact to="/">
              bioAndes
            </NavLink>
          </h1>
          {userViews}
        </div>
      </nav>
    );
  }
}

export default Navbar;
