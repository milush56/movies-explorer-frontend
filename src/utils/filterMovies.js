export default function filterMovies(moviesList, dataMovie, isShortMovie) {
  if (dataMovie === undefined) {
    dataMovie = ' ';
  }
  return moviesList.filter((movie) => {
    if (isShortMovie) {
      return (
        movie.nameRU.toLowerCase().includes(dataMovie.toLowerCase()) &&
        movie.duration <= 40
      );
    } else {
      return (
        movie.nameRU.toLowerCase().includes(dataMovie.toLowerCase()) &&
        movie.duration > 40
      );
    }
  });
}
