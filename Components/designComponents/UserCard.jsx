import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Avatar, Button } from "react-native-paper";
import { UserContext } from "../../context/UserContext";


export default function UserCard({ user, unknownUser, addNewFriend }) {
  const { userLogged } = useContext(UserContext);

  return (
    <View style={styles.cardContainer} key={user.username}>
      <View style={styles.card}>
        <View>
          <Avatar.Image source={{ uri: user.avatar_url }} />
        </View>
        <View style={styles.friendDetails}>
          <View style={styles.friendInfo}>
            <Text style={styles.friendUsername}>{user.username}</Text>
            <View
              style={
                user.online
                  ? styles.onlineStatusIndicator
                  : styles.offlineStatusIndicator
              }
            />
          </View>
          <Text style={styles.onlineStatus}>
            {user.online ? "Online" : "Offline"}
          </Text>
        </View>
        {unknownUser ? (
          <View>
            <Button
              icon="account-plus"
              mode="contained"
              onPress={() => addNewFriend(userLogged, user.user_id, user.username)}
            >
              Add
            </Button>
          </View>
        ) : null}
      </View>
    </View>
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
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendDetails: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 10,
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
