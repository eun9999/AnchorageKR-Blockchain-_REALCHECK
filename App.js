import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Button, TextInput, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import style from './src/components/styles';
import Mytextinput from './src/components/Mytextinput';
import Mybutton from './src/components/Mybutton';
import { RequestHeaderFieldsTooLarge } from 'http-errors';

function App() {
  let [count, setCount] = useState([]);
  let [mempool, setMempool] = useState([]);
  let [trans, setTrans] = useState([]);
  let [userID, setUserID] = useState('');
  let [userPSWD, setUserPSWD] = useState('');
  const headers = {
    'content-type': 'text/plain;',
  };
  useEffect(() => {
  }, []);

  const registerKey = () => {
    console.log(userID);
    console.log(userPSWD);
    const data = {
      ID: userID,
      PSWD: userPSWD,
    };
    fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data), //JSON화 하기
    });
    alert("등록 완료");
  }
  return (
      <View style={{flex: 1}}>
          <View
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <Mytextinput
              placeholder="Enter ID"
              value={userID}
              onChangeText={userID => setUserID(userID)}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter PSWD"
              value={userPSWD}
              onChangeText={userPSWD => setUserPSWD(userPSWD)}
              maxLength={20}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mybutton title="Submit" customClick={registerKey} />
          </View>
        </View>
  );
}
export default App;
