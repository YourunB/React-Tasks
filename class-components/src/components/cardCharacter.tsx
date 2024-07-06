import { Component } from 'react';
import './cardCharacter.css';
import { CardCharacterProps } from '../state/types';

class CardCharacter extends Component<CardCharacterProps> {
  render() {
    return (
      <a className="card-char" href={this.props.source} target="_blank" rel="noreferrer">
        <img
          className="card-char__img"
          src={this.props.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
        ></img>
        <h4 className="card-char__title">{this.props.name}</h4>
        <p className="card-char__description">
          <span>Films: </span>
          {this.props.films || 'none'}
        </p>
        <p className="card-char__description">
          <span>TV Shows: </span>
          {this.props.tvShows || 'none'}
        </p>
        <p className="card-char__description">
          <span>Games: </span>
          {this.props.games || 'none'}
        </p>
      </a>
    );
  }
}

export default CardCharacter;
