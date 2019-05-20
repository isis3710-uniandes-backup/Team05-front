import React from "react";
import { FormattedMessage } from "react-intl";
import Loading from "../content/Loading";
import "./Especimen.css";

export default class Especimen extends React.Component {
  constructor() {
    super();
    this.state = {
      especie: null,
      especimen: null
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const request = await fetch(
      `http://api.bioandes.cpotdevin.com/api/especimen/${id}`
    );
    const especimen = await request.json();
    this.setState({
      especie: especimen.especie,
      especimen: especimen
    });
  }

  render() {
    let especimen = null;
    if (this.state.especimen) {
      especimen = (
        <div className="especimen-wrapper">
          <img src={this.state.especimen.imagen} alt={this.state.especie} />
          <ul className="especimen-info">
            <li>
              <FormattedMessage id="especimen.dominio" defaultMessage="Dominio: " />{this.state.especimen.dominio}
            </li>
            <li>
              <FormattedMessage id="especimen.reino" defaultMessage="Reino: " />{this.state.especimen.reino}
            </li>
            <li>
              <FormattedMessage id="especimen.filo" defaultMessage="Filo: " />{this.state.especimen.filo}
            </li>
            <li>
              <FormattedMessage id="especimen.clase" defaultMessage="Clase: " />{this.state.especimen.clase}
            </li>
            <li>
              <FormattedMessage id="especimen.orden" defaultMessage="Orden: " />{this.state.especimen.orden}
            </li>
            <li>
              <FormattedMessage id="especimen.familia" defaultMessage="Familia: " />{this.state.especimen.familia}
            </li>
            <li>
              <FormattedMessage id="especimen.genero" defaultMessage="Género: " />{this.state.especimen.genero}
            </li>
          </ul>
        </div>
      );
    } else {
      especimen = <Loading />;
    }

    return (
      <div className="fill-area">
        <h1>{this.state.especie}</h1>
        {especimen}
      </div>
    );
  }
}
