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

const createPlayer = async (e: any) => {
  e.preventDefault();

  let role;
  switch (e.target.elements[1].value) {
    case "mage":
      role = mage;
      break;
    case "rogue":
      role = rogue;
      break;
    default:
      role = warrior;
  }
  const player: Player = {
    AccountId: localStorage.getItem("id")!,
    Name: e.target.elements[0].value,
    CurrentHealth: role.health,
    CurrentMana: role.mana,
  };

  try {
    const createPlayer = await createPlayerRequest(player);
    if (createPlayer.ok) {
      const resBody = await createPlayer.json();
      const playerTable = document.getElementById("playerTable");
      if (playerTable)
        playerTable.innerHTML += `
      <tr>
        <td>${resBody.playerId}</td>
        <td>${resBody.name}</td>
        <td>${resBody.currentHealth}</td>
        <td>${resBody.currentMana}</td>
        <td>${resBody.currentRoom}</td>
        <td><button>Edit</button></td>
        <td><button>Select</button></td>
      </tr>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("createPlayer")
  ?.addEventListener("submit", createPlayer);

const loadPlayers = async () => {
  try {
    const res = await getPlayers();
    if (res.ok) {
      const resBody = await res.json();
      for (const element of resBody) {
        const playerTable = document.getElementById("playerTable");
        if (playerTable)
          playerTable.innerHTML += `
      <tr>
        <td>${element.playerId}</td>
        <td>${element.name}</td>
        <td>${element.currentHealth}</td>
        <td>${element.currentMana}</td>
        <td>${element.currentRoom}</td>
        <td><button>Edit</button></td>
        <td><button>Select</button></td>
      </tr>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = loadPlayers;
