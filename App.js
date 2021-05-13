import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, Button, TextInput, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import PubKeyScreen from './src/screens/PubKeyScreen';
import InsertPubKey from './src/screens/InsertPubKey';
import ViewAll from './src/screens/ViewAll';

import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Transaction Watch Bot" component={HomeScreen} />
          <Stack.Screen name="PubKeyScreen" component={PubKeyScreen} />
          <Stack.Screen name="InsertPubKey" component={InsertPubKey} />
          <Stack.Screen name="ViewAll" component={ViewAll} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  //clickBtn = () => {
  //  this.setState({key: this.inputText});
  //};
}

export default App;
