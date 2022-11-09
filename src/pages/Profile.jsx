import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
      <div>
        <img
          data-testid="profile-image"
          src={ image }
          alt={ name }
        />
        <p>{name}</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
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
