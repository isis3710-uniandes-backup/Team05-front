import React from "react";
import "./BioAndes.css";
import "../content/SearchBar";
import SearchBar from "../content/SearchBar";
import SearchResults from "../content/SearchResults";
import { FormattedMessage } from "react-intl";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      key: "",
      value: "",
      searchResults: null
    };
  }

  componentDidMount = async () => {
    const response = await fetch(
      "https://boiling-brushlands-27343.herokuapp.com/api/especimenes"
    );
    const especimenes = await response.json();

    this.setState({ searchResults: especimenes });
  };

  handleSearch = async (key, value) => {
    this.setState({
      key: key,
      value: value,
      searchResults: null
    });

    const query = value !== "" ? `?${key}=${value}` : "";
    const response = await fetch(
      "https://boiling-brushlands-27343.herokuapp.com/api/especimenes" + query
    );
    const especimenes = await response.json();

    this.setState({ searchResults: especimenes });
  };

  render() {
    return (
      <div className="bioandes-view">
        <div className="bioandes-search">
          <h1>
            <FormattedMessage
              id="bioandes.hola"
              defaultMessage="Bienvenido a bioAndes"
            />
          </h1>
          <div className="bioandes-searchbar">
            <SearchBar handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="bioandes-search-content">
          <div className="bioandes-search-results">
            <SearchResults
              queryKey={this.state.key}
              value={this.state.value}
              results={this.state.searchResults}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
