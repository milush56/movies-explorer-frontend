import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section>
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__buttons-container">
          <li className="techs__button-container">
            <button className="techs__button" type="button" aria-label="HTML">
              HTML
            </button>
          </li>
          <li className="techs__button-container">
            <button className="techs__button" type="button" aria-label="CSS">
              CSS
            </button>
          </li>
          <li className="techs__button-container">
            <button className="techs__button" type="button" aria-label="JS">
              JS
            </button>
          </li>
          <li className="techs__button-container">
            <button className="techs__button" type="button" aria-label="React">
              React
            </button>
          </li>
          <li className="techs__button-container">
            <button className="techs__button" type="button" aria-label="Git">
              Git
            </button>
          </li>
          <li className="techs__button-container">
            <button
              className="techs__button"
              type="button"
              aria-label="Express"
            >
              Express.js
            </button>
          </li>
          <li className="techs__button-container">
            <button
              className="techs__button"
              type="button"
              aria-label="mongoDB"
            >
              mongoDB
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
