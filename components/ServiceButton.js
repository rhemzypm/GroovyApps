import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

const ServiceButton = ({ label, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 20,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
  },
});

export default ServiceButton;
