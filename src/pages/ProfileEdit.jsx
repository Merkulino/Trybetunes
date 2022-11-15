import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/profileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    image: '',
    description: '',
    isFormInvalid: true,
    userUpdated: false,
  };

  componentDidMount() {
    getUser().then(({ name, email, image, description }) => {
      this.setState({
        name,
        email,
        image,
        description,
        loading: false,
      });
    });
  }

  validadeForm = () => {
    const { name, email, image, description } = this.state;
    const regEmailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validInputs = name < 1 || image < 2 || description < 1;
    const validEmail = !(email.match(regEmailFormat));
    const isInvalid = validEmail || validInputs;
    this.setState({ isFormInvalid: isInvalid });
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validadeForm);
  };

  saveUserData = () => {
    const { name, email, image, description } = this.state;
    const newUser = { name, email, image, description };
    this.setState({ loading: true }, () => {
      updateUser(newUser)
        .then(() => this.setState({ userUpdated: true }));
    });
  };

  renderForm = () => {
    const { name, email, image, description, isFormInvalid } = this.state;

    return (
      <form className="editProfileForm">
        <label htmlFor="input-name">
          Nome de usuario
          <input
            className="inputLogin"
            data-testid="edit-input-name"
            type="text"
            id="input-name"
            name="name"
            value={ name }
            onChange={ this.onHandleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            className="inputLogin"
            data-testid="edit-input-email"
            type="text"
            id="input-email"
            name="email"
            value={ email }
            onChange={ this.onHandleChange }
          />
        </label>
        <label htmlFor="input-description">
          Sobre
          <input
            className="inputLogin"
            data-testid="edit-input-description"
            type="textarea"
            id="input-description"
            name="description"
            value={ description }
            onChange={ this.onHandleChange }
          />
        </label>
        <label htmlFor="input-image">
          Imagem
          <input
            className="inputLogin"
            data-testid="edit-input-image"
            type="text"
            id="input-image"
            name="image"
            value={ image }
            onChange={ this.onHandleChange }
            placeholder="URL"
          />
        </label>
        <button
          className="spotifyBtn"
          data-testid="edit-button-save"
          type="button"
          onClick={ this.saveUserData }
          disabled={ isFormInvalid }
        >
          Salvar perfil
        </button>
      </form>);
  };

  render() {
    const { loading, userUpdated } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : this.renderForm() }
        { userUpdated && <Redirect to="/profile" /> }
      </div>
    );
  }
}
