import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import CountdownTimer from "./Countdown";
import QuestionCard from "./QuestionCard";
import PlayerAvatars from "./PlayerAvatars";
import { socket } from "../socket";
import WaitingRoom from "./WaitingRoom";

export default function QuizPage({ topic_id, userLogged }) {
  const [avatarsReceived, setAvatarsReceived] = useState(false);
  useEffect(() => {
    socket.on("avatars", () => {
      setAvatarsReceived(true);
    });
    return () => {
      // socket.off("avatars", () => {
      //   setAvatarsReceived(false)
      // })
      socket.emit("leave-game", userLogged);
    };
  }, []);

  if (avatarsReceived) {
    return (
      <ScrollView>
        <PlayerAvatars />
        <CountdownTimer />
        <QuestionCard userLogged={userLogged} />
      </ScrollView>
    );
  } else {
    return <WaitingRoom />;
  }
}
