import React from "react";
import "./SearchForm.css";
import useFormValidator from "../../../hooks/useFormValidator";

function SearchForm({ nameSearchFilm, keyWordSearch, isShortMovieSearch }) {
  const { values, handleChange, isValid } = useFormValidator({
    movie: keyWordSearch,
  });
  const [isValidForm, setIsValidForm] = React.useState(true);

  const defaultShotMovieChecked =
    isShortMovieSearch !== undefined ? isShortMovieSearch : false;
  const [isShortMovie, setIsShortMovie] = React.useState(
    defaultShotMovieChecked
  );

  function toggleFilm(e) {
    setIsShortMovie(e.target.checked);
    e.target.checked === true ? nameSearchFilm(values.movie, true) : nameSearchFilm(values.movie, false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid && !values.movie) {
      setIsValidForm(false);
    } else {
      nameSearchFilm(values.movie, isShortMovie);
    }
  };

  React.useEffect(() => {
    if (isValid) {
      setIsValidForm(true);
    }
  }, [isValid]);

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <div className="searchform__search-container">
          <button
            type="submit"
            className="searchform__find-button"
          />
          <input
            type="text"
            className="searchform__item"
            name="movie"
            placeholder="Фильм"
            minLength={1}
            maxLength={40}
            required=""
            value={values.movie || ""}
            onChange={handleChange}
          ></input>
        </div>
        <div className="searchform__toggle-container">
          <button
            type="submit"
            className="searchform__button"
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
      <span className="searchform__item-error">
        {!isValidForm && "Нужно ввести ключевое слово"}
      </span>
    </section>
  );
}

export default SearchForm;
