import { StyleSheet } from 'react-native';
import { CANCEL, GRAY_BLUE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

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
    fontSize: scaleFont(12),
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
    height: '80%',
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
});
