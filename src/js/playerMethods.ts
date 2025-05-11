import { urlBoy, playerEndpoint } from "./url.json";

const createPlayer = async (id: number, name: string) => {
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
      let RegisterResponse = document.getElementById("RegisterResponse");
      if (RegisterResponse) RegisterResponse.innerText = "Player created!";
    }
  });
};

const updatePlayer = async (
  id: number,
  room: number,
  health: number,
  mana: number
) => {
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
