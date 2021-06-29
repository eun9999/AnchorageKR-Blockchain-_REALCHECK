// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Loader from '../../Screen/Components/Loader';
import Mybutton from '../components/Mybutton';
import Mytextinput from '../components/Mytextinput';
import style from '../components/styles';

const RegisterScreen = props => {
  const [errortext, setErrortext] = useState('');
  let [userID, setUserID] = useState('');
  let [userPSWD, setUserPSWD] = useState('');

  const registerKey = () => {
    const data = {
      ID: userID,
      PSWD: userPSWD,
    };
    axios
      .post('http://118.47.21.114:5000/api/user/register', data)
      .then(function (response) {
        console.log(response.data.msg);
        setErrortext(response.data.msg);
      })
      .catch(function (error) {
        console.log(error.response);
      });
    setUserID('');
    setUserPSWD('');
    axios
      .get('http://118.47.21.114:5000/api/user/register')
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#525252'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={style.Largetext}> REGISTER</Text>
        </View>

        <KeyboardAvoidingView enabled>
          <View style={style.SectionStyle}>
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

          <Mybutton title="Register" customClick={registerKey} />
          {errortext != '' ? (
            <Text style={style.errorTextStyle}>{errortext}</Text>
          ) : null}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
