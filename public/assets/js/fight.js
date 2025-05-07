import {
  setUpFight,
  logoutAndSavePlayer,
  playerAction,
} from "./fightMethods.js";

document
  .getElementById("startFightButton")
  .addEventListener("click", setUpFight);

document
  .getElementById("logoutButton")
  .addEventListener("click", logoutAndSavePlayer);

document.getElementById("swordButton").addEventListener("click", playerAction);
document.getElementById("spellButton").addEventListener("click", playerAction);
document.getElementById("shieldButton").addEventListener("click", playerAction);
