import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({
  movies,
  nameSearchFilm,
  keyWordSearch,
  isShortMovieSearch,
  onSave,
  isSuccessSearch,
  savedMovies,
}) {
  return (
    <section>
      <SearchForm
        nameSearchFilm={nameSearchFilm}
        keyWordSearch={keyWordSearch}
        isShortMovieSearch={isShortMovieSearch}
      />
      <MoviesCardList
        isSavedMoviesPage={false}
        movies={movies}
        onSave={onSave}
        isSuccessSearch={isSuccessSearch}
        savedMovies={savedMovies}
      />
    </section>
  );
}

export default Movies;
