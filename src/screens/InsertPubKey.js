import React, {useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import SQLite from 'react-native-sqlite-2';
import style from '../components/styles';
import Icon from 'react-native-vector-icons/Ionicons';

var db = '';
if ((db = SQLite.openDatabase('pubKey.db', '1.0', '', 1))) {
  console.log('success');
} else {
  console.log('fail');
}

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userPubKey, setUserPubKey] = useState('');
  let [list, setList] = useState([]);

  useEffect(() => {
    view();
  }, []);

  let registerKey = () => {
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userPubKey) {
      alert('Please fill PubKey');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS pubKey(name TEXT, key TEXT PRIMARY KEY NOT NULL)',
      );
      tx.executeSql(
        'INSERT INTO pubKey (name, key) VALUES (:userName, :userPubKey)',
        [userName, userPubKey],
      );
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
          setList(temp);
        }
      });
    });
    console.log(list);
    setUserName('');
    setUserPubKey('');
  };

  let view = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        setList(temp);
        console.log(list);
      });
    });
  };

  let DeleteItem = addr => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM pubKey WHERE key=:addr', [addr]);
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        var temp = [];
        setList([]);
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
          setList(temp);
        }
      });
    });
  };

  let listItemView = item => {
    return (
      <View
        key={item.key}
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
          <Text style={style.smalltext}>{item.name}</Text>
          <Text style={style.smalltext}>{item.key}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{}}
            activeOpacity={0.8}
            hitSlop={{top: 32, bottom: 32, left: 32, right: 32}}
            onPress={() => {
              DeleteItem(item.key);
            }}>
            <Text>
              <Icon name="close-outline" size={40} color={'#424242'} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#525252'}}>
        <View style={{flex: 1}}>
          <View
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <Mytextinput
              placeholder="Enter Name"
              value={userName}
              onChangeText={userName => setUserName(userName)}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Address"
              value={userPubKey}
              onChangeText={userPubKey => setUserPubKey(userPubKey)}
              maxLength={256}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mybutton title="Submit" customClick={registerKey} />
            <Text style={style.text}>Address List</Text>
            <View style={{flex: 1, backgroundColor: '#525252'}}>
              <KeyboardAvoidingView style={{flex: 1}}>
                <FlatList
                  data={list}
                  renderItem={({item}) => listItemView(item)}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
