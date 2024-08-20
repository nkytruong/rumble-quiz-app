import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import { UserContext } from "../context/UserContext";
import {
  getNotifications,
  getUserByUsername,
  readingNotifications,
} from "../utils/api";

function Time({ children }) {
  return <Text>{children}</Text>;
}

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
        <Text>
          <ReactTimeAgo
            date={
              typeof item.time === "number"
                ? item.time
                : new Date(item.time).getTime()
            }
            component={Time}
          />
        </Text>
      </View>
    </View>
  );

  useEffect(() => {
    setTimeout(() => {
      if (fullNotifications.length > 0) {
        fullNotifications.forEach((notif) => {
          if (notif && notif.notification_id) {
            if (!notif.seen) {
              readingNotifications(notif.notification_id)
                .then((notification) => {
                  if (notification) {
                    setFullNotifications((current) =>
                      current.map((n) =>
                        n.notification_id === notification.notification_id
                          ? notification
                          : n
                      )
                    );
                  }
                })
                .catch((error) => {
                  console.error(
                    `Failed to mark notification as read: ${notif.notification_id}`,
                    error
                  );
                });
            }
          } else {
            console.error("Invalid notification", notif);
          }
        });
      }
    }, 5000);
  }, [fullNotifications]);


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
