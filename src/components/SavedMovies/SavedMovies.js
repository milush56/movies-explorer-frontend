import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <section>
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default SavedMovies;
