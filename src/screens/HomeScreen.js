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
import Icon from 'react-native-vector-icons/Ionicons';
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
  let [txInfo, setTxInfo] = useState([]);

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
    for (let i = 0; i < addressList.length; i++) {
      addressApiCall(addressList[i]);
    }
  }, []);

  let listItemView = item => {
    return (
      <View
        key={item.tx_hash}
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
          <Text style={style.smalltext}> value : {item.value}</Text>
          <Text style={style.smalltext}> confirmations : {item.confirmations}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.root}>
      <View style={style.Header}>
        <Text style={style.text}> Watch Bot </Text>
      </View>
      <View style={style.Body}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <FlatList 
            data={txInfo.txrefs}
            renderItem={({item}) => listItemView(item)}
          />
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
    backgroundColor: '#525252',
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
