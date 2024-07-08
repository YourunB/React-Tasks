import { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span>&copy; 2024</span>
        <a className="footer__link" href="https://github.com/YourunB" target="_blank" rel="noreferrer">
          Yury Butskevich
        </a>
      </footer>
    );
  }
}

export default Footer;
