import React from "react";
import "./Promo.css";

function Footer() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <ul className="promo__button-container">
          <li>
            <button
              className="promo__about-button"
              type="button"
              aria-label="о проекте"
            >
              О проекте
            </button>
          </li>
          <li>
            <button
              className="promo__techs-button"
              type="button"
              aria-label="технологии"
            >
              Технологии
            </button>
          </li>
          <li>
            <button
              className="promo__aboutme-button"
              type="button"
              aria-label="студент"
            >
              Студент
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
