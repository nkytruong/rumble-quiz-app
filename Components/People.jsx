import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import {
  getAvatar,
  getFriends,
  getPeople,
  getUserByUsername,
} from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import UserCard from "./designComponents/UserCard";
import CustomButton from "./CustomButton";
import { addFriend } from "../utils/api";

export default function People({ route }) {
  const { friendsUsernamesAndSelf } = route.params;
  const { userLogged } = useContext(UserContext);
  const [people, setPeople] = useState([]);
  const [unknownUser, setUnknownUser] = useState(true);

  useEffect(() => {
    getPeople()
      .then((users) => {
        const restOfPeople = users.filter((user) => {
          return (
            !friendsUsernamesAndSelf.includes(user.username) &&
            user.username !== userLogged
          );
        });
        setPeople(restOfPeople);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);
  console.log("people.length inir :>> ", people.length);

  const addNewFriend = (userLogged, newFriend_username) => {
    addFriend(userLogged, newFriend_username).then((friendship) => {
      console.log("friendship comp :>> ", friendship);
      const peopleAfterAddFriend = people.filter((user) => {
        return user.username !== friendship.user2_username;
      });
      setPeople(peopleAfterAddFriend);
    });
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBanner}>
          <Text style={styles.h2}>People</Text>
        </View>
        <View style={styles.friendsList}>
          {people.map((person) => {
            return (
              <UserCard
                key={person.username}
                user={person}
                unknownUser={unknownUser}
                addNewFriend={addNewFriend}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBanner: {
    backgroundColor: "rgb(30, 144, 255)",
    paddingVertical: 15,
    alignItems: "center",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  friendsList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  avatar_image: {
    width: "15%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendDetails: {
    //flex: 1,
    width: "60%",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendUsername: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  offlineStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff0000",
  },
  onlineStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
  },
  onlineStatus: {
    fontSize: 16,
    color: "#555555",
  },
});
