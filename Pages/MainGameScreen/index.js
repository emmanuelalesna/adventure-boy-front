let currentPlayer = null;

function getPlayer() {
  fetch("http://localhost:5114/api/player")
    .then((res) => res.json())
    .then((resBody) => (currentPlayer = resBody));
  let playerInfo = document.getElementById("PlayerInfo");
  playerInfo.innerText = currentPlayer;
}
