import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/musicCard.css';

export default class MusicCard extends Component {
  render() {
    const { musicInfo:
      { trackNumber, previewUrl,
        artistName, trackName, trackId }, onHadleCheck, isChecked } = this.props;
    return (
      <div className="musicTrack">
        <p>{trackNumber}</p>
        <p>{trackName}</p>
        <p>{artistName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="checkFavTrack"
            checked={ isChecked }
            onChange={ onHadleCheck }
            id={ trackId }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicInfo: PropTypes.shape({
    trackNumber: PropTypes.number,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  // check: PropTypes.bool.isRequired,
  onHadleCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
