import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
// import logo from '../imgs/spotify_logo_white.png';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="logo">
          {/* <img src={ logo } alt="SpotifyLogo" className="logoTitle" /> */}
          <Link to="/">
            <h1>Logo</h1>
          </Link>
        </div>
        <div className="pagesLink">
          <ul className="ulSidebar">
            <li>
              <Link to="/search">Pesquisar</Link>
            </li>
            <li>
              <Link to="/album/1558533900">Albuns</Link>
            </li>
            <li>
              <Link to="/favorites">Favoritos</Link>
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
