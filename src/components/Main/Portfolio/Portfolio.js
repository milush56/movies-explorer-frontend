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
            <a
              href="https://github.com/milush56/how-to-learn"
              className="portfolio__subtitle"
            >
              Статичный сайт
            </a>
            <a href="https://github.com/milush56/how-to-learn">
              <img
                className="portfolio__link-logo"
                src={linklogo}
                alt="стрелочка"
              />
            </a>
          </li>
          <li className="portfolio__site">
            <a href="https://milush56.github.io/yet-another-project/index.html" className="portfolio__subtitle">Адаптивный сайт</a>
            <a href="https://milush56.github.io/yet-another-project/index.html">
              <img
                className="portfolio__link-logo"
                src={linklogo}
                alt="стрелочка"
              />
            </a>
          </li>
          <li className="portfolio__site">
            <a href="https://github.com/milush56/react-mesto-api-full" className="portfolio__subtitle">Одностраничное приложение</a>
            <a href="https://github.com/milush56/react-mesto-api-full">
              <img
                className="portfolio__link-logo"
                src={linklogo}
                alt="стрелочка"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
