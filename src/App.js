import React from 'react';
import Navbar from './components/navigation/Navbar';
import Routes from './components/navigation/Routes';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <div className='header'>
          <Navbar />
        </div>
        <main className='content'>
          <Routes />
        </main>
        <footer className='footer'>
          <p>Copyright © 2019 BioAndes</p>
        </footer>
      </div>
    );
  }
}