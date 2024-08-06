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
          displayedLoginInfo.innerText = JSON.stringify(resBody);
        } else {
          let displayedLoginInfo = document.getElementById("LoginResponse");
          displayedLoginInfo.innerText = "Incorrect Password!";
        }
      }
    });
});
