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
      let displayedRegisterInfo = document.getElementById("RegisterResponse");
      displayedRegisterInfo.innerText = JSON.stringify(resBody);
    });
});

const userLoginForm = document.getElementById("loginUser");

userLoginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let checkLogin;

  const loginUser = {
    Username: e.target.elements["usernameLogin"],
    Password: e.target.elements["passwordLogin"],
  };

  fetch(
    "http://localhost:5114/api/account/" + e.target.elements["usernameLogin"]
  )
    .then((res) => res.json())
    .then((resBody) => (checkLogin = resBody));

  if (checkLogin == null) {
    let displayedLoginInfo = document.getElementById("LoginResponse");
    displayedLoginInfo.innerText = "Incorrect Username!";
  }

  if (checkLogin.Password == e.target.elements["passwordLogin"]) {
    let displayedLoginInfo = document.getElementById("LoginResponse");
    displayedLoginInfo.innerText = JSON.stringify(checkLogin);
  } else {
    let displayedLoginInfo = document.getElementById("LoginResponse");
    displayedLoginInfo.innerText = "Incorrect Password!";
  }
});
