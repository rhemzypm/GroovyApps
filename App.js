import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from './components/Onboarding';
import Splashscreen from './screens/Splashscreen';
import SignInScreen from './components/SignInScreen';
import InputOTP from './components/InputOTP';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="InputOTP" component={InputOTP} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <SplashScreen/>
    //   <StatusBar style="auto" />
    // </View>
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
