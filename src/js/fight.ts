import fight_bg from "../assets/fight_bg.jpg";

import {
  setUpFight,
  logoutAndSavePlayer,
  playerAction,
} from "./fightMethods.js";

const fightButton = document.getElementById("startFightButton");
if (fightButton) {
  fightButton.addEventListener("click", setUpFight);
}

const loginButton = document.getElementById("logoutButton");
if (loginButton) {
  loginButton.addEventListener("click", logoutAndSavePlayer);
}

const swordButton = document.getElementById("swordButton");
if (swordButton) {
  swordButton.addEventListener("click", playerAction);
}

const spellButton = document.getElementById("spellButton");
if (spellButton) {
  spellButton.addEventListener("click", playerAction);
}

const shieldButton = document.getElementById("shieldButton");
if (shieldButton) {
  shieldButton.addEventListener("click", playerAction);
}

document.body.style.backgroundImage = `url("${fight_bg}")`