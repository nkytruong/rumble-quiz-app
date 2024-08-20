import axios from "axios";

const rumbleQuizApi = axios.create({
  baseURL: "https://rumble-quiz-server-1m0p.onrender.com/api",
});

export const getUserByUsername = (userLogged) => {
  //console.log(userLogged, "<<<userLogged");
  return rumbleQuizApi
    .get(`/users/${userLogged}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const patchUserByUsername = (userLogged, patchBody) => {
  console.log(userLogged, patchBody, "<<<PATCH");
  return rumbleQuizApi
    .patch(`/users/${userLogged}`, patchBody)
    .then(({ data }) => {
      console.log(data, "Data");
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const postUserLogin = (postBody) => {
  return rumbleQuizApi
    .post(`/users/login`, postBody)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getAvatars = () => {
  return rumbleQuizApi
    .get("/avatars")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getAvatar = (id) => {
  return rumbleQuizApi
    .get(`/avatars/${id}`)
    .then(({ data }) => {
      // console.log("data avatar :>> ", data);
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getUserStats = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/logs`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getUsersPoints = () => {
  return rumbleQuizApi
    .get("/logs")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getFriends = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/friends`)
    .then(({ data }) => {
      //console.log("data api :>> ", data.friends);
      return data.friends;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const postNewUser = (postBody) => {
  return rumbleQuizApi
    .post("/users", postBody)
    .then((data) => {
      // console.log('data api :>> ', data);
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getNotifications = (username) => {
  console.log("username :>> ", username);
  return rumbleQuizApi
    .get(`/notifications/${username}`)
    .then(({ data }) => {
      //console.log("data :>> ", data);
      return data.notifications;
    })
    .catch((err) => {
      console.log("axios err", err);
    });
};

export const readingNotifications = (notification_id) => {
  return rumbleQuizApi
    .patch(`/notifications/${notification_id}`)
    .then(({ data }) => {
      return data.notifications;
    });
};

export const getPeople = () => {
  return rumbleQuizApi
    .get("/users")
    .then(({ data }) => {
      return data.users;
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};

export const addFriend = (userLogged, newFriend) => {
  return rumbleQuizApi
    .post(`/users/${userLogged}/friends`, { newFriend })
    .then(({ data }) => {
      return data.friendship;
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};

export const sendNotification = (newNotification) => {
  return rumbleQuizApi
    .post("/notifications", newNotification)
    .then(({ data }) => {
      return data.notification;
    })
    .catch((err) => {
      console.log("err sendNotification :>> ", err);
    });
};

export const getGameLogForUser = (game_id, player_username) => {
  return rumbleQuizApi
    .get(`/logs/${game_id}?player_username=${player_username}`)
    .then(({ data }) => {
      console.log("data :>> ", data);
      return data.logs[0];
    })
    .catch((err) => {
      console.log("err sendNotification :>> ", err);
    });
};
