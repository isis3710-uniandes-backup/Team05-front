import React from 'react';
import './BioAndes.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className='bioandes-view'>
        <div className='bioandes-content'>
          <h1>Bienvenido a bioAndes</h1>
          <h2>Aquí puede encontrar los especímenes que hemos encontrado en el departamento de biología de la Universidad de los Andes </h2>
          <img alt='Dos guacamayas posadas en una rama' src='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/front.png?alt=media&token=c41e283f-89d6-4d8a-b8d1-07819e2d791c' />
        </div>
      </div>
    )
  }
}