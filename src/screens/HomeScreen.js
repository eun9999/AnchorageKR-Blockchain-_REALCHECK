import React, {Component} from 'react';
import {Button, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import style from '../components/styles';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={style.root}>
      <View style={style.Header}>
        <Text style={{color: 'white'}}>Watch Bot</Text>
      </View>
      <View style={style.Body}>
        <Text>body</Text>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
