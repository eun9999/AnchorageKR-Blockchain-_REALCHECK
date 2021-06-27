import React, {useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import style from '../components/styles';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

const placeholder = {
  label: 'min',
  value: null,
};
const placeholder2 = {
  label: 'sec',
  value: null,
};

const App = (props) => {
  const [isSelected, setSelection] = useState('');
  const [bisSelected, bsetSelection] = useState('');
  const [refreshisSelected, refreshsetSelection] = useState('');

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
      </View>
      <View style={{flexDirection: 'row', backgroundColor: '#525252'}}>
        <RNPickerSelect
          onValueChange={value => console.log(value)}
          placeholder={placeholder}
          style={pickerSelectStyles}
          items={[
            {label: '00', value: '00'},
            {label: '01', value: '01'},
            {label: '02', value: '02'},
            {label: '03', value: '03'},
            {label: '04', value: '04'},
            {label: '05', value: '05'},
            {label: '06', value: '06'},
            {label: '07', value: '07'},
            {label: '08', value: '08'},
            {label: '09', value: '09'},
            {label: '10', value: '10'},
            {label: '11', value: '11'},
            {label: '12', value: '12'},
            {label: '13', value: '13'},
            {label: '14', value: '14'},
            {label: '15', value: '15'},
            {label: '16', value: '16'},
            {label: '17', value: '17'},
            {label: '18', value: '18'},
            {label: '19', value: '19'},
            {label: '20', value: '20'},
            {label: '21', value: '21'},
            {label: '22', value: '22'},
            {label: '23', value: '23'},
            {label: '24', value: '24'},
            {label: '25', value: '25'},
            {label: '30', value: '30'},
          ]}
        />

        <Text style={style.label}>분</Text>

        <RNPickerSelect
          onValueChange={value => console.log(value)}
          placeholder={placeholder2}
          style={pickerSelectStyles}
          items={[
            {label: '00', value: '00'},

            {label: '10', value: '10'},

            {label: '20', value: '20'},

            {label: '30', value: '30'},

            {label: '40', value: '40'},

            {label: '50', value: '50'},
          ]}
        />

        <Text style={style.label}>초</Text>
      </View>
      <View style={style.container}>
        <TouchableOpacity
          style={style.nameButton}
          activeOpacity={0.6}
          onPress={() => {
            Alert.alert(
              '로그아웃',
              '로그아웃하시겠습니까?',
              [
                {
                  text: '아니오',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: '예',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text style={style.text}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};

export default App;

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    width: 150,
    height: 40,
    fontSize: 16,
    borderColor: 'purple',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingRight: 30,
    color: 'white',
  },
});
