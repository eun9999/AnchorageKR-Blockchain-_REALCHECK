import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  FlatList,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import SQLite from 'react-native-sqlite-2';
import style from '../components/styles';

var db = '';
if ((db = SQLite.openDatabase('pubKey.db', '1.0', '', 1))) {
  console.log('success');
} else {
  console.log('fail');
}

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userPubKey, setUserPubKey] = useState('');
  // let [nameList, setNameList] = useState([]);
  // let [PubKeyList, setPubKeyList] = useState([]);
  let [list, setList] = useState([]);

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
      //tx.executeSql('DELETE FROM pubKey');
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
          console.log(res.rows.length);
          temp.push(res.rows.item(i));
          setList(temp);
        }
        console.log(list);
      });
    });

    setUserName('');
    setUserPubKey('');
    // setNameList([...nameList, userName]);
    // setPubKeyList([...PubKeyList, userPubKey]);
    console.log('list:');
    console.log(list);
  };

  let Delete = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM pubKey');
    });
    setList([]);
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
          padding: 10,
          borderColor: '#424242',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 8,
        }}>
        <Text>Name : {item.name}</Text>
        <Text>Key : {item.key}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
            <Mybutton title="Delete" customClick={Delete} />
            <Text style={style.text}>Address List</Text>
            <View style={{flex: 1, backgroundColor: 'white'}}>
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
