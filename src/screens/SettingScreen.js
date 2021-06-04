import React, {Component, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import style from '../components/styles';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [isSelected, setSelection] = useState('');
  const [bisSelected, bsetSelection] = useState('');
  const [refreshisSelected, refreshsetSelection] = useState('');
  let options = [
    {value: 0, label: '10'},
    {value: 1, label: '11'},
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#525252'}}>
      <View>
        <Text style={style.text}>설정</Text>
      </View>

      <View style={style.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={style.checkbox}
        />

        <Text style={style.label}>지갑잔고 변동시 알림</Text>
      </View>

      <Text style={style.label}>
        Is CheckBox selected: {isSelected ? '👍' : '👎'}
      </Text>

      <View style={style.checkboxContainer}>
        <CheckBox
          value={bisSelected}
          onValueChange={bsetSelection}
          style={style.checkbox}
        />

        <Text style={style.label}>Transection Confirm 알림</Text>
      </View>

      <Text style={style.label}>
        Is CheckBox selected: {bisSelected ? '👍' : '👎'}
      </Text>

      <View style={style.checkboxContainer}>
        <CheckBox
          value={refreshisSelected}
          onValueChange={refreshsetSelection}
          style={style.checkbox}
        />
        <Text style={style.label}>refresh 수동 설정</Text>

        <TextInput
          style={style.input}
          placeholderTextColor="#525252"
          placeholder="min"
        />

        <Text style={style.label}>분</Text>

        <TextInput
          style={style.input}
          placeholderTextColor="#525252"
          placeholder="sec"
        />

        <Text style={style.label}>초</Text>
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
