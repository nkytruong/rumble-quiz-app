import * as Progress from "react-native-progress";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar() {
  return (
    <View style={styles.progressBarContainer}>
      <Progress.Bar
        progress={0.1}
        width={300}
        height={20}
        borderRadius={10}
        color={"#1e90ff"}
        unfilledColor={"#d3d3d3"}
        borderWidth={0}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  progressBarContainer: {
    marginVertical: 5,
    alignSelf: "center",
  },
});
