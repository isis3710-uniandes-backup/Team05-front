import React from "react";
import { Redirect } from "react-router-dom";
import base from "../../base";
import Loading from "../content/Loading";
import InputFeedback from "../content/InputFeedback";
import "./LoginAndSignup.css";
import { FormattedMessage } from "react-intl";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginError: "",
      loggingIn: false,
      redirect: false
    };
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email === "" || password === "") {
      this.setState({
        loginError: (
          <FormattedMessage
            id="login.err"
            defaultMessage="El correo o la clave son incorrectos."
          />
        )
      });
    } else {
      this.setState({
        loggingIn: true,
        loginError: ""
      });
      try {
        await base.auth().signInWithEmailAndPassword(email, password);
        this.setState({ redirect: true });
      } catch (error) {
        this.setState({
          loggingIn: false,
          loginError: (
            <FormattedMessage
              id="login.err"
              defaultMessage="El correo o la clave son incorrectos."
            />
          )
        });
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.loggingIn) {
      return (
        <div className="login-and-signup">
          <div className="form-card">
            <h1>
              <FormattedMessage
                id="login.iniciando"
                defaultMessage="Iniciando sesión"
              />
            </h1>
            <Loading />
          </div>
        </div>
      );
    }

    return (
      <div className="login-and-signup">
        <div className="form-card">
          <h1>
            <FormattedMessage
              id="login.iniciar"
              defaultMessage="Iniciar sesión"
            />
          </h1>
          <form onSubmit={this.handleSubmit}>
            <InputFeedback isOk={false} feedback={this.state.loginError} />
            <label htmlFor="login-email-input">
              <FormattedMessage id="login.correo" defaultMessage="Correo" />:
            </label>
            <input
              id="login-email-input"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />

            <label htmlFor="login-password-input">
              <FormattedMessage id="login.pswd" defaultMessage="Clave" />:
            </label>
            <input
              id="login-password-input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <FormattedMessage id="login.btn" defaultMessage="Iniciar">
              {val => <input type="submit" value={val} />}
            </FormattedMessage>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
