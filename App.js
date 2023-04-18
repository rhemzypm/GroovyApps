import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from './screens/Onboarding';
import Splashscreen from './screens/Splashscreen';
import SignInScreen from './screens/SignInScreen';
import InputOTP from './components/InputOTP';
import Register from './screens/Register';
import BottomNav from './components/BottomNav';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import FAQScreen from './screens/FAQScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function TabNavigator(){
  return <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown: false}}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Create' component={CreateScreen} />
    </Tab.Navigator>
}


function StackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="FAQScreen"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splashscreen" component={Splashscreen} />
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="InputOTP" component={InputOTP} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="BottomNav" component={BottomNav} />
    <Stack.Screen name="FAQScreen" component={FAQScreen} />
    <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false}}
        />
    </Stack.Navigator>
    );
  }

  export default function App() {
    return (
    <NavigationContainer>
    <StackNavigator />
    </NavigationContainer>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
  }
})
