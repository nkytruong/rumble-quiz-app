import { View, Text, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getQuestions } from "../utils/questionsApi";
import React from "react";
import CountdownTimer from "./Countdown";
import QuestionCard from "./QuestionCard";
import PlayerAvatars from "./PlayerAvatars";
import ProgressBar from "./ProgressBar";
import { socket } from "../socket";
import WaitingRoom from "./WaitingRoom";
import {UserContext} from "../context/UserContext";

export default function QuizPage({ topic_id }) {
  const [avatarsReceived, setAvatarsReceived] = useState(false);
  const { userLogged, login } = useContext(UserContext);
  const [avatarURLS, setAvatarURLS] = useState([])
  useEffect(() => {
    console.log("<<: mount QuizPage!! :>> ");
    console.log("userLogged mounting QuizPage:>> ", userLogged);
    console.log("<<: topic_id!! QuizPage :>> ", topic_id);
    
    socket.on("avatars", (avatars) => {
      setAvatarURLS(Object.values(avatars))
      setAvatarsReceived(true)
    })
    return () => {
      console.log("<<: leaving QuizPage:>> ");
      console.log("userLogged leaving QuizPage:>> ", userLogged);
      // socket.off("avatars", () => {
      //   setAvatarsReceived(false)
      // })
      //socket.emit("leave-game", topic_id, userLogged); works but not in use now
    };
  }, []);

  if(avatarsReceived){
    return (
      <ScrollView>
        <PlayerAvatars avatars={avatarURLS} />
        <CountdownTimer />
        <QuestionCard />
      </ScrollView>
    );
  } else {
    return <WaitingRoom />
  }
}
