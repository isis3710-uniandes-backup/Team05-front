import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSearch: props.handleSearch,
      datalist: []
    }
  }

  componentDidMount = async () => {
    const response = await fetch('http://api.bioandes.cpotdevin.com/api/dominios');
    const options = await response.json();

    this.setState({
      datalist: options.map(item => item.nombre)
    });
  }

  getDataitem = (item, index) => {
    return (
      <option key={index} value={item} />
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const key = event.target.key.value;
    const value = event.target.value.value;
    this.state.handleSearch(key, value);
  }

  handleSelectChange = async (event) => {
    const parameter = event.target.value === 'orden' ? 'ordenes' : event.target.value + 's';

    const response = await fetch(`http://api.bioandes.cpotdevin.com/api/${parameter}`);
    const options = await response.json();

    this.setState({
      datalist: options.map(item => item.nombre)
    });
  }

  render() {
    const datalist = this.state.datalist.map(this.getDataitem);

    return (
      <form className='searchbar' onSubmit={this.handleSubmit}>
        <select name='key' onChange={this.handleSelectChange}>
          <option value='dominio'>Dominio</option>
          <option value='reino'>Reino</option>
          <option value='filo'>Filo</option>
          <option value='clase'>Clase</option>
          <option value='orden'>Orden</option>
          <option value='familia'>Familia</option>
          <option value='genero'>Género</option>
          <option value='especie'>Especie</option>
        </select>

        <div className='searchbar-separator' />

        <input type='search' name='value' list='search-options' />

        <datalist id='search-options'>
          {datalist}
        </datalist>

        <input type='submit' value='Buscar' />
      </form>
    );
  }
}

export default SearchBar;