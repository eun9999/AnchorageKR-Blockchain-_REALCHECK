import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import InsertPubKey from './src/screens/InsertPubKey';
import SettingScreen from './src/screens/SettingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

export default function App() {
  setTimeout(() => {
    SplashScreen.hide();
  }, 10);
  return (
    <NavigationContainer>
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
            return <Icon name={iconName} size={size} color={'#424242'} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#424242',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="PubKey" component={InsertPubKey} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
