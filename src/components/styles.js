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
    backgroundColor: '#525252',
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
    backgroundColor: '#525252',
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
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smalltext: {
    fontSize: 15,
    color: '#525252',
    fontStyle: 'normal',
  },
  ListView: {
    width: '100%',
    height: '80%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 50,
    color: 'white',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 10,
    fontSize: 15,
    color: 'white',
  },
  input: {
    width: 50,
    height: 40,
    backgroundColor: 'white',
    color: '#525252',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default style;
