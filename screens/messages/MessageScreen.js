import { View, Text } from 'react-native'
import React, { useState } from 'react'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import logo from '../../assets/img/logo.png'
const MessageScreen = ({ username = 'Customer Center', picture = logo, onlineStatus = 'Online' }) => {
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();

	const swipeToReply = (message, isLeft) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader 
        username={username}
        picture={picture}
        onlineStatus={onlineStatus}
      />
			<MessageList onSwipeToReply={swipeToReply} />
			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username={username} />
    </View>
  )
}

export default MessageScreen
