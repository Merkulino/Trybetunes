import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import logo from '../imgs/spotify_logo_white.png';
import heartIcon from '../imgs/heart-64.svg';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="SpotifyLogo" className="logoTitle" />
          </Link>
        </div>
        <div className="pagesLink">
          <ul className="ulSidebar">
            <li>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Link to="/search">
                Buscar</Link>
            </li>
            <li>
            <i class="fa-solid fa-heart"></i>
              <Link to="/favorites">Favoritos</Link>
            </li>
            <li>
            <i class="fa-regular fa-circle-user"></i>
              <Link to="/profile">Perfil</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
