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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./screens/HomeScreen";
import PointScreen from "./screens/PointScreen";
import FAQScreen from "./screens/FAQScreen";
import TabBar from "./components/TabBar";
import Profile from "./screens/Profile";
import ProductScreen from "./screens/ProductScreen";
import MessageScreen from "./screens/messages/MessageScreen";
import CarouselCard from "./components/CarouselCards";
import FormCheckCoverage from "./screens/FormCheckCoverage";
import CheckoutProduct from "./screens/CheckoutProduct";
import Andalpost from "./screens/Andalpost";
import PasscodePage from "./screens/PasscodePage";
import RewardDetail from "./screens/services/Detail/RewardDetail";
import ServiceNavigator from "./components/navigator/ServiceNavigator";
import Redeem from "./screens/services/Detail/Redeem";
import PaymentStatus from "./screens/PaymentStatus";
import EditProfile from "./screens/EditProfile";
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//test
import { SafeAreaView } from "react-native";
import CarouselCards from "./components/CarouselCards";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        style: {
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        },
      }}
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
      initialRouteName="Splashscreen"
      screenOptions={{ headerShown: false }}
    >
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
      <Stack.Screen name="FormCheckCoverage" component={FormCheckCoverage} />
      <Stack.Screen name="CheckoutProduct" component={CheckoutProduct} />
      <Stack.Screen name="PasscodePage" component={PasscodePage} />
      <Stack.Screen name="RewardDetail" component={RewardDetail} />
      <Stack.Screen name="Redeem" component={Redeem} />
      <Stack.Screen name="PaymentStatus" component={PaymentStatus} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceNavigator"
        component={ServiceNavigator}
        options={{ headerShown: false }}
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
