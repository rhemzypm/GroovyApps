import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CreateScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#76a6ef'
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#fff',
    }
})