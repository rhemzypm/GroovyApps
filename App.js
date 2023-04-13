import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from './components/Onboarding';
import Splashscreen from './screens/Splashscreen';
import SignInScreen from './components/SignInScreen';
import InputOTP from './components/InputOTP';
import Register from './components/Register';
import BottomTab from './components/AnimatedScrollView';
import TabNavigator from './app/contexts/TabBarProvider';
import TabBarProvider from './app/contexts/TabBarProvider';
import Home from './components/Home';
import Create from './components/Create';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TabBarProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Create"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="InputOTP" component={InputOTP} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create" component={Create} />
        </Stack.Navigator>
        <TabNavigator />
      </NavigationContainer>
    </TabBarProvider>
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
