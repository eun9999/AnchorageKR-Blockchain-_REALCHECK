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
import SQLite from 'react-native-sqlite-storage';

var db = '';
if ((db = SQLite.openDatabase({name: 'pubKey.db'}))) {
  console.log('success');
} else {
  console.log('fail');
}

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userPubKey, setUserPubKey] = useState('');

  let register_user = () => {
    console.log(userName, userPubKey);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userPubKey) {
      alert('Please fill PubKey');
      return;
    }

    db.transaction(tx => {
      print('eun');
      tx.executeSql(
        'INSERT INTO pubKey (name, pubKey) VALUES (?,?)',
        [userName, userPubKey],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
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
                numberOfLines={5}
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
