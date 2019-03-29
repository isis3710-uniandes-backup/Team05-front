import React from 'react';
import * as qs from 'query-string';
import EspecimenCard from '../content/EspecimenCard';
import '../content/CardView.css';

export default class Clase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clase: 'Loading...',
      especimenes: []
    };
  }

  async componentDidMount() {
    const clase = qs.parse(this.props.location.search).clase;
    const request = await fetch(`https://boiling-brushlands-27343.herokuapp.com/api/especimenes?clase=${clase}`);
    const especimenes = await request.json();
    this.setState({
      clase: clase,
      especimenes: especimenes
    });
  }

  redirect = (url) => {
    this.props.history.push(url);
  }

  getEspecimenCard = (especimen) => (
    <EspecimenCard key={especimen.id} redirect={this.redirect} url='/especimen' especimen={especimen} />
  )

  render() {
    const especimenes = this.state.especimenes.map(this.getEspecimenCard);

    return (
      <div>
        <h1>{this.state.clase}</h1>
        <div className='card-view'>
          {especimenes}
        </div>
      </div>
    );
  }
}