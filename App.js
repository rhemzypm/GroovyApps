import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from './screens/Onboarding';
import Splashscreen from './screens/Splashscreen';
import SignInScreen from './screens/SignInScreen';
import InputOTP from './components/InputOTP';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="InputOTP" component={InputOTP} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
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
