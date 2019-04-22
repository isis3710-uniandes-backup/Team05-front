import React from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import moment from 'moment';
import base from '../../base';
import EspecimenTextInput from '../content/EspecimenTextInput';
import InputFeedback from '../content/InputFeedback';
import Loading from '../content/Loading';
import './RecordNew.css';

class RecordNew extends React.Component {
  constructor() {
    super();
    this.state = {
      userIsVerified: false,
      dominio: '',
      dominioReady: false,
      reino: '',
      reinoReady: false,
      filo: '',
      filoReady: false,
      clase: '',
      claseReady: false,
      orden: '',
      ordenReady: false,
      familia: '',
      familiaReady: false,
      genero: '',
      generoReady: false,
      especie: '',
      especieReady: false,
      image: '',
      feedback: '',
      addingSpecimen: false,
      redirect: false,
      redirectUrl: ''
    };
  }

  componentDidMount() {
    base.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          this.setState({
            userIsVerified: true,
            feedback: ''
          });
        } else {
          this.setState({
            userIsVerified: false,
            feedback: <FormattedMessage id="especimen.validate.email" defaultMessage="Para poder añadir un especimen debes validar tu correo Uniandes." />
          });
        }
      }
    });
  }

  handleParameterChange = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  handleImageFileChange = (event) => {
    this.setState({
      image: event.target.value
    });
  }

  setInputStatus = (input, status) => {
    this.setState({
      [input]: status
    }, () => {
      if (this.statefeedback !== '' && this.isDataOk()) {
        this.setState({ feedback: '' });
      }
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.isDataOk()) {
      this.setState({ addingSpecimen: true });

      const imageFile = event.target.image.files[0];
      let downloadUrl = '';
      if (imageFile) {
        const fileExtension = imageFile.name.split('.').pop();
        const imageRef = base.storage().ref().child(`especimenes/${this.state.especie}_${moment().unix()}.${fileExtension}`);
        await imageRef.put(imageFile);
        downloadUrl = await imageRef.getDownloadURL();
      } else {
        downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/bioandes-2019.appspot.com/o/not_available.jpg?alt=media&token=6ecaf067-7490-4943-ba24-68c15b6f45ae';
      }

      const response = await fetch('http://api.bioandes.cpotdevin.com/api/especimenes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dominio: this.state.dominio,
          reino: this.state.reino,
          filo: this.state.filo,
          clase: this.state.clase,
          orden: this.state.orden,
          familia: this.state.familia,
          genero: this.state.genero,
          especie: this.state.especie,
          imagen: downloadUrl
        })
      });

      const responseBody = await response.json();

      this.setState({
        redirect: true,
        redirectUrl: `/especimen/${responseBody.id}`
      });
    } else {
      this.setState({
        feedback: <FormattedMessage id="especimen.please.fill.all" defaultMessage="Por favor llene correctamente todos los parámetros." />
      });
    }
  }

  isDataOk = () => {
    return this.state.userIsVerified && this.state.dominioReady && this.state.reinoReady && this.state.filoReady && this.state.claseReady
      && this.state.ordenReady && this.state.familiaReady && this.state.generoReady && this.state.especieReady;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectUrl} />
    }

    let addButton = null;
    if (this.state.addingSpecimen) {
      addButton = <Loading />;
    } else {
      addButton = (
        <FormattedMessage id="especimen.add" defaultMessage="Añadir">
          {val => <input type="submit" value={val} />}
        </FormattedMessage>
      );
    }
    return (
      <div className='record-new-content'>
        <div className='record-new-wrapper'>
          <h1><FormattedMessage id="especimen.add.title" defaultMessage="Añadir nuevo espécimen" /></h1>
          <form onSubmit={this.handleSubmit}>
            <InputFeedback isOk={false} feedback={this.state.feedback} />
            <InputFeedback isOk={false} feedback='' />

            <EspecimenTextInput name='dominio'
              label={<FormattedMessage id="especimen.dominio" defaultMessage="Dominio: " />} collection='dominios'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='reino'
              label={<FormattedMessage id="especimen.reino" defaultMessage="Reino: " />} collection='reinos'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='filo'
              label={<FormattedMessage id="especimen.filo" defaultMessage="Filo: " />} collection='filos'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='clase'
              label={<FormattedMessage id="especimen.clase" defaultMessage="Clase: " />} collection='clases'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='orden'
              label={<FormattedMessage id="especimen.orden" defaultMessage="Orden: " />} collection='ordenes'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='familia'
              label={<FormattedMessage id="especimen.familia" defaultMessage="Familia: " />} collection='familias'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='genero'
              label={<FormattedMessage id="especimen.genero" defaultMessage="Género: " />} collection='generos'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <EspecimenTextInput name='especie'
              label={<FormattedMessage id="especimen.especie" defaultMessage="Especie: " />} collection='especies'
              handleParameterChange={this.handleParameterChange} setInputStatus={this.setInputStatus} />

            <div>
              <label><FormattedMessage id="especimen.imagen" defaultMessage="Imagen: " /></label>
              <input type='file' name='image' accept='.jpg,.jpeg,.png' value={this.state.image} onChange={this.handleImageFileChange} />
            </div>

            {addButton}
          </form>
        </div>
      </div>
    );
  }
}

export default RecordNew;