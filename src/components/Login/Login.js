import React, { useState, useEffect } from "react";
import "./Login.css";
import logoHeader from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login({ onLogin, message, isDisabledForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  function handleChangeEmail(e) {
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        e.target.value
      );

    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    if (e.target.value.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  }

  useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <section className="login">
      <Link to="/">
        <img className="login__logo" alt="логотип" src={logoHeader} />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <span className="login__signature">E-mail</span>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="login__item"
          required=""
          onChange={handleChangeEmail}
          value={email}
          disabled={isDisabledForm}
        ></input>
        <span className="email-error login__input-error">{emailError}</span>
        <span className="login__signature">Пароль</span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          className="login__item"
          required=""
          onChange={handleChangePassword}
          value={password}
          disabled={isDisabledForm}
        ></input>
        <span className="password-error login__input-error">{passwordError}</span>
        <span className="login-error login__input-error">{message}</span>
        <button
          type="submit"
          aria-label="Войти"
          className={`login__button ${
            !formValid ? "login__button_disabled" : ""
          }`}
          disabled={!formValid}
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

export default Login;
