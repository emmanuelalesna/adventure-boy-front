import { urlBoy, playerEndpoint } from "./url.json";

const createPlayerRequest = async (id: number, name: string) => {
  if (id && name) {
    return fetch(urlBoy + playerEndpoint, {
      method: "POST",
      body: JSON.stringify({ PlayerId: id, Name: name }),
      headers: {
        "Content-type": "application/json",
      },
    })
  } else {
    throw new Error("incomplete information")
  }
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

export { createPlayerRequest, updatePlayer };
