import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";
import { getNotifications, getUserByUsername } from "../utils/api";
/* const notifications = [
  {
    id: 1,
    title: "Friend Request",
    description: "RobotOverlord has sent you a friend request.",
    image: require("../assets/avatars/icons8-gorilla-48.png"),
    backgroundColor: "#b22222",
  },
  {
    id: 2,
    title: "Friend Added",
    description: "PirateQueen has accepted your friend request.",
    image: require("../assets/avatars/icons8-lion-48.png"),
    backgroundColor: "#90ee90",
  },
  {
    id: 3,
    title: "Friend Request",
    description: "NinjaWarrior has sent you a friend request.",
    image: require("../assets/avatars/icons8-tiger-48.png"),
    backgroundColor: "#daa520",
  },
]; */

export default function NotificationsList() {
  const { userLogged, login } = useContext(UserContext);
  const [notificationsList, setNotificationsList] = useState([]);
  const [fullNotifications, setFullNotifications] = useState([]);

  useEffect(() => {
    getNotifications(userLogged).then((notifications) => {
      setNotificationsList(notifications);
    });
  }, []);

  useEffect(() => {
    if (notificationsList.length > 0) {
      const fetchUsers = async () => {
        const updatedNotifications = await Promise.all(
          notificationsList.map(async (notif) => {
            const { user } = await getUserByUsername(notif.sender_id);
            return {
              ...notif,
              sender_name: user.username,
              avatar_name: user.avatar_name,
              avatar_url: user.avatar_url,
            };
          })
        );
        setFullNotifications(updatedNotifications);
      };
      fetchUsers();
    }
  }, [notificationsList]);

  const renderNotification = ({ item }) => (
    <View
      style={[
        styles.notificationCard,
        { backgroundColor: item.seen ? "lightgrey" : "#85c3ff" },
      ]}
    >
      <View
        style={[
          styles.profileImageContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      />
      <Image source={{ uri: item.avatar_url }} style={styles.profileImage} />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.sender_name}</Text>
        <Text style={styles.notificationDescription}>
          {item.notification_text}
        </Text>
        <Text style={styles.notificationDescription}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "../assets/jigsaw_puzzle_frame_6_a_white.jpg" }}
        style={styles.headerStrip}
      >
        <Text style={styles.headerText}>Notifications</Text>
      </ImageBackground>
      <FlatList
        data={fullNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.notification_id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  headerStrip: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(30, 144, 255)",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff",
  },
  listContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  notificationCard: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar_image: {
    width: "15%",
  },
  profileImage: {
    width: 48,
    height: 48,
    marginRight: 15,
    borderRadius: 50,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
  },
});
