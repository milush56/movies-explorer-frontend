import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="searchform">
      <form className="searchform__form">
        <div className="searchform__search-container">
          <button type="submit" className="searchform__find-button" />
          <input
            type="text"
            className="searchform__item"
            id="film"
            name="film"
            placeholder="Фильм"
            minLength={2}
            maxLength={40}
            required
          ></input>
        </div>
        <div className="searchform__toggle-container">
          <button className="searchform__button"></button>
          <input
            type="checkbox"
            name="toggle"
            className="searchform__toggle"
            id="toggle"
          />
          <label className="searchform__label">Короткометражки</label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
