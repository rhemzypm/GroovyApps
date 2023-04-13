import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function MagicBottomNav()  {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        {
            // Tab Screens
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
} 

function HomeScreen()  {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard</Text>
    </View>
    );
}

function GroovyPoint()  {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>GroovyPoint</Text>
    </View>
    );
}

function HelpCenter()  {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard</Text>
    </View>
    );
}

function Product()  {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard</Text>
    </View>
    );
}

function Profile()  {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});