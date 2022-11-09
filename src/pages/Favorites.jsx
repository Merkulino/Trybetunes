import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
        { loadingComponent && <Loading />}
      </div>
    );
  }
}
