import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/profile.css'

export default class Profile extends Component {
  state = {
    loading: true,
    currentUser: {},
  };

  componentDidMount() {
    getUser().then((res) => {
      this.setState({ currentUser: res, loading: false });
    });
  }

  renderProfileData = () => {
    const { currentUser: { name, email, image, description } } = this.state;

    return (
      <div className="perfilContainer">
        <div className="headerTitle">
          <h1>Visão geral da conta</h1>
          <h3>Perfil</h3>
        </div>
        <div className="imgPerfil">
          <img
            data-testid="profile-image"
            src={ image }
            alt={ name }
          />
        </div>
        <div className="userInfo-content">
          <p>
          <span>Nome de usuário</span>
          { name }</p>
          <hr />
          <p>
          <span>Email</span>
          { email }</p>
          <hr />
          <p className="aboutUserInfo">
          <span>Sobre</span>
          { description }</p>
          <hr />
        </div>
        <div className="spotifyBtn perfilBtn">
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading />
          : this.renderProfileData()}
      </div>
    );
  }
}
