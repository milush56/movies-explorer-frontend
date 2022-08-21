import React from "react";
import "./AboutMe.css";
import ava from "../../../images/ava.png";

function AboutMe() {
  return (
    <section className="aboutme__container">
      <h2 className="aboutme__title">Студент</h2>
      <ul className="aboutme__info-container">
        <li className="aboutme__text-container">
          <h3 className="aboutme__name">Марат</h3>
          <p className="aboutme__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <div className="aboutme__links">
            <a href="https://t.me/Marat_Milushev" className="aboutme__link">Telegram</a>
            <a href="https://github.com/milush56" className="aboutme__link">Github</a>
          </div>
        </li>
        <li>
          <img src={ava} alt="аватарка" className="aboutme__photo-container" />
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
