import React from 'react';
import { Redirect } from 'react-router-dom';
import './Card.css';

class Especimen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleRedirect = () => {
    this.setState({ redirect: true });
  }

  render() {
    const url = `/especimen/${this.props.especimen.id}`;
    if (this.state.redirect) {
      return <Redirect push to={url} />;
    }

    const imageStyle = {
      backgroundImage: `url(${this.props.especimen.imagen})`
    };

    return (
      <div className='card' onMouseDown={this.handleRedirect}>
        <div style={imageStyle} />
        <h3><a href={url}>{this.props.especimen.especie}</a></h3>
      </div>
    );
  }
}

export default Especimen;