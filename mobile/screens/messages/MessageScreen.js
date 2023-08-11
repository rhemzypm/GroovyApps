import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "../../src/theme";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

import logo from "../../assets/img/logo.png";

import socket from "../../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageScreen = ({
  username = "Customer Center",
  picture = logo,
  onlineStatus = "Online",
  route,
  navigation,
}) => {
  const [reply, setReply] = useState("");
  const [isLeft, setIsLeft] = useState();

  const hour =
    new Date().getHours() < 10
      ? `0${new Date().getHours()}`
      : `${new Date().getHours()}`;
  const mins =
    new Date().getMinutes() < 10
      ? `0${new Date().getMinutes()}`
      : `${new Date().getMinutes()}`;

  const [messages, setMessages] = useState([
    {
      user: 0,
      time: `${hour}:${mins}`,
      content: "Hello",
    },
    {
      user: 1,
      time: `${hour}:${mins}`,
      content: "Hello",
    },
  ]);
  const [message, setMessage] = useState("");

  // get id (soon)

  const swipeToReply = (message, isLeft) => {
    setReply(message.length > 50 ? message.slice(0, 50) + "..." : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply("");
  };

  const handleNewMessage = () => {
    setMessages([{ user: 0, time: `${hour}:${mins}`, content: message }]);

    socket.emit("newMessage", {
      user: 0,
      time: { hour, mins },
      content: message,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        username={username}
        picture={picture}
        onlineStatus={onlineStatus}
      />

      <MessageList messages={messages} onSwipeToReply={swipeToReply} />

      <ChatInput
        reply={reply}
        isLeft={isLeft}
        closeReply={closeReply}
        username={username}
        message={message}
        setMessage={setMessage}
        handleNewMessage={handleNewMessage}
      />
    </View>
  );
};

export default MessageScreen;
