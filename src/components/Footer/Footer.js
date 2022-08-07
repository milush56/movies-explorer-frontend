import React from "react";
import "./Footer.css";
const newDate = new Date()
const year = newDate.getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <ul className="footer__container">
        <li className="footer__copyright">© {year}</li>
        <li className="footer__link-container">
          <p className="footer__link-text">Яндекс.Практикум</p>
          <p className="footer__link-text">Github</p>
          <p className="footer__link-text">Facebook</p>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
