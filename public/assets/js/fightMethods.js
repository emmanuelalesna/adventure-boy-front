import * as getMethods from "./getMethods.js";
import { updatePlayer } from "./playerMethods.js";

let player = JSON.parse(localStorage.getItem("currentAccount")).ownedPlayer;
let roomNumber = player.currentRoom;
let currentEnemy, currentItem, currentSpell;
let enemyDefend = false;
let enemyStrong = false;

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
  document.getElementById("actions").hidden = false;
  document.getElementById("startFightButton").hidden = true;
};

const enemyAction = (playerStance) => {
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

const playerAction = async (e) => {
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
    document.getElementById("actions").hidden = true;
    document.getElementById("startFightButton").hidden = false;
    return true;
  }
  return false;
};

const newCombatInfo = (text) => {
  let newInfo = document.createElement("p");
  newInfo.innerText = text;
  let toAppend = document.getElementById("textbox");
  toAppend.appendChild(newInfo);
  toAppend.scrollTop = toAppend.scrollHeight;
};

const clearCombatInfo = () => {
  let element = document.getElementById("textbox");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const setCurrentEnemy = (room) => {
  currentEnemy = JSON.parse(localStorage.getItem("enemies"))[room];
};
const setCurrentItem = (room) => {
  currentItem = JSON.parse(localStorage.getItem("items"))[room];
};
const setCurrentSpell = (room) => {
  currentSpell = JSON.parse(localStorage.getItem("spells"))[room];
};

const getItem = (room) => {
  return JSON.parse(localStorage.getItem("items"))[room];
};
const getSpell = (room) => {
  return JSON.parse(localStorage.getItem("spells"))[room];
};

const logoutAndSavePlayer = async () => {
  await updatePlayer(
    player.playerId,
    roomNumber,
    player.currentHealth,
    player.currentMana
  );
  localStorage.clear();
  window.location.href = "../LoginRegisterScreen/index.html";
};

export { setUpFight, logoutAndSavePlayer, playerAction };
