import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Button,
  KeyboardAvoidingView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createChannel,
  showNotification,
  handleScheduleNotification,
  handleCancel,
} from './src/notification';

import Icon from 'react-native-vector-icons/Ionicons';
import SQLite from 'react-native-sqlite-2';

import style from '../components/styles';
import {create} from 'eslint/lib/rules/*';

var db = '';
db = SQLite.openDatabase('pubKey.db', '1.0', '', 1);

function HomeScreen({navigation}) {
  let [addressList, setAddressList] = useState([]);

  var info = [];

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i).key);
          setAddressList(temp);
        }
      });
    });
    console.log(addressList);
    const addressApiCall = async addr => {
      try {
        const response = await axios.get(
          'https://api.blockcypher.com/v1/btc/main/addrs/' + addr,
        );
        console.log(response.data);
        // console.log(response.data.address + '\'s info load success');
      } catch (e) {
        console.error(addr + "'s info load failed");
      }
    };
    for (let i = 0; i < addressList.length; i++) {
      addressApiCall(addressList[i]);
    }
  }, []);

  return (
    <SafeAreaView style={style.root}>
      <View style={style.Header}>
        <Text style={{color: 'white'}}>Watch Bot</Text>
      </View>
      <View style={style.Body}>
        <Text>body</Text>
        <KeyboardAvoidingView style={{flex: 1}}>
          <FlatList />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.container}>
        <Text>Push Notification</Text>
        <TouchableOpacity
          activeOpacity={(0, 6)}
          onPress={() => showNotification('watchbot', 'hello', 'message')}>
          <View style={styles.button}>
            <Text style={styles.button}>Click me to get notification</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 24,
    marginTop: 16,
  },
  buttonTitle: {
    color: 'white',
  },
});
