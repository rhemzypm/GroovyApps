import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

const ServiceButton = ({ label, imageSource, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.button]}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // marginHorizontal: 25,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#fef5ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
    flexDirection: 'column',
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
