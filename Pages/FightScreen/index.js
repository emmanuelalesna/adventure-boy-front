async function getEnemyArt(roomNumber) {
  const enemy = await fetch(
    "http://localhost:5114/api/enemy/" + (roomNumber + 1)
  )
    .then((res) => res.json())
    .then((resbody) => resbody);
  let cardArt = await fetch(enemy.imageUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.getElementById("enemyphoto").src = cardArt;
}

async function getEnemyArtAwait(roomNumber) {
  let enemy = await fetch(
    "http://localhost:5114/api/enemy/" + (roomNumber + 1)
  );
  enemy = await enemy.json();
  let cardArt = await fetch(enemy.imageUrl);
  cardArt = (await cardArt.json()).image_uris.art_crop;
  document.getElementById("enemyphoto").src = cardArt;
}

async function getRoomArt(roomNumber) {
  const roomUrl = await fetch(
    "http://localhost:5114/api/room/" + (roomNumber + 1)
  )
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(roomUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.body.style.backgroundImage = `url(${cardArt})`;
}

let player = JSON.parse(localStorage.getItem("currentAccount")).ownedPlayer;
let roomNumber = player.currentRoom - 1;
let currentRoom, currentEnemy, currentItem, currentSpell;
let combatState = true;
let enemyDefend = false;
let enemyStrong = false;

const setUpFight = () => {
  if (roomNumber <= 4) {
    clearCombatInfo();
    getEnemyArtAwait(roomNumber);
    getRoomArt(roomNumber);
    setCurrentRoom(roomNumber);
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

const enemyActionNew = (playerStance) => {
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

const playerAction = (action) => {
  let defend = false;
  if (action == "sword") {
    newCombatInfo("You swing your sword!");
    if (!enemyDefend) {
      currentEnemy.health -= currentItem.attack;
      newCombatInfo(`You do ${currentItem.attack} damage!`);
    } else {
      newCombatInfo(`The enemy blocks!`);
    }
  } else if (action == "spell") {
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
  } else if (action == "shield") {
    newCombatInfo("You raise your shield!");
    defend = true;
  }
  newCombatInfo(`The enemy has ${currentEnemy.health} health remaining.`);
  if (!endCombat()) {
    enemyActionNew(defend);
  }
};

const setCurrentRoom = (room) => {
  currentRoom = JSON.parse(localStorage.getItem("rooms"))[room];
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

const newCombatInfo = (text) => {
  let newInfo = document.createElement("p");
  newInfo.innerText = text;
  let toAppend = document.getElementById("textbox");
  toAppend.appendChild(newInfo);
};

const clearCombatInfo = () => {
  let element = document.getElementById("textbox");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
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
        await updatePlayer(player.playerId, 1, 10, 1);
      } else {
        player.currentHealth += roomNumber;
        player.currentMana += roomNumber;
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
      await updatePlayer(player.playerId, 1, 10, 1);
    }
    document.getElementById("actions").hidden = true;
    document.getElementById("startFightButton").hidden = false;
    return true;
  }
  return false;
};

const updatePlayer = async (id, room, health, mana) => {
  const player = {
    PlayerId: id,
    Name: "random",
    CurrentRoom: room,
    CurrentHealth: health,
    CurrentMana: mana,
  };
  let req = fetch("http://localhost:5114/api/player", {
    method: "PATCH",
    body: JSON.stringify(player),
    headers: {
      "Content-type": "application/json",
    },
  });
  let res = await req;
};

const logout = async () => {
  await updatePlayer(
    player.playerId,
    roomNumber + 1,
    player.currentHealth,
    player.currentMana
  );
  localStorage.clear();
  window.location.href = "../LoginRegisterScreen/index.html";
};

//TODO: implement mana, save user data, add item and spell images, better integrate enemy/item names
