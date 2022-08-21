import React from "react";
import "./NotFound.css";


function NotFound() {
  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__subtitle">Страница не найдена</p>
      <p className="notfound__back">Назад</p>
    </div>
  );
}

export default NotFound;
