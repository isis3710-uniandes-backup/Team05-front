import React from 'react';
import { Redirect } from 'react-router-dom';
import './LoginAndSignup.css';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordIsHidden: true,
      nameError: '',
      nameOk: false,
      lastNameError: '',
      lastNameOk: false,
      emailError: '',
      emailOk: false,
      passwordError: '',
      passwordOk: false,
      redirect: false
    }
  }

  handleNameChange = (event) => {
    const name = event.target.value;
    let nameError = '';
    let nameOk = '';
    if (name === '') {
      nameError = 'Por favor introduzca su nombre.';
    } else {
      nameOk = 'OK';
    }
    this.setState({ 
      nameError: nameError,
      nameOk: nameOk
    });
  }

  handleLastNameChange = (event) => {
    const lastName = event.target.value;
    let lastNameError = '';
    let lastNameOk = '';
    if (lastName === '') {
      lastNameError = 'Por favor introduzca su appellido.';
    } else {
      lastNameOk = 'OK';
    }
    this.setState({ 
      lastNameError: lastNameError,
      lastNameOk: lastNameOk
    });
  }

  handleEmailChange = (event) => {
    const email = event.target.value;
    let emailError = '';
    let emailOk = '';
    if (email === '') {
      emailError = 'Por favor introduzca su correo Uniandes.';
    } else if (!email.endsWith('@uniandes.edu.co')) {
      emailError = 'Debe utilizar un correo Uniandes.';
    } else if (email.length < '@uniandes.edu.co'.length + 1) {
      emailError = 'Debe utilizar un correo Uniandes válido.';
    } else {
      emailOk = 'OK';
    }
    this.setState({ 
      emailError: emailError,
      emailOk: emailOk
    });
  }

  handlePasswordChange = (event) => {
    const password = event.target.value;
    let passwordError = '';
    let passwordOk = '';
    if (password === '') {
      passwordError = 'Por favor introduzca una clave.';
    } else if (password.length < 6) {
      passwordError = 'Su clave debe tener más de 6 caracteres.';
    } else {
      passwordOk = 'OK';
    }
    this.setState({ 
      passwordError: passwordError,
      passwordOk: passwordOk
    });
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
    let dataIsOk = true;

    if (name === '') {
      dataIsOk = false;
    }

    if (lastName === '') {
      dataIsOk = false;
    }

    if (email === '') {
      dataIsOk = false;
    } else if (!email.endsWith('@uniandes.edu.co')) {
      dataIsOk = false;
    } else if (email.length < '@uniandes.edu.co'.length + 1) {
      dataIsOk = false;
    }

    if (password === '') {
      dataIsOk = false;
    } else if (password.length < 6) {
      dataIsOk = false;
    }

    return dataIsOk;
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
            <input type='text' name='name' placeholder='John/Jane' onChange={this.handleNameChange} />
            <p className='ok'>{this.state.nameOk}</p>
            <p className='error'>{this.state.nameError}</p>

            <label>Apellido:</label>
            <input type='text' name='last-name' placeholder='Doe' onChange={this.handleLastNameChange} />
            <p className='ok'>{this.state.lastNameOk}</p>
            <p className='error'>{this.state.lastNameError}</p>

            <label>Correo Uniandes:</label>
            <input type='text' name='email' placeholder='jdoe@uniandes.edu.co' onChange={this.handleEmailChange} />
            <p className='ok'>{this.state.emailOk}</p>
            <p className='error'>{this.state.emailError}</p>

            <div className='signup-password'>
              <label>Clave:</label>
              <input className='hide-unhide' type='button' onClick={this.handleHideUnhide} value={hideButtonText} />
            </div>
            <input type={password} name='password' onChange={this.handlePasswordChange} />
            <p className='ok'>{this.state.passwordOk}</p>
            <p className='error'>{this.state.passwordError}</p>
            
            <input type='submit' value='Registrarme' />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;