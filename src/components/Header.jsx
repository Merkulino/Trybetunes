import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import '../styles/header.css';

export default class Header extends Component {
  state = {
    username: '',
    inputDisable: true,
  };

  componentDidMount() {
    const { enable } = this.props;
    console.log(enable);
    if (enable) {
      this.setState({ inputDisable: false });
    }
  }

  render() {
    getUser().then(({ name }) => this.setState({ username: name }));
    const { username, inputDisable } = this.state;
    const { search, handleChange } = this.props;

    return (
      <div className="header" data-testid="header-component">

        <div className="startElement">
          <div className="backPage">
            <span>←</span>
          </div>
          <div className="searchContent" hidden={ inputDisable }>
            <label htmlFor="search" className="labelHeader">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="O que você quer ouvir?"
                value={ search }
                onChange={ handleChange }
              />
            </label>
          </div>
        </div>
        <Link to="/profile">
          <div className="profile">
            <img src="" alt="profilePic" />
            {
              username !== '' ? <p data-testid="header-user-name">{ username }</p>
                : <Loading />
            }
          </div>
        </Link>
      </div>
    );
  }
}
