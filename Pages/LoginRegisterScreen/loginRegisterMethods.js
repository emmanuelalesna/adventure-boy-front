import { getItems, getSpells, getEnemies, getRooms } from "../getMethods.js";
import { createPlayer } from "../playerMethods.js";

// login user
const loginUser = (e) => {
  e.preventDefault();
  const usernameLogin = e.target.elements["usernameLogin"].value;
  const passwordLogin = e.target.elements["passwordLogin"].value;

  fetch("http://localhost:5114/api/account/" + usernameLogin)
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
            'Login successful! Start fight by pressing the "To fight screen" button below.';
          localStorage.setItem("currentAccount", JSON.stringify(resBody));
          document.getElementById("toFightScreen").hidden = false;
          document.getElementById("registerFormDiv").hidden = true;
          getItems();
          getSpells();
          getEnemies();
          getMethgetRooms();
        } else {
          let displayedLoginInfo = document.getElementById("LoginResponse");
          displayedLoginInfo.innerText = "Incorrect Password!";
        }
      }
    });
};

//register user
const registerUser = (e) => {
  e.preventDefault();
  const newUser = {
    Username: e.target.elements["usernameRegister"].value,
    Password: e.target.elements["passwordRegister"].value,
  };

  fetch("http://localhost:5114/api/account", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((resBody) => {
      const id = resBody.accountId;
      const name = e.target.elements["firstnameRegister"].value;
      createPlayer(id, name);
    });
};

const logoutUser = () => {
  localStorage.clear();
};

export { registerUser, loginUser, logoutUser };
