import React from "react";
import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ nameSearchFilm, isShortMovie, toggleFilm }) {
  const [filmValue, setFilmValue] = useState("");
  const [error, setError] = useState(false);
  const [formValid, setFormValid] = React.useState(false);

  const searchFilm = (e) => {
    setFilmValue(e.target.value);
    if (e.target.value.length === 0) {
      setError("Введите ключевое слово");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nameSearchFilm(filmValue);
  };

  React.useEffect(() => {
    if (filmValue && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [filmValue, error]);

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <div className="searchform__search-container">
          <button
            type="submit"
            className="searchform__find-button"
            onClick={handleSubmit}
            disabled={!formValid}
          />
          <input
            type="text"
            className="searchform__item"
            id="film"
            name="film"
            placeholder="Фильм"
            minLength={2}
            maxLength={40}
            required=""
            value={filmValue || ""}
            onChange={searchFilm}
          ></input>
        </div>
        <div className="searchform__toggle-container">
          <button
            type="submit"
            className="searchform__button"
            onClick={handleSubmit}
            disabled={!formValid}
          ></button>
          <input
            type="checkbox"
            name="toggle"
            className="searchform__toggle"
            id="toggle"
            onChange={toggleFilm}
            checked={isShortMovie}
          />
          <label className="searchform__label">Короткометражки</label>
        </div>
      </form>
      <span className="searchform__item-error">{error}</span>
    </section>
  );
}

export default SearchForm;
