import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '6%',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: 'black',
    fontSize: 22,
    margin: '10%',
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: '6%',
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  step1: {
    flex: 1,
  },
  step2: {
    flex: 1,
  },
  step3: {
    flex: 1,
  },
  step4: {
    flex: 1,
  },

  input: {
    width: '85%',
    height: 50,
    borderColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderRadius: 2,
    marginBottom: '10%',
  },
  btn: {
    height: 40,
    borderColor: '#F5F5F5',
  },
  bottomButtonContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
    backgroundColor: 'red'
  },
});
