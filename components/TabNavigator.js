import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import LoginScreen from '../screens/SignInScreen';

const Tab = createBottomTabNavigator()
const TabNavigator = () => {
    return <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Create' component={CreateScreen} />
        <Tab.Screen name='Sign' component={LoginScreen} />
    </Tab.Navigator>
}

export default TabNavigator;