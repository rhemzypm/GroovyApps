import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Onboarding from "./screens/Onboarding";
import Splashscreen from "./screens/Splashscreen";
import SignInScreen from "./screens/SignInScreen";
import InputOTP from "./components/InputOTP";
import Register from "./screens/Register";
import BottomNav from "./components/BottomNav";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import PointScreen from "./screens/PointScreen";
import FAQScreen from "./screens/FAQScreen";
import TabBar from "./components/TabBar";
import Profile from "./screens/Profile";
import ProductScreen from "./screens/ProductScreen";
import MessageScreen from "./screens/messages/MessageScreen";
import CarouselCard from "./components/CarouselCards";

import Andalpost from "./screens/Andalpost";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//test
import { SafeAreaView } from "react-native";
import CarouselCards from "./components/CarouselCards";

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ icon: "home" }}
      />
      <Tab.Screen
        name="Point"
        component={PointScreen}
        initialParams={{ icon: "point" }}
      />
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        initialParams={{ icon: "shoppingcart" }}
      />
      <Tab.Screen
        name="Help"
        component={FAQScreen}
        initialParams={{ icon: "customerservice" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
      />
    </Tab.Navigator>
  );
}

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
    <Stack.Screen name="CarouselCards" component={CarouselCards} />
    <Stack.Screen name="MessageScreen" component={MessageScreen} />
    <Stack.Screen name="Andalpost" component={Andalpost} />
    <Stack.Screen name="Carousel" component={CarouselCard} />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
