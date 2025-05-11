import {
  urlBoy,
  itemEndpoint,
  spellEndpoint,
  enemyEndpoint,
  roomEndpoint,
} from "./url.json";

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

async function getEnemyArt(roomNumber: number) {
  const enemy = await fetch(urlBoy + enemyEndpoint + (roomNumber + 1));
  let enemyBody = await enemy.json();
  let cardArt = await fetch(enemyBody.imageUrl);
  let cardArtBody = (await cardArt.json()).image_uris.art_crop;
  const enemyPhoto = document.getElementById("enemyphoto") as HTMLImageElement;
  enemyPhoto.src = cardArtBody;
}

async function getRoomArt(roomNumber: number) {
  const roomUrl = await fetch(urlBoy + roomEndpoint + (roomNumber + 1))
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(roomUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  const roomPhoto = document.getElementById("roomphoto") as HTMLImageElement;
  roomPhoto.src = cardArt;
}

async function getItemArt(roomNumber: number) {
  const itemUrl = await fetch(urlBoy + itemEndpoint + (roomNumber + 1))
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(itemUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  const playerItemPhoto = document.getElementById(
    "playeritemphoto"
  ) as HTMLImageElement;
  playerItemPhoto.src = cardArt;
}

async function getSpellArt(roomNumber: number) {
  const spellUrl = await fetch(urlBoy + spellEndpoint + (roomNumber + 1))
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(spellUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  const playerSpellPhoto = document.getElementById(
    "playerspellphoto"
  ) as HTMLImageElement;
  playerSpellPhoto.src = cardArt;
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
