import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  Header: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  Title: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
    backgroundColor: 'white',
  },
  Body: {
    flex: 7,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Footer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 30,
    color: 'orange',
    fontWeight: 'bold',
  },
  TextInput: {
    width: '60%',
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: 'orange',
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },
  btn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  insertBtn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 8,
  },
});

export default style;
