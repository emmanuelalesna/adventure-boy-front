import type { Player } from "./Player";
import { createPlayerRequest } from "./playerRequests";

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
      console.log(resBody);
    }
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("createPlayer")
  ?.addEventListener("submit", createPlayer);
