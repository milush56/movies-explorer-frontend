import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__subtitle">Страница не найдена</p>
      <button onClick={history.goBack} className="notfound__back">
        Назад
      </button>
    </div>
  );
}

export default NotFound;
