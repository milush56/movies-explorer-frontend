import React, { useState, useEffect, isDisabledForm} from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidator from "../../hooks/useFormValidator";

function Profile({ handleSignOut, onUpdateUser, profMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormValidator({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [formValid, setFormValid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
  }

  useEffect(() => {
    if (
      (values.name !== currentUser.name ||
        values.email !== currentUser.email) &&
      isValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [values, currentUser, isValid]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__container">
          <span className="profile__signature">Имя</span>
          <input
            type="text"
            id="name"
            minLength={2}
            maxLength={30}
            name="name"
            placeholder="Имя"
            className="profile__item"
            required=""
            pattern="^[a-zA-Zа-яёА-ЯЁ\-\s]+$"
            value={values.name || ""}
            onChange={handleChange}
            disabled={isDisabledForm}
          ></input>
          <span className="profile__input-error">{errors.name}</span>
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
            pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
            value={values.email || ""}
            onChange={handleChange}
            disabled={isDisabledForm}
          ></input>
          <span className="profile__input-error">{errors.email}</span>
        </div>
      </form>
      <span className="profile__input-message">{profMessage}</span>
      <button
        className={`profile__edit ${
          !formValid ? "profile__edit_disabled" : ""
        }`}
        type="submit"
        disabled={!formValid}
        onClick={handleSubmit}
      >
        Редактировать
      </button>
      <Link to="/" className="profile__exit" onClick={handleSignOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
