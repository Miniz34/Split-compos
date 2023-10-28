const apiUrl = "http://localhost:5000";

const FindAll = async () => {
  return await fetch(apiUrl + "/player", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      if (response.status === 200) return response.json();
    }
    const err = await response.json();
    throw { code: 404, error: err.message, status: response.status };
  });
};

const PLAYER_API = {
  findAll: FindAll,
};

export default PLAYER_API;
