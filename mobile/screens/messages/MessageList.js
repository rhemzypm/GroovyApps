import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";

import { theme } from "../../src/theme";

const MessagesList = ({ messages, onSwipeToReply }) => {
  const user = useRef(0);
  const scrollView = useRef();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.white, flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {messages
        ? messages.map((message, index) => (
            <Message
              key={index}
              time={message.time}
              isLeft={message.user !== user.current}
              message={message.content}
              onSwipe={onSwipeToReply}
            />
          ))
        : ""}
    </ScrollView>
  );
};

export default MessagesList;
