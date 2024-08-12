/**
 * @jest-environment jsdom
 */
// const elementMock = { addEventListener: jest.fn() };
// const warn = jest
//   .spyOn(document, "getElementById")
//   .mockImplementation(() => elementMock);

// import { createPlayer } from "../LoginRegisterScreen/index.js";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     status: 200,
//   })
// );

// describe("Login/Register Tests", () => {
//   test("Register", () => {
//     createPlayer(9, "UserA");
//   });
// });

// import { logoutUser } from "./Pages/LoginRegisterScreen/loginRegisterMethods.js";

// global.fetch = jest.fn()

// jest.mock('./')
import '@testing-library/jest-dom';

test("Check logoutUser", () => {
  document.body.innerHTML = `<button id="logoutButton">Logout</button>
  <button id="registerUser">Register</button>
  <button id="loginUser">Login</button>`;
  require("./Pages/LoginRegisterScreen/LoginRegister.js");
  const newLogoutButton = document.getElementById("logoutButton");
  localStorage.setItem("currentAccount", "1");
  localStorage.setItem("items", "1");
  newLogoutButton.click();
  expect(localStorage.getItem("currentAccount")).toBe(null);
  expect(localStorage.getItem("items")).toBe(null);
});

// test("Check logoutUser", () => {
//   document.body.innerHTML = `<button id="logoutButton">Logout</button>`;
//   require("./Pages/LoginRegisterScreen/fight.js");
//   const newLogoutButton = document.getElementById("logoutButton");
//   newLogoutButton.click();
//   expect(localStorage.getItem("currentAccount")).toBe(null);
//   expect(localStorage.getItem("items")).toBe(null);
// });
