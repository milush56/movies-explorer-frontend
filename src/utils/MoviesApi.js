function checkResponse(res) {
  console.log(res);
  return res.ok ? res.json() : Promise.reject(res.status);
}

export const getContent = () => {
  return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
};
