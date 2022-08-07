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
        <ul className="techs__button-container">
          <li>
            <button
              className="techs__html-button"
              type="button"
              aria-label="HTML"
            >
              HTML
            </button>
          </li>
          <li>
            <button
              className="techs__css-button"
              type="button"
              aria-label="CSS"
            >
              CSS
            </button>
          </li>
          <li>
            <button
              className="techs__js-button"
              type="button"
              aria-label="JS"
            >
              JS
            </button>
          </li>
          <li>
            <button
              className="techs__react-button"
              type="button"
              aria-label="React"
            >
              React
            </button>
          </li>
          <li>
            <button
              className="techs__git-button"
              type="button"
              aria-label="Git"
            >
              Git
            </button>
          </li>
          <li>
            <button
              className="techs__express-button"
              type="button"
              aria-label="Express"
            >
              Express.js
            </button>
          </li>
          <li>
            <button
              className="techs__mongodb-button"
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
