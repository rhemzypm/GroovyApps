import { View, Text } from 'react-native'
import React from 'react'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const MessageScreen = ({navigation, route}) => {
  const {username, bio, picture, isBlocked, isMuted} = route.params;
  return (
    <View style={{ flex: 1 }}>
        <ChatHeader 
        onPress ={() => {}}
        username = {username}
        picture = {picture}
        onlineStatus={'Online'}
    />
    <MessageList/>
    <ChatInput/>
    </View>
  )
}

export default MessageScreen