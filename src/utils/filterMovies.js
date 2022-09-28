export default function filterMovies(moviesList, dataFilter) {
  const nameMovieFilter = dataFilter.movie.toLowerCase();
  const isShortMovieFilter = dataFilter.isShortMovie;
  console.log(moviesList);
  return moviesList.filter((movie) => {
    if (isShortMovieFilter) {
      return (
        movie.nameRU.toLowerCase().includes(nameMovieFilter) &&
        movie.duration <= 40
      );
    } else {
      return (
        movie.nameRU.toLowerCase().includes(nameMovieFilter) &&
        movie.duration > 40
      );
    }
  });
}