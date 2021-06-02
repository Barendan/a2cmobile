import {StyleSheet} from 'react-native';
import { ERROR, BLUE } from '_styles/colors';
import { FONT_SIZE_18 } from '_styles/typography';

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
    flex: 1,
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
  backButton: {
    height: 40,
    marginRight: 5,
    borderRadius: 30,  
  },
  forwardButton: {
    flex: 1,
    height: 40,
    borderColor: '#F5F5F5',
    borderRadius: 30
  },
  bottomButtonContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  loadingView: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  errorMessage: {
    color: ERROR,
    fontSize: FONT_SIZE_18
  },
  linkText: {
    color: BLUE,
    fontSize: FONT_SIZE_18
  },
  highlightText: {
    color: BLUE,
    fontWeight: 'bold'
  },
});
