import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CardAlbum from '../components/CardAlbum';
import '../styles/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    search: '',
    savedSearch: '',
    isInvalid: true,
    loading: false,
    hasAlbunsResearched: false,
    listAlbuns: [],
  };

  validateSearch = () => {
    const { search } = this.state;
    const MAXNUM = 2;
    const valid = search.length < MAXNUM;
    this.setState({ isInvalid: valid });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.searchBtnListener());
  };

  searchBtnListener = () => {
    const { search } = this.state;
    const currentSearch = search;

    this.setState({ search: '', loading: true }, async () => {
      const artists = await searchAlbumsAPI(currentSearch);
      this.setState({ loading: false });
      if (artists.length === 0) {
        this.setState({ hasAlbunsResearched: false });
      } else {
        this.setState({
          listAlbuns: artists,
          hasAlbunsResearched: true,
          savedSearch: currentSearch,
        });
      }
    });
  };

  renderCards = (albs) => albs
    .map((album) => (
      <Link
        to={ `/album/${album.collectionId}` }
        key={ album.collectionId }
        className="linkAlbumCard"
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        <CardAlbum albumObj={ album } key={ album.collectionId } />
      </Link>));

  render() {
    const { search, isInvalid, loading,
      listAlbuns, hasAlbunsResearched, savedSearch } = this.state;

    return (
      <>
        <Header
          search={ search }
          handleChange={ this.handleChange }
          enable
          isInvalid={ isInvalid }
          searchBtnListener={ this.searchBtnListener }
        />
        <div data-testid="page-search" className="page-search">
          <form>
            <label htmlFor="search-artist">
              <input
                type="text"
                data-testid="search-artist-input"
                id="search-artist"
                name="search"
                value={ search }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isInvalid }
                onClick={ this.searchBtnListener }
              >
                Pesquisar
              </button>
            </label>
          </form>
          <div className="cardsAlbumContainer">
            {loading ? <Loading /> : <div />}

            {
              hasAlbunsResearched
                ? <h1>{`Resultado de álbuns de: ${savedSearch}`}</h1>
                : <div />
            }
            <div className="cardsAlbumContainer">
              {
                hasAlbunsResearched
                  ? this.renderCards(listAlbuns)
                  : <h1>Nenhum álbum foi encontrado</h1>
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}
