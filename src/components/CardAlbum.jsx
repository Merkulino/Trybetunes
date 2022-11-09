import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/cardAlbum.css';

export default class CardAlbum extends Component {
  render() {
    const { albumObj:
      { artworkUrl100, collectionName, releaseDate, trackCount } } = this.props;
    const FOUR = 4;
    const replaceUrl = (artworkUrl100).replace('100x100bb.jpg', '200x200bb.jpg');

    const year = releaseDate.substring(0, FOUR);
    return (
      <div className="cardAlbum">
        <img className="coverImgCard" src={ replaceUrl } alt={ collectionName } />
        <p className="albumCardTitle">{ collectionName }</p>
        <div className="moreInfoCard">
          <p className="yearInfoCard">{year}</p>
          <p className="musicsInfoCard">{`Musicas: ${trackCount}`}</p>
        </div>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  albumObj: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};
