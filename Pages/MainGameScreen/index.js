let currentPlayer = null;
//will request.js

async function getPlayer() {
  await fetch("http://localhost:5114/api/player/1")
    .then((res) => res.json())
    .then((resBody) => (currentPlayer = resBody));
  let playerInfo = document.getElementById("PlayerInfo");
  playerInfo.innerText = currentPlayer.name;
}

function checkRoomIn(room) {
  switch (room) {
    case 1:
      playRoomOne();
      break;
  }
}

function playRoomOne() {
  //needs to set image to the image associated with the room
  let isPlaying = true;
  while ((isPlaying = true)) {
    let displayRoomInfo = document.getElementById("displayGameText");
    let generateContinueButtonSection = document.getElementById(
      "generateContinueTextButton"
    );
    displayRoomInfo.innerText = "You enter section 1";

    isPlaying = false;
  }
}

const continueButton = document.getElementById("");
