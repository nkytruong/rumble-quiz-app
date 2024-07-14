import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { getCategories } from "../utils/questionsApi";
import Topic from "./Topic";
import QuizPage from "./QuizPage";
import { socket } from "../socket";

export default function Topics({ userLogged, setUserLogged }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [avatar, setAvatar] = useState();
  const { height } = useWindowDimensions();

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      const avatar = await AsyncStorage.getItem("avatar_url");
      setUserLogged(user);
      setAvatar(avatar);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };
  useEffect(() => {
    getCategories()
      .then((data) => {
        const { trivia_categories } = data;
        setTopics(trivia_categories);
        console.log(trivia_categories);
      })
      .catch(() => console.log("Error getting Topic categories from API "));
    getUserLogged();
  }, []);

  const handleSelection = async (id, name) => {
    await setSelectedTopic(id);
    if (userLogged && avatar) {
      socket.emit("topic-selected", id.toString(), {
        username: userLogged,
        avatar_url: avatar,
      });
    }
  };

  if (selectedTopic === undefined) {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View>
          <Image
            source={require("../assets/Designer.jpeg")}
            style={[styles.logo, { height: height * 0.3 }]}
          />
        </View>
        <ScrollView>
          {topics.map((topic) => {
            return (
              <Pressable
                key={topic.id}
                onPress={() => handleSelection(topic.id, topic.name)}
              >
                <Topic topic={topic} />
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <QuizPage topic_id={selectedTopic} userLogged={userLogged} />;
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginBottom: 70,
  },
  logo: {
    margin: "auto",
    width: "70%",
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: 100,
  },
});
