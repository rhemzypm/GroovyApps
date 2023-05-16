import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../src/theme.js'

export default function ChatHeader({ username, picture, onlineStatus, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Icon name="angle-left" size={30} color={theme.colors.black} />
      </TouchableOpacity>
      <Image style={styles.image} source={picture} />
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
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
    // backgroundColor: '#f79944',
    paddingTop: 80,
    paddingBottom: 40,
  },
  backButton: {
    marginRight: 10,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  profileOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15, // add this to make it circular
  },
  usernameAndOnlineStatus:{
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineStatus:{
    color: theme.colors.black,
    fontSize: 16,
  }
})