let currentPlayer = null;

async function getPlayer() {
  await fetch("http://localhost:5114/api/player/1")
    .then((res) => res.json())
    .then((resBody) => (currentPlayer = resBody));
  let playerInfo = document.getElementById("PlayerInfo");
  playerInfo.innerText = currentPlayer.name;
}
