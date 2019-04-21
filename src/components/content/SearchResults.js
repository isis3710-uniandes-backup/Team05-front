import React from 'react';
import EspecimenCard from './EspecimenCard';

class SearchResults extends React.Component {
  getEspecimenCard = (especimen) => {
    return (
      <EspecimenCard key={especimen.id} redirect={this.redirect} url='/especimen' especimen={especimen} />
    );
  }

  render() {
    let title = '';
    if (this.props.value !== '') {
      const queryKey = this.props.queryKey.charAt(0).toUpperCase() + this.props.queryKey.slice(1);
      title = <h3>Resultados con <ins>{queryKey} = {this.props.value}</ins></h3>;
    } else {
      title = <h3>Resultados:</h3>;
    }

    let results = (
      <h3>Buscando...</h3>
    );
    if (this.props.results) {
      if (0 < this.props.results.length) {
        results = this.props.results.map(this.getEspecimenCard);
      } else {
        results = (
          <h3>No se encontraron especimenes.</h3>
        );
      }
    }

    return (
      <div>
        {title}
        <div className='card-view'>
          {results}
        </div>
      </div>
    );
  }
}

export default SearchResults;