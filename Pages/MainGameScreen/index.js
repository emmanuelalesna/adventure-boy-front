let currentPlayer = null;

async function getPlayer() {
  await fetch("http://localhost:5114/api/player/1")
    .then((res) => res.json())
    .then((resBody) => (currentPlayer = resBody));
  let playerInfo = document.getElementById("PlayerInfo");
  playerInfo.innerText = currentPlayer.name;
}

async function getRoom() {
  const roomUrl = await fetch("http://localhost:5114/api/room/-1")
    .then((res) => res.json())
    .then((resbody) => resbody.imageUrl);
  let cardArt = await fetch(roomUrl)
    .then((res) => res.json())
    .then((resBody) => resBody.image_uris.art_crop);
  document.getElementById("card_art").src = cardArt;
  // document.body.style.backgroundImage = `url(${cardArt})`
}
