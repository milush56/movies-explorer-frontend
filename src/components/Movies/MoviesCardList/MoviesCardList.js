import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../../hooks/useWindowSize";
import { DESKTOP_SIZE, TABLET_SIZE, TWELWE_CARDS, EIGHT_CARDS, FIVE_CARDS, THREE_CARDS, TWO_CARDS, ONE_CARD } from "../../../utils/constants";


function MoviesCardList({ movies, onSave, onDelete, isSavedMoviesPage, isSuccessSearch, savedMovies }) {
  const windowSize = useWindowSize();
  const [maxCards, setMaxCards] = React.useState(0);
  const [loadCards, setLoadCards] = React.useState(0);
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(0);

  React.useEffect(() => {
    setMaxCards(windowSize > DESKTOP_SIZE ? TWELWE_CARDS : windowSize > TABLET_SIZE ? EIGHT_CARDS : FIVE_CARDS);
    setLoadCards(windowSize > DESKTOP_SIZE ? THREE_CARDS : windowSize > TABLET_SIZE ? TWO_CARDS : ONE_CARD);
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
