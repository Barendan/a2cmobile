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
  forgotPass: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    alignItems: 'center',
    margin: moderateScale(4),
    marginBottom: 0,
  },
  alternativeLogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authArea: {
    borderBottomWidth: scale(1),
    borderBottomColor: GREY,
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
    fontSize: scale(12),
    color: APP_COLOR,
    // fontWeight: '400',
  },
  bText: {
    fontSize: scale(14),
    color: APP_COLOR,
    // fontWeight: '400',
  },
  thumbContainer: {
    marginTop: moderateScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: scale(14),
  },
  toRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: verticalScale(50),
    // paddingLeft: moderateScale(6),
    fontSize: moderateScale(16),
    backgroundColor: WHITE,
    borderColor: GREY,
    borderWidth: scale(1),
  },
  btnContainer: {
    backgroundColor: APP_COLOR,
    padding: moderateScale(8),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
  },
  btnText: {
    fontSize: moderateScale(16),
    letterSpacing: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
