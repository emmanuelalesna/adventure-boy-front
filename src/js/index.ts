import { getItems, getSpells, getEnemies, getRooms } from "./getMethods.ts";
import {
  idRequest,
  loginRequest,
  registerRequest,
} from "./loginRegisterRequests.ts";
import home_bg from "../assets/home_bg.jpg";
import { createPlayerRequest } from "./playerRequests.ts";
import type { User } from "./User.ts";

// login user
const loginUser = async (e: any) => {
  e.preventDefault();
  const user: User = {
    email: e.target.elements[0].value,
    password: e.target.elements[1].value,
  };
  let displayedLoginInfo = document.getElementById("LoginResponse");
  let toFightScreen = document.getElementById("toFightScreen");
  let registerFormDiv = document.getElementById("registerFormDiv");
  const toPlayerScreen = document.getElementById("toPlayerScreen");
  try {
    const loginResponse = await loginRequest(user);
    if (loginResponse.ok) {
      const resBody = await loginResponse.json();
      if (displayedLoginInfo) {
        displayedLoginInfo.innerText =
          'Login successful! Start fight by pressing the "To fight screen" button.';
      }
      localStorage.setItem("token", JSON.stringify(resBody));
      const accountId = await idRequest();
      if (accountId.ok) {
        const resBody = await accountId.text();
        localStorage.setItem("id", resBody);
      }

      if (toFightScreen) toFightScreen.hidden = false;
      if (toPlayerScreen) toPlayerScreen.hidden = false;
      if (registerFormDiv) registerFormDiv.hidden = true;

      getItems();
      getSpells();
      getEnemies();
      getRooms();
    } else {
      if (displayedLoginInfo)
        displayedLoginInfo.innerText =
          "Error: incorrect username and/or password.";

      throw new Error(`${loginResponse.status}: ${loginResponse.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (e: any) => {
  e.preventDefault();
  const user: User = {
    email: e.target.elements[0].value,
    password: e.target.elements[1].value,
  };
  try {
    const registerResponse = await registerRequest(user);
    if (registerResponse.ok) {
      const resBody = await registerResponse.json();
      // createPlayer(resBody.accountId, e.target.elements[2].value);
    } else {
      throw new Error(
        `${registerResponse.status}: ${registerResponse.statusText}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const createPlayer = async (id: number, name: string) => {
  try {
    const createResponse = await createPlayerRequest(id, name);
    if (createResponse.ok) {
      const registerResponse = document.getElementById("RegisterResponse");
      if (registerResponse) registerResponse.innerText = "Player created!";
    } else {
      throw new Error(`${createResponse.status}: ${createResponse.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutButton = document.getElementById("logoutButton");
const registerUserForm = document.getElementById("registerUserForm");
const loginUserForm = document.getElementById("loginUserForm");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}

if (registerUserForm) registerUserForm.addEventListener("submit", registerUser);

if (loginUserForm) loginUserForm.addEventListener("submit", loginUser);

document.body.style.backgroundImage = `url("${home_bg}")`;
