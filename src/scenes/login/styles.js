import { StyleSheet } from 'react-native';
import { WHITE, GREY, APP_COLOR } from '_styles/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  keyboardAvoidViewing: { flex: 1 },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(32),
    paddingHorizontal: verticalScale(16),
  },
  logoImage: {
    resizeMode: 'contain',
    width: verticalScale(300),
    height: verticalScale(100),
    alignSelf: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: scale(20),
  },
  spacing: {
    marginVertical: verticalScale(10),
  },
  forgotPass: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(19),
  },
  alternativeLogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authArea: {
    borderBottomWidth: scale(1),
    borderBottomColor: GREY,
    paddingBottom: verticalScale(10),
  },
  btnContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  altLoginBtn: {
    margin: 5,
  },
  pText: {
    fontSize: scale(15),
    color: APP_COLOR,
    fontWeight: '400',
  },
  bText: {
    fontSize: scale(15),
    color: APP_COLOR,
    fontWeight: '500',
  },
  thumbContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    fontSize: scale(15),
  },
  toRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    fontSize: scale(15),
    borderColor: '#F5F5F5',
    borderRadius: 30,
  },
  signUpBtn: {
    fontSize: scale(15),
    borderRadius: 30,
    //borderColor: '#F5F5F5',
  },
  input: {
    fontSize: scale(15),
    backgroundColor: WHITE,
    borderColor: GREY,
    borderWidth: 1,
  },
});
