import { urlBoy, loginEndpoint, accountEndpoint } from "./url.json";
import type { User } from "./User.ts";

const loginRequest = (user: User) => {
  const { email, password } = user;
  if (email && password) {
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
  const { email, password } = user;
  if (email && password) {
    return fetch(urlBoy + accountEndpoint + "register/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    throw new Error("incomplete information");
  }
};

const idRequest = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return fetch(urlBoy + accountEndpoint + "id/", {
      headers: {
        Authorization: "Bearer " + JSON.parse(token).accessToken,
      },
    });
  } else {
    throw new Error("token not found");
  }
};

export { loginRequest, registerRequest, idRequest };
