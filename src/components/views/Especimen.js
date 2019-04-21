import React from 'react';
import '../content/Loading';
import './Especimen.css';
import Loading from '../content/Loading';

export default class Especimen extends React.Component {
  constructor() {
    super();
    this.state = {
      especie: null,
      especimen: null
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const request = await fetch(`https://boiling-brushlands-27343.herokuapp.com/api/especimen/${id}`);
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
        <div className='especimen-wrapper'>
          <img src={this.state.especimen.imagen} alt={this.state.especie} />
          <ul className='especimen-info'>
            <li>Dominio: {this.state.especimen.dominio}</li>
            <li>Reino: {this.state.especimen.reino}</li>
            <li>Filo: {this.state.especimen.filo}</li>
            <li>Clase: {this.state.especimen.clase}</li>
            <li>Orden: {this.state.especimen.orden}</li>
            <li>Familia: {this.state.especimen.familia}</li>
            <li>Género: {this.state.especimen.genero}</li>
          </ul>
        </div>
      );
    } else {
      especimen = <Loading />;
    }

    return (
      <div className='fill-area'>
        <h1>{this.state.especie}</h1>
        {especimen}
      </div>
    );
  }
}