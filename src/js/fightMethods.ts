import * as getMethods from "./getMethods.ts";
import { updatePlayer } from "./playerRequests.ts";

const currentAccount = localStorage.getItem("currentAccount");
const player = currentAccount ? JSON.parse(currentAccount).ownedPlayer : null;
let roomNumber = player.currentRoom;
let currentEnemy: { enemyName: any; health: number; attack: number },
  currentItem: { itemName: any; attack: number },
  currentSpell: { spellName: any; attack: number; manaCost: number };
let enemyDefend = false;
let enemyStrong = false;
const actions = document.getElementById("actions");
const startFightButton = document.getElementById("startFightButton");

const setUpFight = () => {
  if (roomNumber <= 4) {
    clearCombatInfo();
    getMethods.getEnemyArt(roomNumber);
    getMethods.getRoomArt(roomNumber);
    getMethods.getItemArt(roomNumber);
    getMethods.getSpellArt(roomNumber);
    setCurrentEnemy(roomNumber);
    setCurrentItem(roomNumber);
    setCurrentSpell(roomNumber);
    newCombatInfo("The fight begins!");
    newCombatInfo(
      `You have ${player.currentHealth} health and ${player.currentMana} mana. The enemy ${currentEnemy.enemyName} appears to have ${currentEnemy.health} health and be capable of doing ${currentEnemy.attack} damage per attack.`
    );
    newCombatInfo(
      `You are equipped with a ${currentItem.itemName} capable of doing ${currentItem.attack} damage, and the spell ${currentSpell.spellName} that does ${currentSpell.attack} damage and costs ${currentSpell.manaCost} mana per cast.`
    );
  }
  if (actions) {
    actions.hidden = false;
  }
  if (startFightButton) {
    startFightButton.hidden = false;
  }
};

const enemyAction = (playerStance: boolean) => {
  const action = Math.floor(Math.random() * 3);
  if (action == 0) {
    newCombatInfo("The enemy attacks...");
    if (!playerStance) {
      if (enemyStrong) {
        newCombatInfo(
          `and you take a devastating blow, receiving ${
            currentEnemy.attack * 2
          } damage!`
        );
        player.currentHealth -= currentEnemy.attack * 2;
      } else {
        newCombatInfo(`and you take ${currentEnemy.attack} damage!`);
        player.currentHealth -= currentEnemy.attack;
      }
    } else {
      newCombatInfo("but you manage to block and take no damage!");
    }
    enemyStrong = false;
    enemyDefend = false;
  } else if (action == 1) {
    newCombatInfo("The enemy takes a defensive stance!");
    enemyStrong = false;
    enemyDefend = true;
  } else if (action == 2) {
    newCombatInfo("The enemy appears to be saving its strength!");
    enemyDefend = false;
    enemyStrong = true;
  }
  newCombatInfo(
    `You have ${player.currentHealth} health and ${player.currentMana} mana remaining.`
  );
  endCombat();
};

const playerAction = async (e: any) => {
  let defend = false;
  const action = e.target.id;
  if (action == "swordButton") {
    newCombatInfo("You swing your sword!");
    if (!enemyDefend) {
      currentEnemy.health -= currentItem.attack;
      newCombatInfo(`You do ${currentItem.attack} damage!`);
    } else {
      newCombatInfo(`The enemy blocks!`);
    }
  } else if (action == "spellButton") {
    newCombatInfo("You cast a spell...");
    if (player.currentMana - currentSpell.manaCost < 0) {
      player.currentMana = 0;
      newCombatInfo("but it fizzles out! You don't have enough mana!");
    } else {
      player.currentMana -= currentSpell.manaCost;
      if (!enemyDefend) {
        currentEnemy.health -= currentSpell.attack;
        newCombatInfo(`and do ${currentSpell.attack} damage!`);
      } else {
        newCombatInfo(`but the enemy blocks!`);
      }
    }
  } else if (action == "shieldButton") {
    newCombatInfo("You raise your shield!");
    defend = true;
  }
  newCombatInfo(`The enemy has ${currentEnemy.health} health remaining.`);
  var combatValid = await endCombat();
  if (!combatValid) {
    enemyAction(defend);
  }
};

const endCombat = async () => {
  if (player.currentHealth <= 0 || currentEnemy.health <= 0) {
    if (currentEnemy.health <= 0) {
      newCombatInfo(`You defeated the ${currentEnemy.enemyName}!`);
      roomNumber++;
      if (roomNumber > 4) {
        // player wins
        player.currentHealth = 10;
        player.currentMana = 1;
        roomNumber = 0;
        newCombatInfo("You win!");
        await updatePlayer(player.playerId, 0, 10, 1);
      } else {
        player.currentHealth += roomNumber + 1;
        player.currentMana += roomNumber + 1;
        newCombatInfo(
          `You find a ${getItem(roomNumber).itemName} and a spellbook for ${
            getSpell(roomNumber).spellName
          } on your vanquished foe's corpse. The adrenaline of winning the fight restores you to ${
            player.currentHealth
          } health and ${player.currentMana} mana.`
        );
      }
    } else {
      // player dies
      newCombatInfo(
        `The ${currentEnemy.enemyName}'s strike rings true, and you stagger backwards. As you slump to the ground for your final rest, your last thought is of what you could've done differently to prevent this outcome.`
      );
      player.currentHealth = 10;
      player.currentMana = 1;
      roomNumber = 0;
      await updatePlayer(player.playerId, 0, 10, 1);
    }
    enemyStrong = false;
    if (actions) {
      actions.hidden = true;
    }
    if (startFightButton) {
      startFightButton.hidden = false;
    }
    return true;
  }
  return false;
};

const newCombatInfo = (text: string) => {
  let newInfo = document.createElement("p");
  newInfo.innerText = text;
  const toAppend = document.getElementById("textbox");
  if (toAppend) {
    toAppend.appendChild(newInfo);
    toAppend.scrollTop = toAppend.scrollHeight;
  }
};

const clearCombatInfo = () => {
  let element = document.getElementById("textbox");
  while (element && element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const setCurrentEnemy = (room: string | number) => {
  currentEnemy = JSON.parse(localStorage.getItem("enemies") || "null")[room];
};
const setCurrentItem = (room: string | number) => {
  currentItem = JSON.parse(localStorage.getItem("items") || "null")[room];
};
const setCurrentSpell = (room: string | number) => {
  currentSpell = JSON.parse(localStorage.getItem("spells") || "null")[room];
};

const getItem = (room: string | number) => {
  return JSON.parse(localStorage.getItem("items") || "null")[room];
};
const getSpell = (room: string | number) => {
  return JSON.parse(localStorage.getItem("spells") || "null")[room];
};

const savePlayer = async () => {
  await updatePlayer(
    player.playerId,
    roomNumber,
    player.currentHealth,
    player.currentMana
  );
};

export { setUpFight, savePlayer, playerAction };
