import { Component } from 'react';
import './loading.css';
import loadingImg from '../assets/images/loading.gif';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img className="loading__img" src={loadingImg} alt="Loading" />
      </div>
    );
  }
}

export default Loading;
