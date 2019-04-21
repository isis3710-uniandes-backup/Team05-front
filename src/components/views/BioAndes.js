import React from 'react';
import './BioAndes.css';
import '../content/SearchBar';
import SearchBar from '../content/SearchBar';
import SearchResults from '../content/SearchResults';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      key: '',
      value: '',
      searchResults: null
    }
  }

  componentDidMount = async () => {
    const response = await fetch('http://api.bioandes.cpotdevin.com/api/especimenes');
    const especimenes = await response.json();

    this.setState({ searchResults: especimenes });
  }

  handleSearch = async (key, value) => {
    this.setState({ 
      key: key,
      value: value,
      searchResults: null
    });

    const query = value !== '' ? `?${key}=${value}` : '';
    const response = await fetch('http://api.bioandes.cpotdevin.com/api/especimenes' + query);
    const especimenes = await response.json();

    this.setState({ searchResults: especimenes });
  }

  render() {
    return (
      <div className='bioandes-view'>
        <div className='bioandes-search'>
          <h1>Bienvenido a bioAndes</h1>
          <div className='bioandes-searchbar'>
            <SearchBar handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className='bioandes-search-content'>
          <div className='bioandes-search-results'>
            {/* <h2>Aquí puede encontrar los especímenes que hemos encontrado en el departamento de biología de la Universidad de los Andes </h2>
            <img alt='Dos guacamayas posadas en una rama' src='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/front.png?alt=media&token=c41e283f-89d6-4d8a-b8d1-07819e2d791c' /> */}
            <SearchResults queryKey={this.state.key} value={this.state.value} results={this.state.searchResults} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;