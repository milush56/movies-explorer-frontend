function checkResponse(res) {
  console.log(res);
  return res.ok ? res.json() : Promise.reject(res.status);
}

export const getContent = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    return checkResponse(res);
  });
};
