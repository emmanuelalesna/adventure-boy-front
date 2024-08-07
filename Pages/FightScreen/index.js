const logout = () => {
  localStorage.clear();
  window.location.href = "../LoginRegisterScreen/index.html";
};

async function getEnemy() {
  const currentRoom = JSON.parse(localStorage.getItem("currentAccount"))
    .ownedPlayer.currentRoom;
  const enemy = await fetch("http://localhost:5114/api/enemy/" + currentRoom)
    .then((res) => res.json())
    .then((resbody) => resbody);
  localStorage.setItem("enemy", JSON.stringify(enemy));
  let cardArt = await fetch(enemy.imageUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.getElementById("enemyphoto").src = cardArt;
  // document.body.style.backgroundImage = `url(${cardArt})`;
}
let spells = [];
async function getSpells() {
  spells = await fetch("http://localhost:5114/api/spell/")
    .then((res) => res.json())
    .then((resbody) => resbody);
}
let items = [];
async function getItems() {
  items = await fetch("http://localhost:5114/api/item/")
    .then((res) => res.json())
    .then((resbody) => resbody);
}

async function getRoomArt() {
  const currentRoom = JSON.parse(localStorage.getItem("currentAccount"))
    .ownedPlayer.currentRoom;
  const roomUrl = await fetch("http://localhost:5114/api/room/" + currentRoom)
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(roomUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  // document.getElementById("card_art").src = cardArt;
  document.body.style.backgroundImage = `url(${cardArt})`;
}

let enemyDefend = false;
const enemyAction = (playerStance) => {
  const action = Math.floor(Math.random() * 3);
  switch (action) {
    case 0:
      // attack
      if (!playerStance) {
        player.Health -= enemy.Attack;
      }
      break;
    case 1:
      // defend
      enemyDefend = true;
      break;
    case 2:
      // charge attack
      break;
    default:
      break;
  }
};

const playerAction = (action) => {
  switch (action) {
    case 0:
      // attack item
      if (!enemyDefend) {
        enemy.Health -= 1;
      }
      break;
    case 1:
      // attack lightning bolt
      if (!enemyDefend) {
        enemy.Health -= 2;
      }
      break;
    case 2:
      // defend
      break;
    default:
      break;
  }
};
const sword = () => {};
const spell = () => {};
const defend = () => {};
let enemy = JSON.parse(localStorage.getItem("enemy"));
let player = JSON.parse(localStorage.getItem("currentAccount")).ownedPlayer;
const setUpFight = () => {
  getEnemy();
  getRoomArt();
  getItems();
  getSpells();
};
