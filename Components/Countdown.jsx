import { Text, View, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import React, { useState } from "react";
import { socket } from "../socket";

export default function CountdownTimer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [repeat, setRepeat] = useState(false);

  socket.on("question", () => {
    setRepeat(true);
  });

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={10}
        size={80}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => ({ shouldRepeat: repeat, delay: 3 })}
      >
        {({ remainingTime }) => (
          <Text style={styles.countDownText}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
  },
  countDownText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
