import apiUrl from "./url.js";
import { User } from "./user.js";
const { urlBoy, loginEndpoint } = apiUrl;


const loginRequest = (user: User) => {
  const { username, password } = user;
  if (username && password) {
    return fetch(urlBoy + loginEndpoint, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    throw Error("incomplete information");
  }
};

const registerRequest = (user: User) => {};

export { loginRequest, registerRequest };
