import type { Player } from "./Player";
import { urlBoy, playerEndpoint } from "./url.json";

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

const createPlayerRequest = async (player: Player) => {
  const { accountId, name, currentHealth, currentMana } = player;
  if (accountId && name && token) {
    return fetch(urlBoy + playerEndpoint, {
      method: "POST",
      body: JSON.stringify({
        accountId,
        name,
        currentHealth,
        currentMana,
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

const updatePlayerRequest = async (playerId: number, name: string) => {
  if (token && id) {
    const params = new URLSearchParams({ name: name });
    return fetch(urlBoy + playerEndpoint + playerId + `?${params}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + JSON.parse(token).accessToken,
      },
    });
  } else {
    throw new Error("token and/or id is missing");
  }
};

const getPlayer = async (playerId: string) => {
  if (token && id) {
    const params = new URLSearchParams({ playerId: playerId });
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

const deletePlayerRequest = async (playerId: number) => {
  if (token && id) {
    return fetch(urlBoy + playerEndpoint + playerId, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + JSON.parse(token).accessToken },
    });
  } else {
    throw new Error("token and/or id is missing");
  }
};

export {
  createPlayerRequest,
  updatePlayerRequest,
  getPlayer,
  getPlayers,
  deletePlayerRequest,
};
