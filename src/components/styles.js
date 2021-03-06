import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Header: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
  },
  Title: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
    backgroundColor: 'green',
  },
  Body: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Footer: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 30,
    marginTop: 30,
    color: '#424242',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ListView: {
    width: '100%',
    height: '80%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  TextInput: {
    width: '60%',
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#424242',
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
    backgroundColor: '#424242',
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
    backgroundColor: '#424242',
    borderRadius: 8,
  },
  container: {

    alignItems: "center",
    justifyContent: "center",

  },
  checkboxContainer: {
    flexDirection: "row",

    marginTop: 50,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 10,
  },
});

export default style;
