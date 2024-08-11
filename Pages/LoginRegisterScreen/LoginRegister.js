import { registerUser, loginUser, logoutUser } from "./loginRegisterMethods.js";

document.getElementById("logoutButton").addEventListener("click", logoutUser);

document
  .getElementById("registerUser")
  .addEventListener("submit", registerUser);

document.getElementById("loginUser").addEventListener("submit", loginUser);
