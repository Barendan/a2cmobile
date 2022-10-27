import { StyleSheet, Platform } from 'react-native';
import { ERROR, APP_COLOR } from '_styles/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: moderateScale(50),
  },
  levelOfService: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: '#47494d',
  },
  tripNumber: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#366999',
  },
  specialNeedsLabel: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#276092',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: '100%',
    padding: '5%',
    paddingTop: Platform.OS === 'ios' ? '7%' : null,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(20),
  },
  container: {
    height: '100%',
  },
  footer: {
    width: '100%',
    marginBottom: '5%',
    paddingHorizontal: '5%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    height: moderateScale(40),
    paddingVertical: moderateScale(0),
    marginRight: moderateScale(6),
    borderRadius: 30,
  },
  forwardButton: {
    flex: 4,
    height: moderateScale(40),
    paddingVertical: moderateScale(0),
    borderColor: '#F5F5F5',
    borderRadius: 30,
  },
  errorMessage: {
    color: ERROR,
    fontSize: moderateScale(12),
    paddingBottom: moderateScale(4),
  },
  loadingMessage: {
    color: APP_COLOR,
    fontSize: moderateScale(18),
  },
  completedStepContainer: {
    height: '90%',
  },
  completedformContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    height: verticalScale(100),
  },
  summaryTitle: {
    fontSize: moderateScale(14),
  },
  summarySubtitle: {
    fontSize: moderateScale(12),
    color: '#8F9BB3',
  },
});
