import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <span>&copy; 2024</span>
      <a
        className="footer__link"
        href="https://github.com/YourunB"
        target="_blank"
        rel="noreferrer"
        data-testid={'footer'}
      >
        Yury Butskevich
      </a>
    </footer>
  );
};

export default Footer;
