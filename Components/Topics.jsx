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
import React, { useEffect, useState, useContext } from "react";
import { getCategories } from "../utils/questionsApi";
import Topic from "./Topic";
import TopicFlipCard from "./TopicFlipCard";
import QuizPage from "./QuizPage";
import { socket } from "../socket";
import { UserContext } from "../context/UserContext";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [avatar, setAvatar] = useState();
  const { height } = useWindowDimensions();
  const { userLogged, login } = useContext(UserContext);

  /* const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      const avatar = await AsyncStorage.getItem("avatar_url");
      console.log(avatar, "AVATAR");
      setUserLogged(user);
      setAvatar(avatar);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  }; */
  useEffect(() => {
    const fetchAvatarFromStorage = async () => {
      try {
        const avatar_URL = await AsyncStorage.getItem("avatar_url");
        setAvatar(avatar_URL);
      } catch (error) {
        console.error("Error retrieving avatar URL from AsyncStorage", error);
      }
    };

    getCategories()
      .then((data) => {
        const { trivia_categories } = data;
        setTopics(trivia_categories);
      })
      .catch((err) => console.log("err :>> ", err));
    /* getUserLogged(); */
    fetchAvatarFromStorage();
  }, []);

  const handleSelection = async (id, name) => {
    console.log(id, "<< id");
    console.log("topic name :>> ", name);
    console.log("userLogged :>> ", userLogged);
    console.log("avatar :>> ", avatar);    console.log("userLogged :>> ", userLogged);

    await setSelectedTopic(id);
    if (userLogged && avatar) {
      socket.emit(
        "topic-selected",
        id.toString(),
        { username: userLogged, avatar_url: avatar },
        () => {
          console.log("Hellooo from the client");
        }
      );
    }
  };
  // useEffect(() => {
  //   console.log("selectedTopic :>> ", selectedTopic);
  // }, [selectedTopic]);

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
