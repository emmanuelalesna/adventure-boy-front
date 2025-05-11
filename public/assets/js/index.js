import { logoutUser, registerUser } from "./loginRegisterMethods.js";
import { getItems, getSpells, getEnemies, getRooms } from "./getMethods.js";
import { loginRequest } from "./loginRegisterRequests.js";

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

document.getElementById("logoutButton").addEventListener("click", logoutUser);

document
  .getElementById("registerUser")
  .addEventListener("submit", registerUser);

document.getElementById("loginUser").addEventListener("submit", loginUser);
