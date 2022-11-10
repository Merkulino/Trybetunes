import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/album.css';

const INICIAL_STATE = {
  albumMusics: [],
  hasMusics: false,
  checkFavTrack: false,
  currentFavTrack: '',
  favoriteTracks: [],
};

export default class Album extends Component {
  state = INICIAL_STATE;

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((mus) => this.setState({ albumMusics: mus, hasMusics: true }, () => {
        getFavoriteSongs().then((tracksID) => {
          this.setState({ favoriteTracks: tracksID });
        });
      }));
  }

  saveNewSong = () => {
    const { checkFavTrack } = this.state;
    if (checkFavTrack) {
      const stateSaved = JSON.parse(JSON.stringify(this.state));
      const { albumMusics, favoriteTracks,
        currentFavTrack } = stateSaved;
      const currentTrack = albumMusics
        .map((track) => (
          {
            trackId: track.trackId,
            trackName: track.trackName,
            previewUrl: track.previewUrl,
            kind: track.kind,
          }
        )).find((music) => music.trackId === Number(currentFavTrack));
      this.setState(INICIAL_STATE, () => {
        addSong(currentTrack).then(() => this.setState(() => ({
          albumMusics,
          hasMusics: true,
          favoriteTracks: [...favoriteTracks, currentTrack],
        })));
      });
    }
  };

  onHadleCheck = ({ target }) => {
    const { checked, name, id } = target;
    if (checked) {
      this.setState({
        [name]: checked,
        currentFavTrack: id,
      }, this.saveNewSong);
    }
    if (!checked) {
      const { favoriteTracks } = this.state;
      const trackSelected = favoriteTracks.find((track) => track.trackId === Number(id));
      this.setState({ hasMusics: false }, () => {
        removeSong(trackSelected).then(() => {
          this.setState(() => {
            const newFavList = favoriteTracks
              .filter((track) => track.trackId !== Number(id));
            this.setState({ favoriteTracks: newFavList, hasMusics: true });
          });
        });
      });
    }
  };

  albumComponent = () => {
    const { albumMusics, favoriteTracks } = this.state;
    const imgUrl = (albumMusics[0].artworkUrl100)
      .replace('100x100bb.jpg', '300x300bb.jpg');

    const FOUR = 4;
    const year = (albumMusics[0].releaseDate).substring(0, FOUR);
    return (
      <div>
        <div className="headerMusics">
          <div className="coverAlbum">
            <img src={ imgUrl } alt="cover album" />
          </div>
          <div className="divInfoAlbum">
            <div className="divAlbumTitle">
              <h2 className="collectionType">{ albumMusics[0].collectionType }</h2>
              <h1
                className="albumTitle"
                data-testid="album-name"
              >
                { albumMusics[0].collectionName }
              </h1>
            </div>
            <div className="divMoreInfoAlbum">
              <p
                className="artistAlbum"
                data-testid="artist-name"
              >
                { albumMusics[0].artistName }
              </p>
              <p className="realeseYearAlbum">{ year }</p>
              <p className="musicLengthAlbum">{`Musicas: ${albumMusics[0].trackCount}`}</p>
            </div>
          </div>
        </div>
        <div className="tracksContent">
          {
            albumMusics.filter((music) => music.trackName)
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
      </div>
    );
  };

  render() {
    const { hasMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          hasMusics ? this.albumComponent()
            : <Loading />
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
