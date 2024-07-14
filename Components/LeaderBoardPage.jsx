import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Leaderboard from "react-native-leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsersPoints } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";

export default function LeaderBoardPage({ isLoading, setIsLoading }) {
  const [userLogged, setUserLogged] = useState("");
  const [usersPoints, setUsersPoints] = useState([]);

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      setUserLogged(user);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  useEffect(() => {
    if (userLogged) {
      getUsersPoints()
        .then(({ leaderboard }) => {
          const currentPlayerScore = leaderboard.find(
            (user) => user.player_username === userLogged
          );
          if (!currentPlayerScore) {
            leaderboard.push({
              player_username: userLogged,
              total_points: 0,
            });
          }
          setUsersPoints(leaderboard);
          setIsLoading(false);

        })
        .catch((err) => console.log("err :>> ", err));;
    }
  }, [userLogged]);

  const currentPlayerScore = usersPoints.find(user => user.player_username === userLogged);
  const currentPlayerRank = usersPoints.findIndex(user => user.player_username === userLogged) + 1;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.h2}>LeaderBoard</Text>
        <Text style={styles.subtitle}>
          {currentPlayerScore ? (
            currentPlayerScore.total_points
          ) : (
            <LoadingSpinner />
          )}
        </Text>
        <Text style={styles.pointsText}>Points</Text>
        <Text style={styles.rank}>Rank: {currentPlayerRank}</Text>
      </View>
      <Leaderboard
        data={usersPoints}
        sortBy="total_points"
        labelBy="player_username"
        style={styles.leaderboard}
      />
    </View>
  );
  }


const styles = StyleSheet.create({
  h2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: "#CCAE2F",
    padding: 20
  },
  subtitle: {
    fontSize: 50,
    textAlign: "center",
  },
  pointsText: {
    fontSize: 25,
    textAlign: "center",
  },
  rank: {
    fontSize: 25,
    textAlign: 'center'
    }
});
