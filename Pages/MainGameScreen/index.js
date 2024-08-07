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
