const logout = () => {
  localStorage.clear();
  window.location.href = "../LoginRegisterScreen/index.html";
};

async function getEnemy() {
  const currentRoom = JSON.parse(localStorage.getItem("currentAccount")).ownedPlayer.currentRoom;
  const enemy = await fetch("http://localhost:5114/api/enemy/" + currentRoom)
    .then((res) => res.json())
    .then((resbody) => resbody);
  localStorage.setItem("enemy", JSON.stringify(enemy));
  let cardArt = await fetch(enemy.imageUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  // document.getElementById("card_art").src = cardArt;
  document.body.style.backgroundImage = `url(${cardArt})`
}

async function getRoomArt() {
  const currentRoom = JSON.parse(localStorage.getItem("currentAccount")).ownedPlayer.currentRoom;
  const roomUrl = await fetch("http://localhost:5114/api/room/" + currentRoom)
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(roomUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  // document.getElementById("card_art").src = cardArt;
  document.body.style.backgroundImage = `url(${cardArt})`
}