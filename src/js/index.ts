import { logoutUser, registerUser } from "./loginRegisterMethods.ts";
import { getItems, getSpells, getEnemies, getRooms } from "./getMethods.ts";
import { loginRequest } from "./loginRegisterRequests.ts";
import home_bg from "../assets/home_bg.jpg";

// login user
const loginUser = async (e: any) => {
  e.preventDefault();
  const user = {
    username: e.target.elements[0].value,
    password: e.target.elements[1].value,
  };
  let displayedLoginInfo = document.getElementById("LoginResponse");
  let toFightScreen = document.getElementById("toFightScreen");
  let registerFormDiv = document.getElementById("registerFormDiv");
  try {
    const loginResponse = await loginRequest(user);
    if (loginResponse.ok) {
      const resBody = await loginResponse.json();
      if (displayedLoginInfo) {
        displayedLoginInfo.innerText =
          'Login successful! Start fight by pressing the "To fight screen" button.';
      }
      localStorage.setItem("currentAccount", JSON.stringify(resBody));
      if (toFightScreen) {
        toFightScreen.hidden = false;
      }
      if (registerFormDiv) {
        registerFormDiv.hidden = true;
      }
      getItems();
      getSpells();
      getEnemies();
      getRooms();
    } else {
      if (displayedLoginInfo) {
        displayedLoginInfo.innerText =
          "Error: incorrect username and/or password.";
      }
      throw new Error(`${loginResponse.status}: ${loginResponse.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};
const logoutButton = document.getElementById("logoutButton");
const registerUserForm = document.getElementById("registerUserForm");
const loginUserForm = document.getElementById("loginUserForm");

if (logoutButton) logoutButton.addEventListener("click", logoutUser);

if (registerUserForm) registerUserForm.addEventListener("submit", registerUser);

if (loginUserForm) loginUserForm.addEventListener("submit", loginUser);

document.body.style.backgroundImage = `url("${home_bg}")`;