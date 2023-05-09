import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../src/theme.js'

export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="angle-left" size={30} color={theme.colors.white} />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity>
          <Image style={styles.image} source={{ uri: picture }} />
          <View style={styles.usernameAndOnlineStatus}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.onlineStatus}>{onlineStatus}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingTop: 110
  },
  backButton: {
    marginRight: 10
  },
  profileOptions: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10
  }
})
