import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import style from '../components/styles';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={style.root}>
      <View style={style.Header}>
        <TouchableOpacity alignItem="flex-end">
          <Image
            style={{height: 35, width: 35}}
            source={require('../Assets/images/settings.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={style.Body}>
        <Text>body</Text>
      </View>
      <View style={style.Footer}>
        <View>
          <TouchableOpacity
            alignItem="flex-end"
            style={style.insertBtn}
            onPress={() => navigation.navigate('InsertPubKey')}>
            <Text>Insert Public Key</Text>
          </TouchableOpacity>
          <TouchableOpacity
            alignItem="flex-end"
            style={style.insertBtn}
            onPress={() => navigation.navigate('ViewAll')}>
            <Text>ViewAll</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
