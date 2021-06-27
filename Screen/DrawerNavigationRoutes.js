// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';
import HomeScreen from '../src/screens/HomeScreen';
import InsertPubKey from '../src/screens/InsertPubKey';
import SettingScreen from '../src/screens/SettingScreen';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
// Import Screens


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const DrawerNavigatorRoutes = (props) => {
  return (
     <Tab.Navigator
      screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'PubKey') {
          iconName = focused ? 'key' : 'key-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Icon name={iconName} size={size} color={'white'} />;
      },
    })}
    tabBarOptions={{
      style: {
        backgroundColor: 'black',
        borderColor: 'black',
      },
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      keyboardHidesTabBar: true,
    }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="PubKey" component={InsertPubKey} />
    <Tab.Screen name="Settings" component={SettingScreen} />
  </Tab.Navigator>
  );
};

export default DrawerNavigatorRoutes;