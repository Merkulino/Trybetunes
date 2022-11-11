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
        <div className="startElementsTrack">
          <p>{trackNumber}</p>
          <div className="trackInfo">
            <p>{trackName}</p>
            <p className="artistNameTrack">{artistName}</p>
          </div>
        </div>
        <div className="endElementsTrack">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            { isChecked ? <i class="fa-solid fa-heart"></i>
            : <i class="fa-regular fa-heart"></i>
            }
            <input
              hidden
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="checkFavTrack"
              checked={ isChecked }
              onChange={ onHadleCheck }
              id={ trackId }
            />
          </label>
        </div>
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
