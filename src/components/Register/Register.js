import React from "react";
import "./Register.css";
import logoHeader from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <Link to="/">
        <img className="register__logo" alt="логотип" src={logoHeader} />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <span className="register__signature">Имя</span>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          className="register__item"
          required=""
        ></input>
        <span className="name-error register__input-error"></span>
        <span className="register__signature">E-mail</span>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="register__item"
          required=""
        ></input>
        <span className="email-error register__input-error"></span>
        <span className="register__signature">Пароль</span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          className="register__item"
          required=""
        ></input>
        <span className="password-error register__input-error"></span>
        <button
          type="submit"
          aria-label="Зарегистрироваться"
          className="register__button"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signup">
        <p className="register__check-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
