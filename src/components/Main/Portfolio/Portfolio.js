import React from "react";
import "./Portfolio.css";
import linklogo from "../../../images/link-logo.svg";

function Portfolio() {
  return (
    <section>
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__site-container">
          <li className="portfolio__site">
            <p className="portfolio__subtitle">Статичный сайт</p>
            <img className="portfolio__link-logo" src={linklogo} alt="стрелочка"/>
          </li> 
          <li className="portfolio__site">
            <p className="portfolio__subtitle">Адаптивный сайт</p>
            <img className="portfolio__link-logo" src={linklogo} alt="стрелочка"/>
          </li>
          <li className="portfolio__site">
            <p className="portfolio__subtitle">Одностраничное приложение</p>
            <img className="portfolio__link-logo" src={linklogo} alt="стрелочка"/>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
