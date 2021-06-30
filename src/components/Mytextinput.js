import React from 'react';
import {View, TextInput} from 'react-native';

const Mytextinput = props => {
  return (
    <View
      style={{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: 'white',
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#525252"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        autoCapitalize={'none'}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinput;