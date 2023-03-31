import { StyleSheet, View, Text, useWindowDimensions, Image } from 'react-native';
import React from 'react';
import slides from '../slides';

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '400',
    lineHeight: 32,
    fontSize: 24,
    marginBottom: 10,
    color: '#F79944',
    textAlign: 'center',
    // fontFamily: 'Work Sans',
    // fontStyle: 'normal',
  },
  description: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.12,
    // fontFamily: 'Work Sans',
    // fontStyle: 'normal',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
