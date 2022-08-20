import React from "react";
import "./Login.css";
import logoHeader from "../../images/logo.svg";
import { Link } from "react-router-dom";

function login() {
  return (
    <section className="login">
      <Link to="/">
        <img className="login__logo" alt="логотип" src={logoHeader} />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <span className="login__signature">E-mail</span>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="login__item"
          required=""
        ></input>
        <span className="email-error login__input-error"></span>
        <span className="login__signature">Пароль</span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          className="login__item"
          required=""
        ></input>
        <span className="password-error login__input-error"></span>
        <button
          type="submit"
          aria-label="Зарегистрироваться"
          className="login__button"
        >
          Войти
        </button>
      </form>
      <div className="login__signup">
        <p className="login__check-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__login-link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default login;
