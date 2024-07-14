import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function EndOfGame({ endOfGameResult }) {
  return (

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {endOfGameResult === "win" ? "You Win!" : "You Lose!"}
          </Text>
        </View>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
