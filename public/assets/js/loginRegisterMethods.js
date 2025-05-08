import { getItems, getSpells, getEnemies, getRooms } from "./getMethods.js";
import { loginRequest } from "./loginRegisterRequests.js";
import { createPlayer } from "./playerMethods.js";
import apiUrl from "./url.js";

const { urlBoy, accountEndpoint } = apiUrl;

// login user
const loginUser = async (e) => {
  e.preventDefault();
  const user = {
    username: e.target.elements[0].value,
    password: e.target.elements[1].value,
  };
  let displayedLoginInfo = document.getElementById("LoginResponse");
  try {
    const loginResponse = await loginRequest(user);
    if (loginResponse.ok) {
      const resBody = await loginResponse.json();
      displayedLoginInfo.innerText =
        'Login successful! Start fight by pressing the "To fight screen" button.';
      localStorage.setItem("currentAccount", JSON.stringify(resBody));
      document.getElementById("toFightScreen").hidden = false;
      document.getElementById("registerFormDiv").hidden = true;
      getItems();
      getSpells();
      getEnemies();
      getRooms();
    } else {
      displayedLoginInfo.innerText =
        "Error: incorrect username and/or password.";
      throw new Error(`${loginResponse.status}: ${loginResponse.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

//register user
const registerUser = async (e) => {
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

export { registerUser, loginUser, logoutUser };
