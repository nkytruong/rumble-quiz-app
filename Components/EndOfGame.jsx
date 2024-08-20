import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { getGameLogForUser } from "../utils/api";
import { DataTable, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EndOfGame() {
  const { userLogged } = useContext(UserContext);
  const [userGameLog, setUserGameLog] = useState({});
  const navigation = useNavigation();
    const route = useRoute();

    const { endOfGameResult, gameId } = route.params;

  console.log('endOfGameResult :>> ', endOfGameResult);
  console.log('gameID in endOfGame Comp :>> ', gameId);

  useEffect(() => {
    if (gameId) {
      console.log("gameId inside if :>> ", gameId);
      getGameLogForUser(gameId, userLogged).then((log) => {
        console.log('log userGameData :>> ', log);
        setUserGameLog(log);
      });
    }
  }, [gameId]);

  console.log("userGameLog :>> ", userGameLog);
  return (
    // <ImageBackground
    //   source={require("../assets/jigsaw_puzzle_frame_6_a_white.jpg")}
    // >
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          {endOfGameResult === "win" ? "You Win!" : "You Lose!"}
        </Text>
        {!gameId ? <Text style={styles.text}>"Loading..."</Text> : null}
      </View>
      {Object.keys(userGameLog).length > 0 ? (
        <DataTable style={styles.tableContainer}>
          <DataTable.Row>
            <DataTable.Cell style={styles.stat_title}>
              Game result
            </DataTable.Cell>
            <DataTable.Cell style={styles.stat_data}>
              {userGameLog.won_game ? "You won" : "You lost"}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={styles.stat_title}>
              Game Points
            </DataTable.Cell>
            <DataTable.Cell style={styles.stat_data}>
              {userGameLog.points}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={styles.stat_title}>
              Topic Played
            </DataTable.Cell>
            <DataTable.Cell style={styles.stat_data}>
              {userGameLog.topic_name}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      ) : null}
      <Button
        icon="arrow-left-bold"
        mode="contained"
        style={{ width: "80%", fontSize: 24, marginHorizontal: "auto", marginTop: "5%" }}
        onPress={() => navigation.navigate("Play")}
      >
        Play again
      </Button>
    </SafeAreaView>
    // </ImageBackground>
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
    textAlign: "center",
    //color: result === "win" ? "green" : "red",
  },
  tableContainer: {
    paddingTop: 15,
  },
  stat_title: {
    backgroundColor: "#DCDCDC",
    paddingLeft: 20,
  },
  stat_data: {
    paddingLeft: 20,
    borderColor: "grey",
    borderWidth: 1,
  },
});
