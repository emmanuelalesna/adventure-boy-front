import apiUrl from "./url.js";
const { urlBoy, loginEndpoint } = apiUrl;

const loginRequest = (user) => {
  const { username, password } = user;
  if (username && password) {
    return fetch(urlBoy + loginEndpoint, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {"Content-Type": "application/json"}
    });
  } else {
    console.log(error);
    return Error("incomplete information");
  }
};

export { loginRequest };
