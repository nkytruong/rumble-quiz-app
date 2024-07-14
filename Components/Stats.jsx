import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'; 
import { DataTable } from 'react-native-paper'; 
import { getUserStats } from '../utils/api';
import CustomStyles from '../Styles/CustomStyles';

export default function Stats({username, userLogged}) {
  const [userStats, setUserStats] = useState(({
    player_username: userLogged,
    games_played: 0,
    games_won: 0,
    total_points: 0,
    top_topic: 0
  }))

  useEffect(() => {
    if(userLogged){
      getUserStats(userLogged)
        .then(({ log }) => {
          setUserStats(log);
        })
        .catch((err) => console.log("err :>> ", err));
    }
  }, [userLogged])

  if(!userStats) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={CustomStyles.container}>
      <Text style={CustomStyles.h3}>Your Stats</Text>
    <DataTable style={styles.container}> 
      <DataTable.Row> 
        <DataTable.Cell style={styles.stat_title}>Total Points</DataTable.Cell> 
        <DataTable.Cell style={styles.stat_data}>{userStats.total_points}</DataTable.Cell> 
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell style={styles.stat_title}>Games Played</DataTable.Cell> 
        <DataTable.Cell style={styles.stat_data}>{userStats.games_played}</DataTable.Cell> 
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell style={styles.stat_title}>Games Won</DataTable.Cell> 
        <DataTable.Cell style={styles.stat_data}>{userStats.games_won}</DataTable.Cell> 
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell style={styles.stat_title}>Favourite Category</DataTable.Cell> 
        <DataTable.Cell style={styles.stat_data}>{userStats.top_topic}</DataTable.Cell> 
      </DataTable.Row> 
    </DataTable> 
    </View>
  
  )
}

const styles = StyleSheet.create({ 
  container: { 
    paddingTop: 15, 
  }, 
  stat_title: {
    backgroundColor: '#DCDCDC', 
    paddingLeft: 20,
  }, 
  stat_data: {
    paddingLeft: 20,
    borderColor: 'grey',
    borderWidth: 1
  }
});