import { urlBoy, loginEndpoint } from "./url.json";
import type { User } from "./User.ts";

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

const registerRequest = () => {};

export { loginRequest, registerRequest };
