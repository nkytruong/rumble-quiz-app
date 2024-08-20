import { View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { socket } from "../socket";

export default function PlayerAvatars({avatars}) {
  const [initialAvatars_urls, setInitialAvatars_urls] = useState([]);
console.log('avatars :>> ', avatars);
/*   socket.on("avatars", (avatars) => {
    setInitialAvatars_urls(Object.values(avatars));
  }); */

  const styles = StyleSheet.create({
    avatars: {
      backgroundColor: "#FFE4C6",
      borderRadius: 50,
      width: 50,
      height: 50,
      borderColor: "white",
      borderWidth: 2,
    },
    avatars_container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.avatars_container}>
      {avatars.length > 0
        ? avatars.map((avatarUrl, index) => {
            return (
              <Image
                key={index}
                source={{ uri: avatarUrl }}
                style={styles.avatars}
              />
            );
          })
        : null}
    </View>
  );
}
