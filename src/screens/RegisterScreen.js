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
      .post('http://172.20.10.10:5000/api/user/register', data)
      .then(function (response) {
        console.log(response.data.msg);
        setErrortext(response.data.msg);
      })
      .catch(function (error) {
        console.log(error.response);
      });
    setUserID('');
    setUserPSWD('');
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
            <Mytextinput
              placeholder="Enter PSWD"
              value={userPSWD}
              onChangeText={userPSWD => setUserPSWD(userPSWD)}
              maxLength={20}
              multiline={true}
              secureTextEntry={true}
              style={{padding: 10}}
            />
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
