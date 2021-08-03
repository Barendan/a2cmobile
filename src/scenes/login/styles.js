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
    // marginVertical: verticalScale(10),
  },
  forgotPass: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    alignItems: 'center',
    paddingVertical: verticalScale(18),
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
    fontSize: scale(14),
    color: APP_COLOR,
    fontWeight: '400',
  },
  bText: {
    fontSize: scale(14),
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
    fontSize: scale(14),
    backgroundColor: WHITE,
    borderColor: GREY,
    borderWidth: scale(1),
  },
  btnContainer: {
    backgroundColor: APP_COLOR,
    padding: scale(4),
  },
  btnText: {
    fontSize: scale(12),
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
