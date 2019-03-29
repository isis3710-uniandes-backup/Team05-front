import React from 'react';
import ClaseCard from '../content/ClaseCard';
import '../content/CardView.css';

export default class Clases extends React.Component {
  redirect = (url) => {
    this.props.history.push(url);
  }

  render() {
    return (
      <div className='clases-content'>
        <h1>Clases</h1>
        <div className='card-view'>
          <ClaseCard redirect={this.redirect}
                      url='/clase'
                      clase='Anfibios'
                      imagen='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/Allobates%20algorei.jpeg?alt=media&token=fde56ff7-7c2b-4dc1-a7ae-2b556256afbf' />
          <ClaseCard redirect={this.redirect}
                      url='/clase'
                      clase='Aves'
                      imagen='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/Crypturellus%20berlepschi.jpeg?alt=media&token=7eac8375-1c3c-46e6-9f45-a5fc57977d08' />
          <ClaseCard redirect={this.redirect}
                      url='/clase'
                      clase='Mamíferos'
                      imagen='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/Saguinus%20fuscicollis.jpg?alt=media&token=1fa52fa1-4b32-44f8-ae3e-ef5f54ad2a76' />
          <ClaseCard redirect={this.redirect}
                      url='/clase'
                      clase='Reptiles'
                      imagen='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/Chelus%20fimbriata.jpeg?alt=media&token=cc2fee79-22ec-4e26-b2dc-3bbd1f85f092' />
          <ClaseCard redirect={this.redirect}
                      url='/clase'
                      clase='Peces'
                      imagen='https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/Abramites%20eques.jpg?alt=media&token=e20a79be-273d-4a98-a347-21b50343a115' />
        </div>
      </div>
    );
  }
}