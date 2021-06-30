import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#8B1919',
    borderRadius: 8,
    color: 'white',
    padding: 10,
    marginTop: 8,
    marginLeft: 120,
    marginRight: 120,
    marginBottom: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default Mybutton;