import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Onboarding from './components/Onboarding';
import SignInScreen from './screens/SignInScreen'; 

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Onboarding/> */}
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
  }
})