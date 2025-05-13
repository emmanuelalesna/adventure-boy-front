import { createPlayer } from "./playerRequests.ts";
import { urlBoy, loginEndpoint, accountEndpoint } from "./url.json";
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

const registerRequest = async (e: any) => {
  e.preventDefault();
  const newUser = {
    Username: e.target.elements["usernameRegister"].value,
    Password: e.target.elements["passwordRegister"].value,
  };
  try {
    const request = await fetch(urlBoy + accountEndpoint, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.ok) {
      const resBody = await request.json();
      const id = resBody.accountId;
      const name = e.target.elements["firstnameRegister"].value;
      createPlayer(id, name);
    } else {
      throw new Error(`${request.status}: ${request.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};


export { loginRequest, registerRequest };
