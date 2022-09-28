import React from "react";
import logoHeader from "../../images/logo.svg";
import "./Header.css";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

function Header({ loggedIn }) {
  return (
    <Switch>
      <Route exact path="/(movies|saved-movies|profile|/|)">
        <header className="header">
          <Link to="/">
            <img className="header__logo" alt="логотип" src={logoHeader} />
          </Link>
          <ul className="header__container">
            {loggedIn ? (
              <Route exact path="/(movies|saved-movies|profile|/|)">
                <li className="header__films">
                  <Link to="/movies" className="header__film">
                    Фильмы
                  </Link>
                  <Link to="/saved-movies" className="header__save-film">
                    Сохранённые фильмы
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="header__account">
                    Аккаунт
                  </Link>
                </li>
                <li className="header__burger">
                  <input id="header__toggle" type="checkbox" />
                  <label className="header__btn" htmlFor="header__toggle">
                    <span></span>
                  </label>
                  <ul className="header__box">
                    <li>
                      <Link className="header__item" to="/">
                        Главная
                      </Link>
                    </li>
                    <li>
                      <Link className="header__item" to="/movies">
                        Фильмы
                      </Link>
                    </li>
                    <li>
                      <Link className="header__item" to="/saved-movies">
                        Сохранённые фильмы
                      </Link>
                    </li>
                    <li>
                      <Link className="header__acc" to="/profile">
                        Аккаунт
                      </Link>
                    </li>
                  </ul>
                </li>
              </Route>
            ) : (
              <Route exact path="/">
                <li className="header__login-link">
                  <Link className="header__reg-link" to="/signup">
                    Регистрация
                  </Link>
                  <Link to="/signin">
                    <button className="header__login-button">Войти</button>
                  </Link>
                </li>
              </Route>
            )}
          </ul>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
