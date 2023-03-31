import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Paginator() {
  return (
    <View style={style.container}>
      <Text>Paginator</Text>
    </View>
  )
};

const style = StyleSheet.create({
    container:  {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});