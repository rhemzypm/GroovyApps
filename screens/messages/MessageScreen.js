import { View, Text } from 'react-native'
import React from 'react'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import logo from '../../assets/img/logo.png'
const MessageScreen = ({ username = 'Customer Center', picture = logo, onlineStatus = 'Online' }) => {
  return (
    <View style={{ flex: 1 }}>
      <ChatHeader 
        onPress={() => {}}
        username={username}
        picture={picture}
        onlineStatus={onlineStatus}
      />
      <MessageList/>
      <ChatInput/>
    </View>
  )
}

export default MessageScreen