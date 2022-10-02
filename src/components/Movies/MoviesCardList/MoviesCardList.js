import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../../hooks/useWindowSize";


function MoviesCardList({ movies, onSave, onDelete, isSavedMoviesPage, isSuccessSearch, savedMovies }) {
  const windowSize = useWindowSize();
  const [maxCards, setMaxCards] = React.useState(0);
  const [loadCards, setLoadCards] = React.useState(0);
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(0);

  React.useEffect(() => {
    setMaxCards(windowSize > 1023 ? 12 : windowSize > 767 ? 8 : 5);
    setLoadCards(windowSize > 1023 ? 3 : windowSize > 767 ? 2 : 1);
    setMaxCardsAfterLoad(maxCards);
  }, [windowSize, maxCards]);

  function handleCardsLoaderClick() {
    setMaxCardsAfterLoad(maxCardsAfterLoad + loadCards);
  }

  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__container">
        {movies.map((movieCard) => {
          if (isSavedMoviesPage) {
            return (
              <MoviesCard
                card={movieCard}
                key={movieCard._id}
                isSavedMoviesPage={isSavedMoviesPage}
                onDelete={onDelete}
              ></MoviesCard>
            );
          } else if (
            !isSavedMoviesPage &&
            movies.indexOf(movieCard) < maxCardsAfterLoad
          ) {
            return (
              <MoviesCard
                card={movieCard}
                key={movieCard.id}
                isSavedMoviesPage={isSavedMoviesPage}
                onSave={onSave}
                savedMovies={savedMovies}
              ></MoviesCard>
            );
          } else {
            return null;
          }
        })}
      </ul>
      {!isSuccessSearch && (
        <p className="movies-cardlist__text">Ничего не найдено</p>
      )}
      {!isSavedMoviesPage && movies.length > maxCards && (
        <button
          className="movies-cardlist__button"
          type="button"
          aria-label="еще"
          onClick={handleCardsLoaderClick}
        >
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
