const getItems = () => {
  fetch("http://localhost:5114/api/item")
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("items", JSON.stringify(resBody)));
};

const getSpells = () => {
  fetch("http://localhost:5114/api/spell")
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("spells", JSON.stringify(resBody)));
};

const getEnemies = () => {
  fetch("http://localhost:5114/api/enemy")
    .then((res) => res.json())
    .then((resBody) =>
      localStorage.setItem("enemies", JSON.stringify(resBody))
    );
};
const getRooms = () => {
  fetch("http://localhost:5114/api/room")
    .then((res) => res.json())
    .then((resBody) => localStorage.setItem("rooms", JSON.stringify(resBody)));
};

async function getEnemyArt(roomNumber) {
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

export { getItems, getSpells, getEnemies, getRooms, getEnemyArt, getRoomArt };
