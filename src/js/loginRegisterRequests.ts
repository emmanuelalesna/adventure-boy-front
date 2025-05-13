import { urlBoy, loginEndpoint, accountEndpoint } from "./url.json";
import type { User } from "./User.ts";

const loginRequest = (user: User) => {
  const { username, password } = user;
  if (username && password) {
    return fetch(urlBoy + loginEndpoint, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    throw new Error("incomplete information");
  }
};

const registerRequest = async (user: User) => {
  const { username, password } = user;
  if (username && password) {
    return fetch(urlBoy + accountEndpoint, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  } else {
    throw new Error("incomplete information");
  }
};


export { loginRequest, registerRequest };
