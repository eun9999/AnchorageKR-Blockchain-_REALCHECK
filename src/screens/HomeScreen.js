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
import SQLite from 'react-native-sqlite-2';

import style from '../components/styles';
import {
  createChannel,
  showNotification,
  handleScheduleNotification,
  handleCancel,
} from './src/notification';

var db = '';
db = SQLite.openDatabase('pubKey.db', '1.0', '', 1);

function HomeScreen({navigation}) {
  let [addressList, setAddressList] = useState([]);
  let [nameList, setNameList] = useState([]);
  let [txInfo, setTxInfo] = useState([]);
  let [userID, setUserID] = useState('');
  useEffect(() => {
    createChannel();
    view();
  }, []);

  const view = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM ID', [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          setUserID(res.rows.item(0).id);
        }
      });
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = [];
        var temp2 = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i).key);
          temp2.push(res.rows.item(i).name);
        }
        setAddressList(temp);
        setNameList(temp2);
        console.log(addressList);
      });
    });
  };

  const importaddress = async addr => {
    try {
      for (let i = 0; i < addr.length; i++) {
        const response = await axios.get(
          'http://118.47.21.114:5000/api/importaddress/' + addr,
        );
      }
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.log(e);
    }
  };

  const addressApiCall = async addr => {
    const data = {
      ID: userID,
      addr: addr,
    };
    axios
      .post('http://118.47.21.114:5000/api/listtransactions', data)
      .then(function (response) {
        setTxInfo(response.data);
        console.log('txinfo : ', txInfo.result.details);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  let listItemView = item => {
    return (
      <View style={style.FlatListView}>
        <View>
          <Text style={style.smalltext}> txid : {item.result.txid}</Text>
          <Text style={style.smalltext}>
            {' '}
            address : {item.result.details.address}
          </Text>

          <Text style={style.smalltext}> amount : {item.result.amount}</Text>
          <Text style={style.smalltext}>
            {' '}
            confirmations : {item.result.confirmations}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.root}>
      <View style={style.Header}>
        <Text style={style.text}> Watch Bot </Text>
      </View>
      <View style={style.container}>
        <View style={style.nameContainer}>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => importaddress(addressList)}>
            <Text style={style.middletext}>importAddress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList)}>
            <Text style={style.middletext}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.Body}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <FlatList
            data={txInfo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </KeyboardAvoidingView>
      </View>

      <View style={style.container}>
        <TouchableOpacity
          style={style.nameButton}
          activeOpacity={0.6}
          onPress={() => showNotification('watchbot', 'hello', 'message')}>
          <Text style={style.text}>notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
