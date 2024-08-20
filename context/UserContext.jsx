import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { patchUserByUsername, postUserLogin } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);
  const [userLoggedID, setUserLoggedID] = useState();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userLogged");
        const userDataID = await AsyncStorage.getItem("userLoggedID");
        console.log("userData context :>> ", userData);
        console.log("userDataID context :>> ", userDataID);
        if (userData) {
          setUserLogged(userData);
        }
        if (userDataID) setUserLoggedID(userDataID);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  const login = async (userData, navigation) => {
    try {
      const res = await postUserLogin(userData);
      // console.log(Object.keys(res));
      if (res.status === 200) {
        await AsyncStorage.setItem("token", JSON.stringify(res.data));
        await AsyncStorage.setItem("userLogged", userData.username);
        await AsyncStorage.setItem(
          "userLoggedID",
          JSON.stringify(res.data.successfulLogin.user.user_id)
        );
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        //setIsLoggedIn(true);

        setUserLogged(userData.username);
        setUserLoggedID(res.data.successfulLogin.user.user_id);
        navigation.navigate("AppNavigation");
      } else {
        alert("Login failed", "Please check your credentials and try again.");
      }
    } catch (error) {
      console.log("error in post request for login ", error);
      alert("Login failed", "An error occurred. Please try again later.");
    }
  };

  const editUser = async (userToEdit, patchBody) => {
    try {
      const res = await patchUserByUsername(userLogged, patchBody);
      if (res.status === 200) {
        console.log("res :>> ", res);
        //await AsyncStorage.setItem("userLogged", newUsername);
        console.log("Updated userLogged, userLogged");
      }
    } catch (error) {
      console.log("error in patch request for login ", error);
    }
  };

  const logout = async (navigation) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("userLogged", "");
      navigation.navigate("LogIn");
      //setIsLoggedIn(false);
      setUserLogged(null);
      setUserLoggedID(null);
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userLogged,
        userLoggedID,
        setUserLogged,
        login,
        logout,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
