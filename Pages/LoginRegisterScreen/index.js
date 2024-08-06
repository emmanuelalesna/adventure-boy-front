const userLoginForm = document.getElementById("loginUser");

userLoginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let serverResponse;

  const newUser = {
    Username: e.target.elements["usernameLogin"].value,
    Password: e.target.elements["passwordLogin"].value,
  };

  fetch("http://localhost:5114/api/account", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((resBody) => (serverResponse = resBody));
  let displayedLoginInfo = document.getElementById("loginResponse");
  displayedLoginInfo.innerText = serverResponse;
});
