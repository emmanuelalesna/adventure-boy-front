import type { Player } from "./Player";
import {
  createPlayerRequest,
  deletePlayerRequest,
  getPlayers,
  updatePlayerRequest,
} from "./playerRequests";

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
      <tr id=row${player.playerId}>
        <td>${player.playerId}</td>
        <td id=name${player.playerId}>${player.name}</td>
        <td>${player.currentHealth}</td>
        <td>${player.currentMana}</td>
        <td>${player.currentRoom}</td>
        <td><button id=select${player.playerId}>Select</button></td>
        <td><button id=edit${player.playerId}>Edit</button></td>
        <td><button id=delete${player.playerId}>Delete</button></td>
      </tr>
  `
    );
  document
    .getElementById("select" + player.playerId!.toString())
    ?.addEventListener("click", function () {
      localStorage.setItem("player", JSON.stringify(player));
      changePlayerText(player.playerId!);
    });

  document
    .getElementById("delete" + player.playerId!.toString())
    ?.addEventListener("click", function () {
      deletePlayer(player.playerId!);
      document.getElementById(`row${player.playerId}`)!.hidden = true;
    });

  document
    .getElementById("edit" + player.playerId!.toString())
    ?.addEventListener("click", function () {
      document.getElementById("newNameForm")!.hidden = false;
      (document.getElementById("playerId") as HTMLInputElement).value =
        player.playerId!.toString();
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

const editPlayer = async (e: any) => {
  e.preventDefault();
  const playerId = e.target.elements[0].value;
  const name = e.target.elements[1].value;
  try {
    const updatePlayer = await updatePlayerRequest(playerId, name);
    if (updatePlayer.ok) {
      document.getElementById("newNameForm")!.hidden = true;
      document.getElementById("name" + playerId)!.innerText = name;
    } else {
      throw new Error(`${updatePlayer.status}: ${updatePlayer.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const deletePlayer = async (playerId: number) => {
  try {
    const deletePlayer = await deletePlayerRequest(playerId);
    if (deletePlayer.ok) {
      document.getElementById(
        "playerText"
      )!.innerText = `Player ${playerId} has been deleted.`;
    } else {
      throw new Error(`${deletePlayer.status}: ${deletePlayer.statusText}`);
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

document.getElementById("newNameForm")?.addEventListener("submit", editPlayer);
