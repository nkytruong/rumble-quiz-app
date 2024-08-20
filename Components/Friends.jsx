import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { getAvatar, getFriends, getUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import UserCard from "./designComponents/UserCard";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import People from "./People";

export default function Friends() {
  //const [userLogged, setUserLogged] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [friendsUsernamesAndSelf, setFriendsUsernamesAndSelf] = useState([]);
  const { userLogged } = useContext(UserContext);
  const navigation = useNavigation();
  const [unknownUser, setUnknownUser] = useState(false);

  useEffect(() => {
    if (userLogged) {
      getFriends(userLogged)
        .then((friends_usernames) => {
          const uniqueFriendsUsernames = [...new Set(friends_usernames)];
          setFriends(uniqueFriendsUsernames);
        })
        .catch((err) => console.log("err :>> ", err));
    }
  }, [unknownUser]);

  useEffect(() => {
    if (friends.length > 0) {
      setFriendsDetails([]);
      setFriendsUsernamesAndSelf([]);

      friends.forEach((friend) => {
        getUserByUsername(friend)
          .then(({ user }) => {
            setFriendsDetails((currentData) => {
              if (
                !currentData.some(
                  (currIndv) => currIndv.username === user.username
                )
              ) {
                return [...currentData, user];
              }
              return currentData;
            });

            setFriendsUsernamesAndSelf((currentData) => {
              if (!currentData.includes(user.username)) {
                return [...currentData, user.username];
              }
              return currentData;
            });
          })
          .catch((err) => console.log("err :>> ", err));
      });
    }
  }, [friends]);


  if (!unknownUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBanner}>
          <Text style={styles.h2}>Friends</Text>
        </View>
        <ScrollView>
          <View style={styles.friendsList}>
            {friendsDetails.map((friend) => {
              return <UserCard key={friend.username} user={friend} />;
            })}
          </View>

          <View style={{ width: "90%", margin: "auto" }}>
            <CustomButton
              text="View all users"
              onPress={() => {
                setUnknownUser(true);
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <People
        friendsUsernamesAndSelf={friendsUsernamesAndSelf}
        unknownUser={unknownUser}
        setUnknownUser={setUnknownUser}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 66,
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
