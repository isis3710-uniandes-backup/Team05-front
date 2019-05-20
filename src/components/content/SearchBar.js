import React from "react";
import "./SearchBar.css";
import { FormattedMessage } from "react-intl";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSearch: props.handleSearch,
      datalist: []
    };
  }

  componentDidMount = async () => {
    const response = await fetch(
      "https://boiling-brushlands-27343.herokuapp.com/api/dominios"
    );
    const options = await response.json();

    this.setState({
      datalist: options.map(item => item.nombre)
    });
  };

  getDataitem = (item, index) => {
    return <option key={index} value={item} />;
  };

  handleSubmit = event => {
    event.preventDefault();

    const key = event.target.key.value;
    const value = event.target.value.value;
    this.state.handleSearch(key, value);
  };

  handleSelectChange = async event => {
    const parameter =
      event.target.value === "orden" ? "ordenes" : event.target.value + "s";

    const response = await fetch(
      `https://boiling-brushlands-27343.herokuapp.com/api/${parameter}`
    );
    const options = await response.json();

    this.setState({
      datalist: options.map(item => item.nombre)
    });
  };

  render() {
    const datalist = this.state.datalist.map(this.getDataitem);

    return (
      <form className="searchbar" onSubmit={this.handleSubmit}>
        <label htmlFor="select-search"></label>
        <select id="select-search" name="key" title="Select parameter" onChange={this.handleSelectChange}>
          <FormattedMessage id="search.dominio" defaultMessage="Dominio">
            {message => <option value="dominio">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.reino" defaultMessage="Reino">
            {message => <option value="reino">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.filo" defaultMessage="Filo">
            {message => <option value="filo">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.clase" defaultMessage="Clase">
            {message => <option value="clase">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.orden" defaultMessage="Orden">
            {message => <option value="orden">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.familia" defaultMessage="Familia">
            {message => <option value="familia">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.genero" defaultMessage="Género">
            {message => <option value="genero">{message}</option>}
          </FormattedMessage>
          <FormattedMessage id="search.especie" defaultMessage="Especie">
            {message => <option value="especie">{message}</option>}
          </FormattedMessage>
        </select>

        <div className="searchbar-separator" />

        <label htmlFor="search-input"></label>
        <input id="search-input" type="search" name="value" list="search-options" autoComplete="off" />

        <datalist id="search-options">{datalist}</datalist>
        <FormattedMessage id="search.btn" defaultMessage="Buscar">
          {val => <input type="submit" value={val} />}
        </FormattedMessage>
      </form>
    );
  }
}

export default SearchBar;
