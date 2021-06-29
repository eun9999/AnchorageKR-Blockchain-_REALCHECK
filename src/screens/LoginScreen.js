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

import axios from 'axios';
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

    axios
      .post('http://172.20.10.10:5000/api/user/login', loginData)
      .then(function (response) {
        console.log(response.data.msg);
        if (response.data.msg == '로그인 성공 !') {
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
              <Mytextinput
                placeholder="Enter Password"
                value={userPSWD}
                onChangeText={userPSWD => setUserPSWD(userPSWD)}
                maxLength={20}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
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
