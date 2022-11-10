import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import coverImg from '../imgs/liked-songs-300.png';

export default class Favorites extends Component {
  state = {
    favoriteTracks: [],
    loadingComponent: false,
  };

  componentDidMount() {
    getFavoriteSongs().then((tracksID) => {
      this.setState({ favoriteTracks: tracksID });
    });
  }

  onHadleCheck = ({ target }) => {
    const { checked, id } = target;
    if (!checked) {
      const { favoriteTracks } = this.state;
      const trackSelected = favoriteTracks.find((track) => track.trackId === Number(id));
      this.setState({ loadingComponent: true }, () => {
        removeSong(trackSelected).then(() => {
          this.setState(() => {
            const newFavList = favoriteTracks
              .filter((track) => track.trackId !== Number(id));
            this.setState({ favoriteTracks: newFavList, loadingComponent: false });
          });
        });
      });
    }
  };

  render() {
    const { favoriteTracks, loadingComponent } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="headerMusics">
          <div className="coverAlbum">
            <img src={ coverImg } alt="cover album" />
          </div>
          <div className="divInfoAlbum">
            <div className="divAlbumTitle">
              <h2 className="collectionType">Playlist</h2>
              <h1 className="albumTitle"> Músicas Curtidas </h1>
            </div>
            <div className="divMoreInfoAlbum">
              <p className="artistAlbum">
                Melqui Brito
              </p>
              <p>Musica: 999</p>
            </div>
          </div>
        </div>
        <div className="tracksContent">
          {
            favoriteTracks.filter((music) => music.trackName)
              .map((music) => {
                const isCheck = favoriteTracks
                  .some((favSongs) => favSongs.trackId === music.trackId);
                return (<MusicCard
                  musicInfo={ music }
                  key={ music.trackId }
                  isChecked={ isCheck }
                  onHadleCheck={ this.onHadleCheck }
                />
                );
              })
          }
        </div>
        { loadingComponent && <Loading />}
      </div>
    );
  }
}
