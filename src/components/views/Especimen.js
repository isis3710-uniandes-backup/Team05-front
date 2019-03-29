import React from 'react';
import './Especimen.css';

export default class Especimen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      especie: 'Cargando...'
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
    let especimen = <div></div>;
    if (this.state.especimen) {
      especimen = (
        <div className='especimen-wrapper'>
          <img src={this.state.especimen.imagen} alt={this.state.especie} />
          <div className='especimen-info'>
            <p>Reino: {this.state.especimen.reino}</p>
            <p>Clase: {this.state.especimen.clase}</p>
            <p>Orden: {this.state.especimen.orden}</p>
            <p>Familia: {this.state.especimen.familia}</p>
            <p>Género: {this.state.especimen.genero}</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>{this.state.especie}</h1>
        {especimen}
      </div>
    );
  }
}