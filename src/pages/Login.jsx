import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login.css';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    name: '',
    isInvalid: true,
    loading: false,
    loggedIn: false,
  };

  validateLogin = () => {
    const { name } = this.state;
    const MAXNUM = 3;
    const valid = name.length < MAXNUM;
    this.setState({ isInvalid: valid });
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateLogin);
  };

  authUser = async () => {
    const { name } = this.state;
    const nameObj = { name };
    this.setState({ loading: true }, async () => {
      await createUser(nameObj);
      this.setState({ loading: false, loggedIn: true });
    });
  };

  render() {
    const { name, isInvalid, loading, loggedIn } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        {loading ? <Loading /> : <div /> }
        <form className="loginForm">
          <label htmlFor="name-input">
            <p> Login </p>
            <input
              value={ name }
              onChange={ this.onHandleChange }
              data-testid="login-name-input"
              type="text"
              id="name-input"
              placeholder="username"
              name="name"
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isInvalid }
            onClick={ this.authUser }
          >
            Entrar
          </button>
        </form>
        {
          loggedIn && <Redirect to="/search" />
        }
      </div>
    );
  }
}
