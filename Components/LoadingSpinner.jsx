import { Swing } from "react-native-animated-spinkit";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomStyles from "../Styles/CustomStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingSpinner() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Swing size={48} color="#FFF" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "block",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginLeft: "35%",
    textAlign: "center",
  },
});
