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
      let displayedLoginInfo = document.getElementById("RegisterResponse");
      displayedLoginInfo.innerText = JSON.stringify(resBody);
    });
});
