import { StyleSheet, Platform } from 'react-native';
import { ERROR, BLUE, APP_COLOR } from '_styles/colors';
import { FONT_SIZE_18 } from '_styles/typography';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: scale(18),
    marginBottom: moderateScale(10),
  },
  body: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: moderateScale(50),
  },
  mainContainer: {
    height: Platform.OS === 'ios' ? '80%' : '75%',
  },
  formContainer: {
    width: '100%',
    marginTop: '5%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    height: '90%',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  backButton: {
    height: 40,
    marginRight: 5,
    borderRadius: 30,
  },
  forwardButton: {
    flex: 1,
    borderColor: '#F5F5F5',
    borderRadius: 30,
  },
  errorMessage: {
    color: ERROR,
    fontSize: FONT_SIZE_18,
    marginTop: 3,
  },
  linkText: {
    color: BLUE,
    fontSize: FONT_SIZE_18,
  },
  highlightText: {
    color: BLUE,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 0,
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
    marginBottom: -10,
  },
  bText: {
    color: APP_COLOR,
    fontWeight: '500',
  },
  input: {
    width: '90%',
    height: verticalScale(40),
    borderWidth: 2,
    borderRadius: 2,
    marginBottom: Platform.OS === 'ios' ? '10%' : '7%',
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
