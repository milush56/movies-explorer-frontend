import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
  movies,
  onDelete,
  isSuccessSearch,
  nameSearchFilm,
  handleMoviesTumbler
}) {
  return (
    <section>
      <SearchForm
        nameSearchFilm={nameSearchFilm}
        handleMoviesTumbler={handleMoviesTumbler}
      />
      <MoviesCardList
        isSavedMoviesPage={true}
        movies={movies}
        onDelete={onDelete}
        isSuccessSearch={isSuccessSearch}
      />
    </section>
  );
}

export default SavedMovies;
