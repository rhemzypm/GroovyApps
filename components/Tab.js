import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function Tab ({color, tab, onPress, icon}) {
function isObject(source) {
  return typeof source === 'string' && (source === 'home' || source === 'customerservice');
}

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        {isObject(icon) ? (
          <AntDesign name={icon} size={24} color={color} />
          ) : (
        <Image source={icon} style={styles.image} />
      )}
        <Text style={{color}}>{tab.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    image: {
    width: 24,
    height: 24,
    marginBottom: 5
  },
})