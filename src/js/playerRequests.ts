import type { Player } from "./Player";
import { urlBoy, playerEndpoint } from "./url.json";

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

const createPlayerRequest = async (player: Player) => {
  const { AccountId, Name, CurrentHealth, CurrentMana } = player;
  if (AccountId && Name && token) {
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
        Authorization: "Bearer " + JSON.parse(token).accessToken,
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

const getPlayer = async (playerId: string) => {
  if (token && id) {
    const params = new URLSearchParams().append("playerId", playerId);
    return fetch(urlBoy + playerEndpoint + id + `?${params}`, {
      headers: { Authorization: "Bearer " + JSON.parse(token).accessToken },
    });
  } else {
    throw new Error("token and/or id is missing");
  }
};

const getPlayers = async () => {
  if (token && id) {
    return fetch(urlBoy + playerEndpoint + id + "/all", {
      headers: {
        Authorization: "Bearer " + JSON.parse(token).accessToken,
      },
    });
  } else {
    throw new Error("token and/or id is missing");
  }
};

export { createPlayerRequest, updatePlayer, getPlayer, getPlayers };
