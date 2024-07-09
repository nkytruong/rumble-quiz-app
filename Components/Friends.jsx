import { View, Text } from "react-native";
import React from "react";
import LeaderBoard from "./LeaderBoard";
import Endpoints from "./endpoints";

export default function Friends() {
  return (
    <View>
      <Text>Friends</Text>
      <LeaderBoard />
    </View>
  );
}
