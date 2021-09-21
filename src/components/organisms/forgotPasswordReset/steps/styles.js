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
    fontSize: moderateScale(24),
    marginBottom: moderateScale(4),
  },
  body: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  mainContainer: {
    height: Platform.OS === 'ios' ? '80%' : '90%',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? '6%' : '3%',
    backgroundColor: '#FFFFFF',
  },
  container: {
    height: '78%',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    paddingTop: moderateScale(6),
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    height: moderateScale(40),
    paddingVertical: moderateScale(0),
    borderRadius: 30,
  },
  forwardButton: {
    flex: 5,
    marginLeft: moderateScale(6),
    paddingVertical: moderateScale(0),
    borderColor: '#F5F5F5',
    borderRadius: 30,
  },
  errorMessage: {
    color: ERROR,
    fontSize: moderateScale(14),
    paddingVertical: moderateScale(6),
    fontWeight: 'bold',
  },
  linkText: {
    color: BLUE,
    fontSize: moderateScale(14),
  },
  highlightText: {
    color: BLUE,
    fontWeight: 'bold',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: scale(10),
  },
  optionsIcon: {
    backgroundColor: 'transparent',
  },
  nameGreeting: {
    marginBottom: '6%',
    fontSize: scale(12),
  },
  input: {
    flex: 1,
    borderWidth: scale(1),
    borderRadius: scale(1),
    marginBottom: moderateScale(14),
    alignSelf: 'center',
    padding: 0,
  },
  inputText: {
    paddingVertical: moderateScale(2),
    marginLeft: moderateScale(-2),
    fontSize: moderateScale(14),
  },
  inputLabel: {
    color: '#8F9BB3',
    fontSize: moderateScale(10),
    paddingBottom: '0.5%',
  },
});
