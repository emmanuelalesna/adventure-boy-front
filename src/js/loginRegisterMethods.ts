import { createPlayer } from "./playerMethods.js";
import { urlBoy, accountEndpoint } from "./url.json";

//register user
const registerUser = async (e: any) => {
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

const logoutUser = () => {
  localStorage.clear();
};

export { registerUser, logoutUser };
