import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Movies/Preloader/Preloader";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import filterMovies from "../../utils/filterMovies";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setСurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const history = useHistory();
  const [regMessage, setRegMessage] = useState("");
  const [profMessage, setProfMessage] = useState("");

  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [keyWordMovieSearch, setKeyWordMovieSearch] = React.useState("");
  const [isSuccessSearchMovie, setIsSuccessSearchMovie] = React.useState(true);
  const [isSuccessSearchSavedMovie, setIsSuccessSearchSavedMovie] =
    React.useState(true);
  const [isShortMovieSearch, setIsShortMovieSearch] = React.useState(false);
  let location = useLocation();
  const [isDisabledForm, setIsDisabledForm] = React.useState(false);

  function handleRegister(props) {
    setIsOpenPreloader(true);
    setIsDisabledForm(true);
    const { name, email, password } = props;

    return MainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegMessage("При регистрации пользователя произошла ошибка");
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsOpenPreloader(false);
        setIsDisabledForm(false);
      });
  }

  const handleLogin = (props) => {
    setIsOpenPreloader(true);
    setIsDisabledForm(true);
    const { email, password } = props;
    return MainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        getCurrentUser();
        history.push("/movies");
      })
      .catch((err) => {
        setRegMessage("Что-то пошло не так! Попробуйте ещё раз");
      })
      .finally(() => {
        setIsOpenPreloader(false);
        setIsDisabledForm(false);
      });
  };

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("keyWordMovieSearch");
    localStorage.removeItem("isShortMovieSearch");
    localStorage.removeItem("savedMovies");
    window.localStorage.clear();
    console.log(localStorage.movies);
    setAllMovies([]);
    setMovies([]);
    setSavedMovies([]);
    setKeyWordMovieSearch("");
    setLoggedIn(false);
    history.push("/");
  }

  const tokenCheck = () => {
    const path = location.pathname;
    let jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      MainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            setСurrentUser(res);
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleUpdateUser(name, email) {
    setIsDisabledForm(true);
    MainApi.newUser(name, email)
      .then((data) => {
        console.log(data);
        setСurrentUser(data);
        setProfMessage("Данные изменены");
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        if (err === 409) {
          setProfMessage("Пользователь с указанным email уже существует");
        }
      })
      .finally(() => {
        setIsOpenPreloader(false);
        setIsDisabledForm(false);
      });
  }

  function toggleSaveMovie(dataMovie) {
    const isSavedMovie = savedMovies.some((i) => i.movieId === dataMovie.id);
    if (isSavedMovie) {
      const savedMovie = savedMovies.find((i) => i.movieId === dataMovie.id);
      onDelete(savedMovie);
    }
    if (!isSavedMovie) {
      onSave(dataMovie);
    }
  }

  function onDelete(movie) {
    MainApi.deleteMovies(movie._id)
      .then(() => {
        const movieDeleted = savedMovies.filter((c) => c._id !== movie._id);
        console.log(movieDeleted);
        setSavedMovies(movieDeleted);
        localStorage.setItem("savedMovies", JSON.stringify(movieDeleted));
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function onSave(dataMovie) {
    MainApi.postMovies(dataMovie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([newMovie, ...savedMovies])
        );
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function setStatusSearchMovies(arrMovies, setItem) {
    arrMovies.length === 0 ? setItem(false) : setItem(true);
  }

  function nameSearchFilm(dataMovie, isShortMovie) {
    setIsOpenPreloader(true);
    const moviesFilter = filterMovies(allMovies, dataMovie, isShortMovie);
    console.log(dataMovie, isShortMovie);
    setKeyWordMovieSearch(dataMovie);
    setIsShortMovieSearch(isShortMovie);
    setMovies(moviesFilter);
    setStatusSearchMovies(moviesFilter, setIsSuccessSearchMovie);

    const moviesFilterJSON = JSON.stringify(moviesFilter);
    localStorage.setItem("movies", moviesFilterJSON);
    localStorage.setItem("keyWordMovieSearch", dataMovie);
    localStorage.setItem("isShortMovieSearch", isShortMovie);

    setIsOpenPreloader(false);
  }

  function nameSearchSavedFilm(dataMovie, isShortMovie) {
    setIsOpenPreloader(true);
    const savedMoviesInLocalStorage = JSON.parse(localStorage.savedMovies);
    console.log(savedMoviesInLocalStorage);
    const savedMoviesFilter = filterMovies(
      savedMoviesInLocalStorage,
      dataMovie,
      isShortMovie
    );
    setSavedMovies(savedMoviesFilter);
    setStatusSearchMovies(savedMoviesFilter, setIsSuccessSearchSavedMovie);
    console.log(dataMovie, isShortMovie);
    setIsOpenPreloader(false);
  }

  function getCurrentUser() {
    MainApi.getUser()
      .then((userData) => {
        if (userData) {
          setСurrentUser(userData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (localStorage.movies) {
      const moviesFilterJSON = JSON.parse(localStorage.movies);
      setMovies(moviesFilterJSON);
    }
    if (localStorage.keyWordMovieSearch) {
      setKeyWordMovieSearch(localStorage.keyWordMovieSearch);
    }
    if (localStorage.isShortMovieSearch) {
      const isShortMovieSearchJSON = JSON.parse(
        localStorage.isShortMovieSearch
      );
      setIsShortMovieSearch(isShortMovieSearchJSON);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([MainApi.getUser(), MainApi.getMovies()])
        .then(([userData, movies]) => {
          setСurrentUser(userData);
          const savedMoviesList = movies.filter(
            (item) => item.owner === userData._id
          );
          console.log(savedMoviesList);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(savedMoviesList, ...savedMovies)
          );
          setSavedMovies(savedMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      MoviesApi.getContent()
        .then((movies) => {
          setAllMovies(movies);
        })
        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (location.pathname === "/movies" && localStorage.savedMovies !== undefined && loggedIn) {
      const savedMoviesInLocalStorage = JSON.parse(localStorage.savedMovies);
      console.log(savedMoviesInLocalStorage);
      setSavedMovies(savedMoviesInLocalStorage);
    }
  }, [location.pathname]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header handleSignOut={signOut} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute
            path="/profile"
            handleSignOut={signOut}
            component={Profile}
            onUpdateUser={handleUpdateUser}
            loggedIn={loggedIn}
            profMessage={profMessage}
            isDisabledForm={isDisabledForm}
          />
          <Route path="/signup" exact>
            <Register
              onRegister={handleRegister}
              message={regMessage}
              isDisabledForm={isDisabledForm}
            />
          </Route>
          <Route path="/signin" exact>
            <Login
              onLogin={handleLogin}
              message={regMessage}
              isDisabledForm={isDisabledForm}
            />
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            movies={movies}
            nameSearchFilm={nameSearchFilm}
            keyWordSearch={keyWordMovieSearch}
            onSave={toggleSaveMovie}
            isSuccessSearch={isSuccessSearchMovie}
            loggedIn={loggedIn}
            isShortMovieSearch={isShortMovieSearch}
            savedMovies={savedMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            movies={savedMovies}
            onDelete={onDelete}
            isSuccessSearch={isSuccessSearchSavedMovie}
            nameSearchSavedFilm={nameSearchSavedFilm}
            loggedIn={loggedIn}
          />
          <Route path="*" >
            <NotFound />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="./" /> : <Redirect to="./signup" />}
          </Route>
        </Switch>
        <Preloader isVisible={isOpenPreloader} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
