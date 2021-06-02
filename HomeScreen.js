import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, KeyboardAvoidingView, FlatList, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SQLite from 'react-native-sqlite-2';

import style from '../components/styles';

var db = '';
db = SQLite.openDatabase('pubKey.db', '1.0', '', 1);

function HomeScreen({navigation}) {
  let [addressList, setAddressList] = useState([]);

  var info = [];

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = []
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i).key);
          setAddressList(temp);
        }
      });
    });
    console.log(addressList);
    const addressApiCall = async (addr) => {
      try{
        const response = await axios.get('https://api.blockcypher.com/v1/btc/main/addrs/'+addr);
        console.log(response.data);
        // console.log(response.data.address + '\'s info load success');
      } catch(e) {
        console.error(addr + '\'s info load failed');
      }
    };
    for (let i = 0; i < addressList.length; i++) {
      addressApiCall(addressList[i]);
    }
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView style={{flex: 1}}>
                <FlatList
                  
                />
              </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
