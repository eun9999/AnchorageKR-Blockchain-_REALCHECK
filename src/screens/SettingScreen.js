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


const placeholder = {
  label: 'min',
  value: null,
};
const placeholder2 = {
  label: 'sec',
  value: null,
};

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
      <View style={{flexDirection: 'row' , backgroundColor: '#525252' }}>
         
          <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={placeholder}
              style={pickerSelectStyles}
              items={[
                { label: '00', value: '00' },
                { label: '01', value: '01' },
                { label: '02', value: '02' },
                { label: '03', value: '03' },
                { label: '04', value: '04' },
                { label: '05', value: '05' },
                { label: '06', value: '06' },
                { label: '07', value: '07' },
                { label: '08', value: '08' },
                { label: '09', value: '09' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
                { label: '13', value: '13' },
                { label: '14', value: '14' },
                { label: '15', value: '15' },
                { label: '16', value: '16' },
                { label: '17', value: '17' },
                { label: '18', value: '18' },
                { label: '19', value: '19' },
                { label: '20', value: '20' },
                		
                { label: '21', value: '21' },
                { label: '22', value: '22' },
                { label: '23', value: '23' },
                { label: '24', value: '24' },
                { label: '25', value: '25' },
                { label: '26', value: '26' },
                { label: '27', value: '27' },
                { label: '28', value: '28' },
                { label: '29', value: '29' },
                { label: '30', value: '30' },

                		
                { label: '31', value: '31' },
                { label: '32', value: '32' },
                { label: '33', value: '33' },
                { label: '34', value: '34' },
                { label: '35', value: '35' },
                { label: '36', value: '36' },
                { label: '37', value: '37' },
                { label: '38', value: '38' },
                { label: '39', value: '39' },
                { label: '40', value: '40' },

                		
                { label: '41', value: '41' },
                { label: '42', value: '42' },
                { label: '43', value: '43' },
                { label: '44', value: '44' },
                { label: '45', value: '45' },
                { label: '46', value: '46' },
                { label: '47', value: '47' },
                { label: '48', value: '48' },
                { label: '49', value: '49' },
                { label: '50', value: '50' },

                		
                { label: '51', value: '51' },
                { label: '52', value: '52' },
                { label: '53', value: '53' },
                { label: '54', value: '54' },
                { label: '55', value: '55' },
                { label: '56', value: '56' },
                { label: '57', value: '57' },
                { label: '58', value: '58' },
                { label: '59', value: '59' },
                { label: '60', value: '60' },

              ]}
          />

          <Text style={style.label}>분</Text>

          <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={placeholder2}
              style={pickerSelectStyles}
              items={[
                { label: '00', value: '00' },
                { label: '01', value: '01' },
                { label: '02', value: '02' },
                { label: '03', value: '03' },
                { label: '04', value: '04' },
                { label: '05', value: '05' },
                { label: '06', value: '06' },
                { label: '07', value: '07' },
                { label: '08', value: '08' },
                { label: '09', value: '09' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
                { label: '13', value: '13' },
                { label: '14', value: '14' },
                { label: '15', value: '15' },
                { label: '16', value: '16' },
                { label: '17', value: '17' },
                { label: '18', value: '18' },
                { label: '19', value: '19' },
                { label: '20', value: '20' },
                		
                { label: '21', value: '21' },
                { label: '22', value: '22' },
                { label: '23', value: '23' },
                { label: '24', value: '24' },
                { label: '25', value: '25' },
                { label: '26', value: '26' },
                { label: '27', value: '27' },
                { label: '28', value: '28' },
                { label: '29', value: '29' },
                { label: '30', value: '30' },

                		
                { label: '31', value: '31' },
                { label: '32', value: '32' },
                { label: '33', value: '33' },
                { label: '34', value: '34' },
                { label: '35', value: '35' },
                { label: '36', value: '36' },
                { label: '37', value: '37' },
                { label: '38', value: '38' },
                { label: '39', value: '39' },
                { label: '40', value: '40' },

                		
                { label: '41', value: '41' },
                { label: '42', value: '42' },
                { label: '43', value: '43' },
                { label: '44', value: '44' },
                { label: '45', value: '45' },
                { label: '46', value: '46' },
                { label: '47', value: '47' },
                { label: '48', value: '48' },
                { label: '49', value: '49' },
                { label: '50', value: '50' },

                		
                { label: '51', value: '51' },
                { label: '52', value: '52' },
                { label: '53', value: '53' },
                { label: '54', value: '54' },
                { label: '55', value: '55' },
                { label: '56', value: '56' },
                { label: '57', value: '57' },
                { label: '58', value: '58' },
                { label: '59', value: '59' },
              ]}
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
    color: 'red',
    // to ensure the text is never behind the icon
  },
});