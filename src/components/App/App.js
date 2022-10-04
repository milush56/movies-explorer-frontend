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

  function handleRegister(props) {
    setIsOpenPreloader(true);
    const { name, email, password } = props;

    return MainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegMessage("При регистрации пользователя произошла ошибка");
      })
      .finally(() => setIsOpenPreloader(false));
  }

  const handleLogin = (props) => {
    const { email, password } = props;
    return MainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        tokenCheck();
        history.push("/");
      })
      .catch((err) => {
        setRegMessage("Что-то пошло не так! Попробуйте ещё раз");
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
    let jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      MainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            setСurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleUpdateUser(name, email) {
    MainApi.newUser(name, email)
      .then((data) => {
        console.log(data);
        setСurrentUser(data);
        setProfMessage("Данные изменены");
      })
      .catch((err) => {
        if (err === 409) {
          setProfMessage("Пользователь с указанным email уже существует");
        }
      });
  }

  function onDelete(movie) {
    console.log(movie);
    const movieDeleted = savedMovies.filter((c) => c._id !== movie._id);
    console.log(movieDeleted);
    setSavedMovies(movieDeleted);
    localStorage.setItem("savedMovies", JSON.stringify(movieDeleted));
    MainApi.deleteMovies(movie._id).catch((err) => {
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

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (location.pathname === "/movies") {
      const savedMoviesInLocalStorage = JSON.parse(localStorage.savedMovies);
      console.log(savedMoviesInLocalStorage);
      setSavedMovies(savedMoviesInLocalStorage);
    }
  }, [location.pathname]);

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
    MoviesApi.getContent()
      .then((movies) => {
        setAllMovies(movies);
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, [currentUser]);

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
          />
          <Route path="/signup" exact>
            <Register onRegister={handleRegister} message={regMessage} />
          </Route>
          <Route path="/signin" exact>
            <Login onLogin={handleLogin} message={regMessage} />
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
            onSave={onSave}
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
          <Route path="*">
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
