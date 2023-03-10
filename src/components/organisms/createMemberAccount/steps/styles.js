import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ERROR, BLUE, APP_COLOR } from '_styles/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// let ScreenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
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
  bodyWrapper: {
    marginBottom: moderateScale(50),
  },
  mainContainer: {
    // height: Platform.OS === 'ios' ? '80%' : '88%',
    height: '73%',
    marginHorizontal: 10,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    // marginTop: Platform.OS === 'ios' ? '6%' : '3%',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingTop: '10%',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    // marginBottom: 25,
    // backgroundColor: 'red',
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
    fontSize: moderateScale(11),
    lineHeight: 15
  },
  linkText: {
    // marginTop: 3,
    color: BLUE,
    fontSize: moderateScale(10),
  },
  highlightText: {
    color: BLUE,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 0,
    marginBottom: moderateScale(-10),
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: scale(9),
    letterSpacing: 0.7,
  },
  listItemHeader: {
    fontSize: scale(10),
    marginBottom: '1%',
    color: 'black',
  },
  optionsIcon: {
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  toRow: {
    flexDirection: 'row',
    marginBottom: -6,
  },
  bText: {
    color: APP_COLOR,
    fontWeight: '500',
  },
  input: {
    // width: '95%',
    height: verticalScale(40),
    borderWidth: 2,
    borderRadius: 2,
    marginBottom: '10%',
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
  nameGreeting: {
    marginBottom: '5%',
    fontSize: scale(14),
  },
  radioText: {
    padding: moderateScale(2),
    fontSize: moderateScale(12),
    marginLeft: '3%',
  },
  radioGroup: {
    marginLeft: '5%',
  },
  tempCode: {
    fontSize: moderateScale(12),
  },
});
