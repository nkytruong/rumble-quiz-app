import * as Progress from "react-native-progress";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({ playersRemaining }) {
  console.log("playersRemaining :>> ", playersRemaining);
  const progress = (1 / playersRemaining).toFixed(1);
  console.log("progress :>> ", progress);
  return (
    <View style={styles.progressBarContainer}>
      <Progress.Bar progress={0.6} width={300} />
      {/* <Progress.Bar
        progress={progress}
        width={300}
        height={20}
        borderRadius={10}
        //color={"#1e90ff"}
        //unfilledColor={"#d3d3d3"}
        borderWidth={0}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  progressBarContainer: {
    marginVertical: 5,
    alignSelf: "center",
  },
});
