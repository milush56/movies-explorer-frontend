import React from "react";
import "./AboutMe.css";
import ava from "../../../images/ava.png"

function AboutMe() {
  return (
    <section>
      <div className="aboutme__container">
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
              <p className="aboutme__link">Telegram</p>
              <p className="aboutme__link">Github</p>
            </div>
          </li>
          <li className="aboutme__photo-container">
            <img src={ava} alt="аватарка"/>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
