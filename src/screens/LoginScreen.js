// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from '../../Screen/Components/Loader';
import Mytextinput from '../components/Mytextinput';
import style from '../components/styles';

import SQLite from 'react-native-sqlite-2';
import axios from 'axios';

var db = '';
if ((db = SQLite.openDatabase('pubKey.db', '1.0', '', 1))) {
  console.log('success2');
} else {
  console.log('fail');
}

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  let [userID, setUserID] = useState('');
  let [userPSWD, setUserPSWD] = useState('');

  const login = () => {
    const loginData = {
      ID: userID,
      PSWD: userPSWD,
    };
    console.log('loginData : ', loginData);
    axios
      .post('http://118.47.21.114:5000/api/user/login', loginData)
      .then(function (response) {
        console.log(response.data.msg);
        if (response.data.msg == '로그인 성공 !') {
          console.log('로그인성공', userID);
          db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ID(id char(10))');
            // tx.executeSql('SELECT COUNT(*) FROM ID', function (tx, res) {
            //   if (res == 1) {
            //     tx.executeSql('DELETE FROM ID');
            //     tx.executeSql('INSERT INTO ID (id) VALUES (:userID)', [userID]);
            //   }
            // });
            tx.executeSql('INSERT INTO ID (id) VALUES(:userID)', [userID]);
            const temp = [];
            tx.executeSql('SELECT * FROM ID', [], function (tx, res) {
              for (let i = 0; i < res.rows.length; ++i) {
                console.log('login id store :', res.rows.item(i).id);
                temp.push(res.rows.item(0).id);
              }
              console.log('temp: ', temp);
            });
          });
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <View style={style.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Text style={style.text}> WATCHBOT</Text>
              <Text style={style.Largetext}> LOGIN</Text>
            </View>

            <View style={style.LoginSectionStyle}>
              <Mytextinput
                placeholder="Enter ID"
                value={userID}
                onChangeText={userID => setUserID(userID)}
                style={{padding: 10}}
              />
              <View
                style={{
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 10,
                  borderRadius: 5,
                  backgroundColor: 'white',
                }}>
                <TextInput
                  placeholder="Enter Password"
                  value={userPSWD}
                  onChangeText={userPSWD => setUserPSWD(userPSWD)}
                  maxLength={20}
                  multiline={false}
                  style={{textAlignVertical: 'top', padding: 10}}
                  secureTextEntry={true}
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#525252"
                  autoCapitalize={'none'}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {errortext != '' ? (
              <Text style={style.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={style.buttonStyle}
              activeOpacity={0.5}
              onPress={login}>
              <Text style={style.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={style.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
