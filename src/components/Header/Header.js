import React from "react";
import logoHeader from "../../images/logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="логотип" src={logoHeader} />
      <ul className="header__container">
        <li className="header__reg-link">Регистрация</li>
        <li className="header__login-link">
          <button className="header__login-button">Войти</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
