import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <ul className="navtab__button-container">
        <li>
          <button
            className="navtab__about-button"
            type="button"
            aria-label="о проекте"
          >
            О проекте
          </button>
        </li>
        <li>
          <button
            className="navtab__techs-button"
            type="button"
            aria-label="технологии"
          >
            Технологии
          </button>
        </li>
        <li>
          <button
            className="navtab__aboutme-button"
            type="button"
            aria-label="студент"
          >
            Студент
          </button>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
