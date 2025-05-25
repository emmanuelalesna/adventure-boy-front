import type { Player } from "./Player";
import { createPlayerRequest, getPlayers } from "./playerRequests";

const mage = {
  health: 5,
  mana: 5,
};

const warrior = {
  health: 10,
  mana: 1,
};

const rogue = {
  health: 7,
  mana: 2,
};

const addToTable = (player: Player) => {
  const playerTable = document.getElementById("playerTable");
  if (playerTable)
    playerTable.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${player.playerId}</td>
        <td>${player.name}</td>
        <td>${player.currentHealth}</td>
        <td>${player.currentMana}</td>
        <td>${player.currentRoom}</td>
        <td><button>Edit</button></td>
        <td><button class="select" id=${player.playerId}>Select</button></td>
      </tr>
  `
    );
  document
    .getElementById(player.playerId!.toString())
    ?.addEventListener("click", function () {
      localStorage.setItem("player", JSON.stringify(player));
      changePlayerText(player.playerId!);
    });
};

const loadPlayers = async () => {
  try {
    const playersRes = await getPlayers();
    if (playersRes.ok) {
      const players = await playersRes.json();
      for (const element of players) {
        addToTable(element);
      }
    } else {
      throw new Error(`${playersRes.status}: ${playersRes.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const createPlayer = async (e: any) => {
  e.preventDefault();
  let role = warrior;
  switch (e.target.elements[1].value) {
    case "mage":
      role = mage;
      break;
    case "rogue":
      role = rogue;
      break;
  }
  const player: Player = {
    accountId: localStorage.getItem("id")!,
    name: e.target.elements[0].value,
    currentHealth: role.health,
    currentMana: role.mana,
  };

  try {
    const createPlayer = await createPlayerRequest(player);
    if (createPlayer.ok) {
      const playerRes = await createPlayer.json();
      addToTable(playerRes);
    } else {
      throw new Error(`${createPlayer.status}: ${createPlayer.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const startAdventure = () => {
  if (localStorage.getItem("player")) {
    window.location.href = "../fight.html";
  } else {
    alert("Please choose an adventurer before proceeding.");
  }
};

const changePlayerText = (playerId: number) => {
  document.getElementById(
    "playerText"
  )!.innerText = `You chose player ${playerId}`;
};

window.onload = loadPlayers;

document
  .getElementById("createPlayer")
  ?.addEventListener("submit", createPlayer);

document
  .getElementById("startButton")
  ?.addEventListener("click", startAdventure);
