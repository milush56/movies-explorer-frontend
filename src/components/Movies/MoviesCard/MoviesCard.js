import React from "react";
import "./MoviesCard.css";
import pic from "../../../images/pic.png";
import { Route, Switch } from "react-router-dom";

function MoviesCard() {
  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч 47м</p>
        </div>
        <Switch>
          <Route path="/movies">
            <button
              className="movies-card__save"
              type="button"
              aria-label="сохранить"
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className="movies-card__delete"
              type="button"
            ></button>
          </Route>
        </Switch>
      </div>
      <img src={pic} alt="обложка" />
    </li>
  );
}

export default MoviesCard;
