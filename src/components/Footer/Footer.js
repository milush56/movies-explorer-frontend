import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Footer.css";
const newDate = new Date();
const year = newDate.getFullYear();

function Footer() {
  return (
    <Switch>
      <Route exact path="/(movies|saved-movies|/|)">
        <footer className="footer">
          <h2 className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h2>
          <ul className="footer__container">
            <li className="footer__copyright">© {year}</li>
            <li className="footer__link-container">
              <a href="https://practicum.yandex.ru" className="footer__link-text">Яндекс.Практикум</a>
              <a href="https://github.com/" className="footer__link-text">Github</a>
              <a href="https://facebook.com/" className="footer__link-text">Facebook</a>
            </li>
          </ul>
        </footer>
      </Route>
    </Switch>
  );
}

export default Footer;
