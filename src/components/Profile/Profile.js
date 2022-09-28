import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile({ handleSignOut, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, email);
    console.log(name, email);
    changeInputDisabled();
  }

  function handleNameChange(e) {
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени более 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени менее 30 символо");
    } else if (!validName) {
      setNameError("Имя должно быть указано латиницей");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );

    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function changeInputDisabled() {
    setInputDisabled(!inputDisabled);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name, email, currentUser.name, currentUser.email]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__container">
          <span className="profile__signature">Имя</span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
            className="profile__item"
            required=""
            value={name || ""}
            onChange={handleNameChange}
            disabled={!inputDisabled}
          ></input>
          <span className="name-error profile__input-error">{nameError}</span>
        </div>
        <div className="profile__container">
          <span className="profile__signature">E-mail</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="profile__item"
            required=""
            value={email || ""}
            onChange={handleEmailChange}
            disabled={!inputDisabled}
          ></input>
          <span className="email-error profile__input-error">{emailError}</span>
        </div>
      </form>
      <button
        className="profile__edit"
        type="submit"
        disabled={!formValid}
        onClick={handleSubmit}
      >
        Редактировать
      </button>
      <Link to="/signin" className="profile__exit" onClick={handleSignOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
