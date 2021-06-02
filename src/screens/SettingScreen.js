import React, {Component, useState} from 'react';
import {Button,  View, Text, StyleSheet,TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import style from '../components/styles';
import CheckBox from '@react-native-community/checkbox';


 const App = () => {
  const [isSelected, setSelection] = useState('');
  const [bisSelected, bsetSelection] = useState('');
  const [refreshisSelected, refreshsetSelection] = useState('');
  return (
    <View>
     
    
     
   
    <View>
      <Text style={style.text}>알림</Text>
      
    </View>

    
    <Text style={style.text}>추적주기</Text>


  
    <View style={style.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={style.checkbox}
        />
      
        <Text style={style.label}>지갑잔고 변동시 알림</Text>
      
    </View>
    
      <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
      
      
      <View style={style.checkboxContainer}>
        <CheckBox
          value={bisSelected}
          onValueChange={bsetSelection}
          style={style.checkbox}
        />
      
        <Text style={style.label}>Transection Confirm 알림</Text>
      
    </View>
    
      <Text>Is CheckBox selected: {bisSelected ? "👍" : "👎"}</Text>

      <View style={style.checkboxContainer}>
        <CheckBox
            value={refreshisSelected}
            onValueChange={refreshsetSelection}
            style={style.checkbox}
          />
        <Text style={style.label}>refresh 수동 설정</Text>
         
        <TextInput
          style={styles.input}
          placeholderTextColor="#9a73ef"
          placeholder="min"
        />

        <Text style={style.label}>분</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="#9a73ef"
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
    paddingTop: 23
  },
  input: {
    width: 40,
    margin: 5,
    height: 30,
    borderColor: "#7a42f4",
    borderWidth: 3,
    fontSize: 10,
    textAlign: "center"
  },
  
});
