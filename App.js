import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import style from './src/components/styles';

function App() {
  let [count, setCount] = useState([]);
  let [mempool, setMempool] = useState([]);
  let [trans, setTrans] = useState([]);
  const ApiCall = async addr => {
    try {
      const response = await axios.get(
        'http://192.168.0.185:5000/api/getblockcount',
      );
      setCount(response.data.result);
      console.log(response.data.result);
      //console.log(response.data);
      //console.log(response.data.address + '\'s info load success');
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.error(e);
    }
  };
  const getrawmempool = async addr => {
    try {
      const response = await axios.get(
        'http://192.168.0.187:4444/api/getrawmempool',
      );
      setMempool(response.data.result);
      console.log(response.data.result);
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.error(e);
    }
  };
  const getrawtransaction = async addr => {
    try {
      const temp =
        '13a4ca912c23710ba7638d6dae792ccd1cc449196b08e92439b254655fbdac68';
      const response = await axios.get(
        'http://192.168.0.187:4444/api/getrawtransaction/' + temp,
      );
      setTrans(response.data.result.confirmations);
      console.log(response.data.result.confirmations);
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.error(e);
    }
  };
  const importaddress = async () => {
    try {
      const temp = 'tb1qgsqn26a3jk5m4pvvt2swy3q0e4sg2remwxaxlx';
      const response = await axios.get(
        'http://192.168.0.187:4444/api/importaddress/' + temp,
      );
      console.log(response);
    } catch (e) {
      console.error(addr + "'s info load failed");
      console.log(e);
    }
  };

  useEffect(() => {
    ApiCall();
    getrawmempool();
    getrawtransaction();
  }, []);

  return (
    <View>
      <View>
        <Text>Bitcoin API</Text>
        <Text></Text>
        <Text>Number of blocks: {count}</Text>
        <Text></Text>
        <Text>getrawmempool : {mempool}</Text>
        <Text></Text>
        <Text>trans : {trans}</Text>
        
      </View>
      <View>
        <TouchableOpacity
          style={style.nameButton}
          activeOpacity={0.6}
          onPress={() => importaddress()}>
          <Text>importaddress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default App;
