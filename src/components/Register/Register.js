import React, { useState, useEffect } from "react";
import "./Register.css";
import logoHeader from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register({ onRegister, message, isDisabledForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  function handleChangeName(e) {
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени более 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени менее 30 символов");
    } else if (!validName) {
      setNameError("Имя должно быть указано латиницей");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

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
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return (
    <section className="register">
      <Link to="/">
        <img className="register__logo" alt="логотип" src={logoHeader} />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <span className="register__signature">Имя</span>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          className="register__item"
          required=""
          min={2}
          max={30}
          onChange={handleChangeName}
          value={name}
          disabled={isDisabledForm}
        ></input>
        <span className="name-error register__input-error">{nameError}</span>
        <span className="register__signature">E-mail</span>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="register__item"
          required=""
          onChange={handleChangeEmail}
          value={email}
          disabled={isDisabledForm}
        ></input>
        <span className="email-error register__input-error">{emailError}</span>
        <span className="register__signature">Пароль</span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          className="register__item"
          required=""
          onChange={handleChangePassword}
          value={password}
          disabled={isDisabledForm}
        ></input>
        <span className="password-error register__input-error">
          {passwordError}
        </span>
        <span className="register-error register__input-error">{message}</span>
        <button
          type="submit"
          aria-label="Зарегистрироваться"
          className={`register__button ${
            !formValid ? "register__button_disabled" : ""
          }`}
          disabled={!formValid}
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
