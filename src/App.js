import React from 'react';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    );
  }
}