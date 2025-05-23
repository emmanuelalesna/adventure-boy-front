import type { Player } from "./Player";
import { urlBoy, playerEndpoint } from "./url.json";

const createPlayerRequest = async (player: Player) => {
  const { AccountId, Name, CurrentHealth, CurrentMana } = player;
  if (AccountId && Name) {
    return fetch(urlBoy + playerEndpoint, {
      method: "POST",
      body: JSON.stringify({
        AccountId,
        Name,
        CurrentHealth,
        CurrentMana,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  } else {
    throw new Error("Player ID and name is required");
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
