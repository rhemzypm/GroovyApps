import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Onboarding from '../components/Onboarding';

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.hiasan1} source={require("../assets/img/Hiasan1.png")} />
      <Image style={styles.hiasan2} source={require("../assets/img/Hiasan2.png")} />
      <Image
      source={require("../assets/img/logo.png")}
      resizeMode="contain"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
      ></Image>
      </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
    width: '100%'
  },
  rootScreen: {
    width: 158,
    height: 158,
  },
  hiasan1:  {
    position: "absolute",
    left: 0,
    top: 0,
  },
  hiasan2:  {
    position: "absolute",
    right: 0,
    bottom: 0,
  }
});
