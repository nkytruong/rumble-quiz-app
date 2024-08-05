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
