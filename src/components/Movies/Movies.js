import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({
  movies,
  nameSearchFilm,
  toggleFilm,
  isShortMovie,
  onSave,
  isSuccessSearch
}) {
  return (
    <section>
      <SearchForm
        nameSearchFilm={nameSearchFilm}
        toggleFilm={toggleFilm}
        isShortMovie={isShortMovie}
      />
      <MoviesCardList
        isSavedMoviesPage={false}
        movies={movies}
        onSave={onSave}
        isSuccessSearch={isSuccessSearch}
      />
    </section>
  );
}

export default Movies;
