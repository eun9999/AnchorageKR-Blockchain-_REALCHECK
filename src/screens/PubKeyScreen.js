import React, {Component} from 'react';
//import {useState} from 'react';
import {Button, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import style from '../components/styles';
import SQLite from 'react-native-sqlite-2';

var db = SQLite.openDatabase({name: 'pubKey.db'});
class PubKeyScreen extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.inputText = '';
  }

  render() {
    return (
      <View flexDirection="column">
        <View>
          <TextInput
            alignItems="stretch"
            style={style.TextInputs}
            s
            onChangeText={this.changeText}
            placeholder="Input your address name"></TextInput>
        </View>
        <View>
          <TextInput
            alignItems="stretch"
            style={style.TextInput}
            onChangeText={this.changeText}
            placeholder="Input your public key"></TextInput>
        </View>
        <View>
          <TouchableOpacity
            alignItems="flex-end"
            activeOpacity={0.8}
            style={style.btn}
            onPress={this.clickBtn}>
            <Text>ENTER</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{this.state.text}</Text>
        </View>
      </View>
    );
  }
  changeText = value => {
    this.inputText = value;
  };
  clickBtn = () => {
    this.setState({text: this.inputText});
  };
}

export default PubKeyScreen;
