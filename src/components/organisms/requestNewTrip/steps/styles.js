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
  content: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callToActionBtnHolder: {
    marginTop: 'auto',
    alignSelf: 'center',
    width: '100%',
    marginBottom: 20,
  },
  /* Here style the text of your button */
  customBtnText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  /* Here style the background of your button */
  customBtnBG: {
    backgroundColor: CANCEL,
    paddingVertical: 10,
    borderRadius: 30,
    width: '100%',
  },
  customBtnBGBack: {
    backgroundColor: GRAY_BLUE,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 30,
    width: '100%',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
