import { StyleSheet, Platform } from 'react-native';
import { ERROR, APP_COLOR } from '_styles/colors';
import { scaleFont } from '_styles/mixins';
import { FONT_SIZE_18 } from '_styles/typography';

export default StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: 18,
    marginBottom: 10,
  },
  body: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: 50,
  },
  levelOfService: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
    color: '#47494d',
  },
  tripNumber: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#366999',
  },
  specialNeedsLabel: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#276092',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: Platform.OS === "ios" ? '80%' : '75%',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    height: '100%',
  },
  footer: {
    width: '100%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row'
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
    borderRadius: 30,
  },
  errorMessage: {
    color: ERROR,
    fontSize: FONT_SIZE_18
  },
  loadingMessage: {
    color: APP_COLOR,
    fontSize: FONT_SIZE_18
  },
  completedStepContainer: {
    height: '90%',
  },
  completedformContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmark: {
    height: 100,
  },
});
