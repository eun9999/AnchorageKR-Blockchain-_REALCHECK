import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({name: 'pubKey.db'});

const ViewAll = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM pubKey', [], (tx, res) => {
      var temp = [];
      for (let i = 0; i < res.rows.length; ++i) temp.push(res.rows.item(i));
      setFlatListItems(temp);
    });
  });
  let listViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  let listItemView = item => {
    return (
      <View
        key={item.userPubKey}
        style={{backgroundColor: 'white', padding: 20}}>
        <Text>Name: {item.userName}</Text>
        <Text>Key: {item.userPubKey}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAll;
