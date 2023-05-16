import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "../../src/theme";

const ChatInput = ({ reply, closeReply, isLeft, username }) => {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      {reply && (
        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
            <Icon name="close" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Response to {isLeft ? username : "Me"}
          </Text>
          <Text style={styles.reply}>{reply}</Text>
        </View>
      )}
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TextInput
            multiline
            placeholder="Type something..."
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={23} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: theme.colors.white,
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
  },
  closeReply: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: "row",
    backgroundColor: theme.colors.inputBackground,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: theme.colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: "center",
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatInput;
