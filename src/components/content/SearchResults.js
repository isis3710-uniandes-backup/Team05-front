import React from "react";
import EspecimenCard from "./EspecimenCard";
import Loading from "./Loading";
import { FormattedMessage } from "react-intl";

class SearchResults extends React.Component {
  getEspecimenCard = especimen => {
    return (
      <EspecimenCard
        key={especimen.id}
        redirect={this.redirect}
        url="/especimen"
        especimen={especimen}
      />
    );
  };

  render() {
    let title = "";
    if (this.props.value !== "") {
      const queryKey =
        this.props.queryKey.charAt(0).toUpperCase() +
        this.props.queryKey.slice(1);
      title = (
        <h2>
          <FormattedMessage
            id="resultados.cond"
            defaultMessage="Resultados con "
          />
          <ins>
            {queryKey} = {this.props.value}
          </ins>
        </h2>
      );
    } else {
      title = (
        <h2>
          <FormattedMessage id="resultados.gen" defaultMessage="Resultados:" />
        </h2>
      );
    }

    let results = <Loading />;
    if (this.props.results) {
      if (0 < this.props.results.length) {
        results = (
          <div className="card-view">
            {this.props.results.map(this.getEspecimenCard)}
          </div>
        );
      } else {
        results = (
          <h3 className="error">
            <FormattedMessage
              id="resultados.err"
              defaultMessage="No se encontraron especímenes."
            />
          </h3>
        );
      }
    }

    return (
      <div>
        {title}
        {results}
      </div>
    );
  }
}

export default SearchResults;
