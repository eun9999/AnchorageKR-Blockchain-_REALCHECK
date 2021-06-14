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
  useEffect(() => {
    createChannel();
    view();
  }, []);

  const view = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = [];
        var temp2 = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i).key);
          temp2.push(res.rows.item(i).name);
        }
        setAddressList(temp);
        setNameList(temp2);
      });
    });
  };

  const addressApiCall = async addr => {
    try {
      const response = await axios.get(
        'https://api.blockcypher.com/v1/btc/main/addrs/' + addr,
      );
      setTxInfo(response.data);
      //console.log(response.data);
      //console.log(response.data.address + '\'s info load success');
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.error(e);
    }
  };

  let listItemView = item => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 5,
          borderColor: '#424242',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={style.smalltext}> tx_hash : {item.tx_hash}</Text>
          <Text style={style.smalltext}> value(satoshi) : {item.value}</Text>
          <Text style={style.smalltext}>
            {' '}
            confirmations : {item.confirmations}
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
            onPress={() => addressApiCall(addressList[0])}>
            <Text style={style.middletext}>{nameList[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[1])}>
            <Text style={style.middletext}>{nameList[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[2])}>
            <Text style={style.middletext}>{nameList[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[3])}>
            <Text style={style.middletext}>{nameList[3]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[4])}>
            <Text style={style.middletext}>{nameList[4]}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.nameContainer}>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[5])}>
            <Text style={style.middletext}>{nameList[5]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[6])}>
            <Text style={style.middletext}>{nameList[6]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[7])}>
            <Text style={style.middletext}>{nameList[7]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[8])}>
            <Text style={style.middletext}>{nameList[8]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.nameButton}
            activeOpacity={0.6}
            onPress={() => addressApiCall(addressList[9])}>
            <Text style={style.middletext}>{nameList[9]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.Body}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <Text></Text>
          <FlatList
            data={txInfo.txrefs}
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
          <Text style={style.text}>Click me to get notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
