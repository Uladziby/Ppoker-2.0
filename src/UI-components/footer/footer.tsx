import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__git">
        <div className="footer__git-title">Developers GitHub:</div>
        <div className="footer__git-container">
          <a href="https://github.com/Uladziby" className="footer__git-link" target="_blank" rel="noreferrer">Uladziby, </a>
          <a href="https://github.com/Uladzimir86" className="footer__git-link" target="_blank" rel="noreferrer">Uladzimir86, </a>
          <a href="https://github.com/adikmain" className="footer__git-link" target="_blank" rel="noreferrer">adikmain</a>
        </div>
      </div>
      <a className="footer__logo-rss" href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <span className="footer__logo-rss-year">'21</span>
      </a>
    </footer>
  )
}
export default Footer;