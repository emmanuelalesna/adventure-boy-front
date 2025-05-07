import apiUrl from "./url.js";

const { urlBoy, playerEndpoint } = apiUrl;

const createPlayer = async (id, name) => {
  const player = {
    PlayerId: id,
    Name: name,
  };
  fetch(urlBoy + playerEndpoint, {
    method: "POST",
    body: JSON.stringify(player),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status == 200) {
      document.getElementById("RegisterResponse").innerText = "Player created!";
    }
  });
};

const updatePlayer = async (id, room, health, mana) => {
  const player = {
    PlayerId: id,
    Name: "random",
    CurrentRoom: room,
    CurrentHealth: health,
    CurrentMana: mana,
  };
  let req = fetch(urlBoy + playerEndpoint, {
    method: "PATCH",
    body: JSON.stringify(player),
    headers: {
      "Content-type": "application/json",
    },
  });
  await req;
};

export { createPlayer, updatePlayer };
