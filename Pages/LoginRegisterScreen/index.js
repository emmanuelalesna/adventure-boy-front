const userRegisterForm = document.getElementById("registerUser");

userRegisterForm.addEventListener("submit", function (e) {
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
});

const createPlayer = async (id, name) => {
  const player = {
    PlayerId: id,
    Name: name,
  };
  fetch("http://localhost:5114/api/player", {
    method: "POST",
    body: JSON.stringify(player),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status == 200) {
      document.getElementById("RegisterResponse").innerText = "Player created!";
      document.getElementById("registerFormDiv").hidden = true;
    }
  });
};

const getItems = () => {
  fetch("http://localhost:5114/api/item")
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("items", JSON.stringify(resBody)));
};

const getSpells = () => {
  fetch("http://localhost:5114/api/spell")
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("spells", JSON.stringify(resBody)));
};

const getEnemies = () => {
  fetch("http://localhost:5114/api/enemy")
    .then((res) => res.json())
    .then((resBody) =>
      localStorage.setItem("enemies", JSON.stringify(resBody))
    );
};

const getRooms = () => {
  fetch("http://localhost:5114/api/room")
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("rooms", JSON.stringify(resBody)));
};
const userLoginForm = document.getElementById("loginUser");

userLoginForm.addEventListener("submit", function (e) {
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
          displayedLoginInfo.innerText = "Login successful! Start fight by pressing the \"To fight screen\" button below.";
          localStorage.setItem("currentAccount", JSON.stringify(resBody));
          document.getElementById("toFightScreen").hidden = false;
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
});

const logout = () => {
  localStorage.clear();
};

// window.onload = async () => {
//   let leftCardArt = await fetch(
//     "https://api.scryfall.com/cards/named?fuzzy=end-the-festivities"
//   )
//     .then((res) => res.json())
//     .then((resBody) => resBody.image_uris.art_crop);
//   document.getElementById();
// };
