import React from 'react';
import { Redirect } from 'react-router-dom';
import './LoginAndSignup.css';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordIsHidden: true,
      nameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      redirect: false
    }
  }

  handleHideUnhide = (event) => {
    event.preventDefault();

    this.setState({ passwordIsHidden: !this.state.passwordIsHidden });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const name = event.target.name.value.trim();
    const lastName = event.target['last-name'].value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    if (this.checkNewUserData(name, lastName, email, password)) {
      console.log(name + " " + lastName + " " + email + " " + password);
      this.setState({ redirect: true });
    }
  }

  checkNewUserData = (name, lastName, email, password) => {
    let nameError = '';
    let lastNameError = '';
    let emailError = '';
    let passwordError = '';

    if (name === '') {
      nameError = 'Por favor introduzca su nombre.';
    }

    if (lastName === '') {
      lastNameError = 'Por favor introduzca su appellido.';
    }

    if (email === '') {
      emailError = 'Por favor introduzca su correo Uniandes.';
    } else if (!email.endsWith('@uniandes.edu.co')) {
      emailError = 'Debe utilizar un correo Uniandes.';
    } else if (email.length < '@uniandes.edu.co'.length + 1) {
      emailError = 'Debe utilizar un correo Uniandes válido.';
    }

    if (password === '') {
      passwordError = 'Por favor introduzca una clave.';
    } else if (password.length < 6) {
      passwordError = 'Su clave debe tener más de 6 caracteres.';
    }

    this.setState({
      nameError: nameError,
      lastNameError: lastNameError,
      emailError: emailError,
      passwordError: passwordError
    });

    if (nameError === '' && lastNameError === '' && emailError === '' && passwordError === '') {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/signup-confirmation' />
    }

    const password = this.state.passwordIsHidden ? 'password' : 'test';
    const hideButtonText = this.state.passwordIsHidden ? 'Mostrar' : 'Esconder';
    
    return (
      <div className='login-and-signup'>
        <div className='form-card'>
          <h1>Regístrate</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Nombre:</label>
            <input type='text' name='name' placeholder='John/Jane' />
            <p>{this.state.nameError}</p>

            <label>Apellido:</label>
            <input type='text' name='last-name' placeholder='Doe' />
            <p>{this.state.lastNameError}</p>

            <label>Correo Uniandes:</label>
            <input type='text' name='email' placeholder='jdoe@uniandes.edu.co' />
            <p>{this.state.emailError}</p>

            <div className='signup-password'>
              <label>Clave:</label>
              <input className='hide-unhide' type='button' onClick={this.handleHideUnhide} value={hideButtonText} />
            </div>
            <input type={password} name='password' />
            <p>{this.state.passwordError}</p>
            
            <input type='submit' value='Registrarme' />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;