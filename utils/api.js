import axios from "axios";

const rumbleQuizApi = axios.create({
  baseURL: "https://rumble-quiz-server.onrender.com/api",
});

export const getUserByUsername = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("Error getting user from API:", err);
    });
};

export const patchUserByUsername = (userLogged, patchBody) => {
  return rumbleQuizApi
    .patch(`/users/${userLogged}`, patchBody)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("Error patching user details:", err);
    });
};

export const postUserLogin = (postBody) => {
  return rumbleQuizApi
    .post(`/users/login`, postBody)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Error creating new user in API:", err);
    });
};

export const getAvatars = () => {
  return rumbleQuizApi
    .get("/avatars")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("Error getting avatars from the API:", err);
    });
};

export const getAvatar = (id) => {
  return rumbleQuizApi
    .get(`/avatars/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error getting avatar ${id} from the API:`, err);
    });
};

export const getUserStats = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/logs`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("Error getting user stats from the API:", err);
    });
};

export const getUsersPoints = () => {
  return rumbleQuizApi
    .get("/logs")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("Error getting leaderboard:", err);
    });
};

export const getFriends = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/friends`)
    .then(({ data }) => {
      return data.friends;
    })
    .catch((err) => {
      console.log("Error getting friends data from API:", err);
    });
};

export const postNewUser = (postBody) => {
  return rumbleQuizApi.post("/users", postBody).catch((err) => {
    console.log("Error creating new user:", err);
  });
};
