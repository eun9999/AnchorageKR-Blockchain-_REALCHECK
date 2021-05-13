import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import SQLite from 'react-native-sqlite-2';

var db = '';
if ((db = SQLite.openDatabase('pubKey.db', '1.0', '', 1))) {
  console.log('success');
} else {
  console.log('fail');
}

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userPubKey, setUserPubKey] = useState('');

  let register_user = () => {
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
      tx.executeSql('SELECT * FROM pubKey', [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item: ', res.rows.item(i));
        }
      });
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={userName => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter PubKey"
                onChangeText={userPubKey => setUserPubKey(userPubKey)}
                maxLength={225}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
