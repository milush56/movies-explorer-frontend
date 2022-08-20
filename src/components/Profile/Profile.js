import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__container">
          <span className="profile__signature">Имя</span>
          <input 
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
            className="profile__item"
            required=""
          ></input>
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
          ></input>
        </div>
      </form>
      <p className="profile__edit">Редактировать</p>
      <Link to="/signin" className="profile__exit">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;
