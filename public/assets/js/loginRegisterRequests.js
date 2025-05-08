import apiUrl from "./url.js";

const { urlBoy, loginEndpoint } = apiUrl;

const loginRequest = (user) => {
  const { username, password } = user;
  if (username && password) {
    return fetch(urlBoy + loginEndpoint, {
      method: "POST",
      body: new URLSearchParams({ username, password }),
    });
  } else {
    console.log(error);
    return Error("incomplete information");
  }
};

export { loginRequest };
