import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section>
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__list">
          <li className="about-project__list-item">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__plan">
          <p className="about-project__b-week">1 неделя</p>
          <p className="about-project__f-week">4 недели</p>
          <p className="about-project__backend">Back-end</p>
          <p className="about-project__frontend">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
