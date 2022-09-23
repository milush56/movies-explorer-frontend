import React from "react";
import "./MoviesCard.css";
import { Route, Switch } from "react-router-dom";

function MoviesCard({
  card,
  onSave,
  onDelete
}) {
  console.log(card);
  /* const isLiked = !card.isSavedMovies && card.likedMovies(card.movie); */

  function handleSaveCard() {
    onSave(card);
  }

  function handleDeleteCard() {
    onDelete(card);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">
            {card.nameRU}
          </h2>
          <p className="movies-card__duration">{`${Math.floor(
            (card.duration) / 60
          )}ч ${(card.duration) % 60}м`}</p>
        </div>
        <Switch>
          <Route path="/movies">
            <button
              /* className={`movies-card__save ${
                isLiked ? "movies-card__save_active" : ""
              }`} */
              className="movies-card__save"
              type="button"
              aria-label="сохранить"
              onClick={handleSaveCard}
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className="movies-card__delete"
              type="button"
              onClick={handleDeleteCard}
            ></button>
          </Route>
        </Switch>
      </div>
      <img src={`https://api.nomoreparties.co/${card.image.url}`} alt={card.nameRU} />
    </li>
  );
}

export default MoviesCard;
