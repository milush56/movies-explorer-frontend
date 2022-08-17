import React from "react";
import { Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/signup" exact>
          <Register />
        </Route>
        <Route path="/signin" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/saved-movies" exact>
          <SavedMovies />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
