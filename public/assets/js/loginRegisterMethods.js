import { getItems, getSpells, getEnemies, getRooms } from "./getMethods.js";
import { createPlayer } from "./playerMethods.js";
import apiUrl from "./url.js";

const { urlBoy, accountEndpoint } = apiUrl;

// login user
const loginUser = (e) => {
  e.preventDefault();
  const usernameLogin = e.target.elements["usernameLogin"].value;
  const passwordLogin = e.target.elements["passwordLogin"].value;
  try {
    fetch(urlBoy + accountEndpoint + usernameLogin)
      .then((res) => {
        if (res.status == 404) {
          let displayedLoginInfo = document.getElementById("LoginResponse");
          displayedLoginInfo.innerText = "Incorrect Username!";
          return 404;
        }
        return res.json();
      })
      .then((resBody) => {
        if (resBody != 404) {
          if (resBody.password == passwordLogin) {
            let displayedLoginInfo = document.getElementById("LoginResponse");
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
            let displayedLoginInfo = document.getElementById("LoginResponse");
            displayedLoginInfo.innerText = "Incorrect Password!";
          }
        }
      });
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
