const logout = () => {
  localStorage.clear();
  window.location.href = "../LoginRegisterScreen/index.html";
};

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
    getEnemyArt(roomNumber);
    getRoomArt(roomNumber);
    newCombatInfo("The fight begins!");
    setCurrentRoom(roomNumber);
    setCurrentEnemy(roomNumber);
    setCurrentItem(roomNumber);
    setCurrentSpell(roomNumber);
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
  newCombatInfo(`You have ${player.currentHealth} health remaining.`);
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
    newCombatInfo("You cast a spell!");
    if (!enemyDefend) {
      currentEnemy.health -= currentSpell.attack;
      newCombatInfo(`You do ${currentSpell.attack} damage!`);
    } else {
      newCombatInfo(`The enemy blocks!`);
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

const endCombat = () => {
  if (player.currentHealth <= 0 || currentEnemy.health <= 0) {
    if (currentEnemy.health <= 0) {
      newCombatInfo(`You defeated the ${currentEnemy.enemyName}!`);
      roomNumber++;
      if (roomNumber > 4) {
        newCombatInfo("You win!");
        player.currentHealth = 10;
      } else {
        player.currentHealth += roomNumber;
      }
    } else {
      roomNumber = 0;
      newCombatInfo("You died!");
      player.currentHealth = 10;
    }
    document.getElementById("actions").hidden = true;
    document.getElementById("startFightButton").hidden = false;
    return true;
  }
  return false;
};

//TODO: implement mana, save user data, add item and spell images, better integrate enemy/item names
