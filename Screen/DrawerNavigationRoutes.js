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
//import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        // headerLeft: () => (
        //   <NavigationDrawerHeader navigationProps={navigation} />
        // ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
     <Tab.Navigator
    //   drawerContentOptions={{
    //     activeTintColor: '#cee1f2',
    //     color: '#cee1f2',
    //     itemStyle: {marginVertical: 5, color: 'white'},
    //     labelStyle: {
    //       color: '#d8d8d8',
    //     },
    //   }}
    //   screenOptions={{headerShown: false}}
    //   drawerContent={CustomSidebarMenu}
    //   >
    //   <Tab.Screen
    //     name="homeScreenStack"
    //     options={{drawerLabel: 'Home Screen'}}
    //     component={homeScreenStack}
    //   />
    //   <Tab.Screen
    //     name="settingScreenStack"
    //     options={{drawerLabel: 'Setting Screen'}}
    //     component={settingScreenStack}
    //   />
  
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