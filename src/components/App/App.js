import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
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
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const history = useHistory();
  const [regMessage, setRegMessage] = useState("");

  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [keyWordMovieSearch, setKeyWordMovieSearch] = React.useState("");
  const [isShortMovieSearch, setIsShortMovieSearch] = React.useState(true);
  const [isSuccessSearchMovie, setIsSuccessSearchMovie] = React.useState(true);
  const [isSuccessSearchSavedMovie, setIsSuccessSearchSavedMovie] =
    React.useState(true);

  function handleRegister(name, email, password) {
    setIsOpenPreloader(true);
    return MainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setRegMessage("Вы успешно зарегистрировались!");
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setRegMessage("При регистрации пользователя произошла ошибка");
      }).finally(() => setIsOpenPreloader(false));
  }

  const handleLogin = (email, password) => {
    return MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setRegMessage("Что-то пошло не так! Попробуйте ещё раз.");
      });
  };

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  }

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      MainApi.getContent(jwt)
        .then((res) => {
          if (res) {
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
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function onDelete(movie) {
    console.log(movie);
    setSavedMovies((savedMovies) => savedMovies.filter((c) => c._id !== movie._id));
    MainApi.deleteMovies(movie._id)
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function onSave(dataMovie) {
    MainApi.postMovies(dataMovie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function setStatusSearchMovies(arrMovies, setItem) {
    arrMovies.length === 0 ? setItem(false) : setItem(true);
  }

  function handleSearchMovies(dataSearch) {
    setIsOpenPreloader(true);
    MoviesApi.getContent()
      .then((movies) => {
        return filterMovies(movies, dataSearch);
      })
      .then((moviesFilter) => {
        setKeyWordMovieSearch(dataSearch.movie);
        setIsShortMovieSearch(dataSearch.isShortMovie);
        setMovies(moviesFilter);
        setStatusSearchMovies(moviesFilter, setIsSuccessSearchMovie);

        const moviesFilterJSON = JSON.stringify(moviesFilter);
        localStorage.setItem("movies", moviesFilterJSON);
        localStorage.setItem("keyWordMovieSearch", dataSearch.movie);
        localStorage.setItem("isShortMovieSearch", dataSearch.isShortMovie);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })
      .finally(() => setIsOpenPreloader(false));
  }

  function nameSearchSavedFilm(dataSearch) {
    setIsOpenPreloader(true);
    const savedMoviesInLocalStorage = JSON.parse(localStorage.savedMovies);
    const savedMoviesFilter = filterMovies(
      savedMoviesInLocalStorage,
      dataSearch
    );
    setSavedMovies(savedMoviesFilter);
    setStatusSearchMovies(savedMoviesFilter, setIsSuccessSearchSavedMovie);

    setIsOpenPreloader(false);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUser()
        .then((res) => {
          setСurrentUser(res);
        })
        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
    }
  }, [loggedIn]);

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
      MainApi.getMovies()
        .then((movies) => {
          setSavedMovies(movies);
          const savedMoviesJSON = JSON.stringify(movies);
          localStorage.setItem("savedMovies", savedMoviesJSON);
        })
        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
        history.push("/movies");
    }
  }, [loggedIn]);

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
            nameSearchFilm={handleSearchMovies}
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
            nameSearchFilm={nameSearchSavedFilm}
            loggedIn={loggedIn}
          />
          <Preloader isVisible={isOpenPreloader} />
          <Route path="*">
            <NotFound />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="./" /> : <Redirect to="./signup" />}
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
