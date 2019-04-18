import React from 'react';
import './LoginAndSignup.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginError: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email === '' || password === '') {
      this.setState({ loginError: 'El correo o la clave son incorrectos' });
    } else {
      this.setState({ loginError: '' });
    }
    console.log(email + ' ' + password);
  }

  render() {
    return (
      <div className='log-in-and-sign-up'>
        <div className='form-card'>
          <h1>Iniciar sesión</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Correo:</label>
            <input type='text' name='email' />
            <p></p>

            <label>Clave:</label>
            <input type='password' name='password' />
            <p></p>

            <p>{this.state.loginError}</p>

            <input type='submit' value='Iniciar' />
          </form>
        </div>
      </div>
    )
  }
}

export default Login;