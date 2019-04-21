import React from 'react';
import { Redirect } from 'react-router-dom';
import base from '../../base';
import Loading from '../content/Loading';
import InputFeedback from '../content/InputFeedback';
import './LoginAndSignup.css';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordIsHidden: true,
      name: '',
      nameOk: false,
      nameFeedback: '',
      lastName: '',
      lastNameOk: false,
      lastNameFeedback: '',
      email: '',
      emailOk: false,
      emailFeedback: '',
      password: '',
      passwordOk: false,
      passwordFeedback: '',
      addingUser: false,
      redirect: false
    }
  }

  checkName = () => {
    const name = document.getElementById('signup-name').value;
    let nameOk = false;
    let nameFeedback = '';
    if (name === '') {
      nameFeedback = 'Por favor introduzca su nombre.';
    } else {
      nameOk = true;
      nameFeedback = 'OK';
    }

    this.setState({
      name: name,
      nameOk: nameOk,
      nameFeedback: nameFeedback
    });

    return nameOk;
  }

  checkLastName = () => {
    const lastName = document.getElementById('signup-last-name').value;
    let lastNameOk = false;
    let lastNameFeedback = '';
    if (lastName === '') {
      lastNameFeedback = 'Por favor introduzca su appellido.';
    } else {
      lastNameOk = true;
      lastNameFeedback = 'OK';
    }

    this.setState({
      lastName: lastName,
      lastNameOk: lastNameOk,
      lastNameFeedback: lastNameFeedback
    });

    return lastNameOk;
  }

  checkEmail = () => {
    const email = document.getElementById('signup-email').value;
    let emailOk = false;
    let emailFeedback = '';
    if (email === '') {
      emailFeedback = 'Por favor introduzca su correo Uniandes.';
    } else if (!email.endsWith('@uniandes.edu.co')) {
      emailFeedback = 'Debe utilizar un correo Uniandes.';
    } else if (email.length < '@uniandes.edu.co'.length + 1) {
      emailFeedback = 'Debe utilizar un correo Uniandes válido.';
    } else {
      emailOk = true;
      emailFeedback = 'OK';
    }

    this.setState({
      email: email,
      emailOk: emailOk,
      emailFeedback: emailFeedback
    });

    return emailOk;
  }

  checkPassword = () => {
    const password = document.getElementById('signup-password').value;
    let passwordOk = false;
    let passwordFeedback = '';
    if (password === '') {
      passwordFeedback = 'Por favor introduzca una clave.';
    } else if (password.length < 6) {
      passwordFeedback = 'Su clave debe tener más de 6 caracteres.';
    } else {
      passwordOk = true;
      passwordFeedback = 'OK';
    }

    this.setState({
      password: password,
      passwordOk: passwordOk,
      passwordFeedback: passwordFeedback
    });

    return passwordOk;
  }

  handleHideUnhide = (event) => {
    event.preventDefault();

    this.setState({ passwordIsHidden: !this.state.passwordIsHidden });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const name = this.state.name.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const password = this.state.password;

    if (this.isNewUserDataOk()) {
      this.setState({ addingUser: true });
      try {
        const { user } = await base.auth().createUserWithEmailAndPassword(email, password);
        await user.updateProfile({ displayName: `${name} ${lastName}` });
        await user.sendEmailVerification();
        this.setState({ redirect: true });
      } catch (error) {
        let emailOk = false;
        let emailFeedback = '';
        if (error.code === 'auth/email-already-in-use') {
          emailFeedback = 'Este correo ya se encuentra registrado.';
        }
        this.setState({
          emailOk: emailOk,
          emailFeedback: emailFeedback,
          addingUser: false
        });
      }
    }
  }

  isNewUserDataOk = () => {
    const nameIsOk = this.checkName();
    const lastNameIsOk = this.checkLastName();
    const emailIsOk = this.checkEmail();
    const passwordIsOk = this.checkPassword();
    return nameIsOk && lastNameIsOk && emailIsOk && passwordIsOk;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/signup-confirmation' />
    } else if (this.state.addingUser) {
      return (
        <div className='login-and-signup'>
          <div className='form-card'>
            <h1>Registrando</h1>
            <Loading />
          </div>
        </div>
      );
    }

    const password = this.state.passwordIsHidden ? 'password' : 'test';
    const hideButtonText = this.state.passwordIsHidden ? 'Mostrar' : 'Esconder';

    return (
      <div className='login-and-signup'>
        <div className='form-card'>
          <h1>Regístrate</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Nombre:</label>
            <input id='signup-name' type='text' name='name' placeholder='John/Jane' value={this.state.name}
              onChange={this.checkName} />
            <InputFeedback isOk={this.state.nameOk} feedback={this.state.nameFeedback} />

            <label>Apellido:</label>
            <input id='signup-last-name' type='text' name='last-name' placeholder='Doe' value={this.state.lastName}
              onChange={this.checkLastName} />
            <InputFeedback isOk={this.state.lastNameOk} feedback={this.state.lastNameFeedback} />

            <label>Correo Uniandes:</label>
            <input id='signup-email' type='text' name='email' placeholder='jdoe@uniandes.edu.co' value={this.state.email}
              onChange={this.checkEmail} />
            <InputFeedback isOk={this.state.emailOk} feedback={this.state.emailFeedback} />

            <div className='signup-password'>
              <label>Clave:</label>
              <input className='hide-unhide' type='button' onClick={this.handleHideUnhide} value={hideButtonText} />
            </div>
            <input id='signup-password' type={password} name='password' value={this.state.password}
              onChange={this.checkPassword} />
            <InputFeedback isOk={this.state.passwordOk} feedback={this.state.passwordFeedback} />

            <input type='submit' value='Registrarme' />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;