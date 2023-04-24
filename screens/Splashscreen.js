import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Onboarding from './Onboarding';
import Lottie from 'lottie-react-native';

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
      setTimeout(() => {
          navigation.navigate('Onboarding');
        }, 1000);
      }, []);
  //     <Image style={styles.hiasan2} source={require("../assets/img/Hiasan2.png")} />
  //     return (
  //     );
      
    return (
        <View style={styles.container}>
        <Lottie 
          source={require('../assets/img/decor_1.json')} 
          autoPlay 
          loop 
          style={{ 
          left: -270,
          top: -370,
        }} 
        />
        <Lottie 
          source={require('../assets/img/decor2_1.json')} 
          autoPlay 
          loop 
          style={{ 
          bottom: -300,
          right: -50,
        }} 
        />
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
    zIndex: 2,
  },
  hiasan2:  {
    position: "absolute",
    right: 0,
    bottom: 0,
  }
});
