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
import PointScreen from './screens/PointScreen';
import FAQScreen from './screens/FAQScreen';
import TabBar from './components/TabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function TabNavigator(){
  return <Tab.Navigator
    tabBar={props => <TabBar {...props}/>}
    initialRouteName="Home"
    screenOptions={{headerShown: false}}>
        <Tab.Screen 
        name='Home' 
        component={HomeScreen} 
        initialParams={{icon: "home" }}
        />
        <Tab.Screen 
        name='Point' 
        component={PointScreen} 
        initialParams={{icon: "point" }}
        />
        <Tab.Screen 
        name='Help' 
        component={FAQScreen} 
        initialParams={{icon: "customerservice" }}
        />
        </Tab.Navigator>
      }
      // <Tab.Screen 
      // name='Home' 
      // component={HomeScreen} 
      // initialParams={{icon: "shoppingcart" }}
      // />
      // <Tab.Screen 
      // name='Home' 
      // component={HomeScreen} 
      // initialParams={{icon: "user" }}
      // />


function StackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="TabNavigator"
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
