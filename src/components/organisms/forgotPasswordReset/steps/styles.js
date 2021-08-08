import { StyleSheet, Platform } from 'react-native';
import { ERROR, BLUE } from '_styles/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: scale(2),
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: scale(18),
    marginBottom: scale(10),
  },
  body: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: scale(50),
  },
  mainContainer: {
    height: Platform.OS === 'ios' ? '80%' : '75%',
  },
  formContainer: {
    width: '100%',
    marginTop: Platform.OS === 'ios' ? '6%' : '3%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    height: '95%',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  backButton: {
    height: verticalScale(40),
    marginRight: scale(5),
    borderRadius: 30,
  },
  forwardButton: {
    flex: 1,
    height: verticalScale(40),
    borderColor: '#F5F5F5',
    borderRadius: 30,
  },
  errorMessage: {
    color: ERROR,
    fontSize: scale(18),
  },
  linkText: {
    color: BLUE,
    fontSize: scale(18),
  },
  highlightText: {
    color: BLUE,
    fontWeight: 'bold',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  optionsIcon: {
    backgroundColor: 'transparent',
    marginLeft: scale(5),
  },
  nameGreeting: {
    marginBottom: '5%',
    fontSize: scale(12),
  },
  input: {
    // width: '90%',
    height: verticalScale(30),
    borderWidth: scale(1),
    borderRadius: scale(1),
    marginBottom: '7%',
    alignSelf: 'center',
  },
  inputText: {
    paddingVertical: moderateScale(2),
    fontSize: moderateScale(14),
  },
  inputLabel: {
    color: '#8F9BB3',
    fontSize: moderateScale(10),
    paddingBottom: '0.5%',
  },
});
