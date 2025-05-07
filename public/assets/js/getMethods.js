import apiUrl from "./url.js";

const { urlBoy, itemEndpoint, spellEndpoint, enemyEndpoint, roomEndpoint } =
  apiUrl;

const getItems = () => {
  fetch(urlBoy + itemEndpoint)
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("items", JSON.stringify(resBody)));
};

const getSpells = () => {
  fetch(urlBoy + spellEndpoint)
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("spells", JSON.stringify(resBody)));
};

const getEnemies = () => {
  fetch(urlBoy + enemyEndpoint)
    .then((res) => res.json())
    .then((resBody) =>
      localStorage.setItem("enemies", JSON.stringify(resBody))
    );
};
const getRooms = () => {
  fetch(urlBoy + roomEndpoint)
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("rooms", JSON.stringify(resBody)));
};

async function getEnemyArt(roomNumber) {
  let enemy = await fetch(urlBoy + enemyEndpoint + (roomNumber + 1));
  enemy = await enemy.json();
  let cardArt = await fetch(enemy.imageUrl);
  cardArt = (await cardArt.json()).image_uris.art_crop;
  document.getElementById("enemyphoto").src = cardArt;
}

async function getRoomArt(roomNumber) {
  const roomUrl = await fetch(urlBoy + roomEndpoint + (roomNumber + 1))
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(roomUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.getElementById("roomphoto").src = cardArt;
}

async function getItemArt(roomNumber) {
  const itemUrl = await fetch(urlBoy + itemEndpoint + (roomNumber + 1))
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(itemUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.getElementById("playeritemphoto").src = cardArt;
}

async function getSpellArt(roomNumber) {
  const spellUrl = await fetch(urlBoy + spellEndpoint + (roomNumber + 1))
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(spellUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.getElementById("playerspellphoto").src = cardArt;
}

export {
  getItems,
  getSpells,
  getEnemies,
  getRooms,
  getEnemyArt,
  getRoomArt,
  getItemArt,
  getSpellArt,
};
