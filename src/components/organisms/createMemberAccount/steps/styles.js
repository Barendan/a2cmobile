import { StyleSheet } from 'react-native';
import { ERROR, BLUE, APP_COLOR } from '_styles/colors';
import { FONT_SIZE_18 } from '_styles/typography';
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
  input: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderRadius: 2,
    marginBottom: '10%',
    alignSelf: 'center'
  },
  mainContainer: {
    height: '80%',
  },
  formContainer: {
    width: '100%',
    marginTop: '6%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    height: '100%',
    alignItems: 'center'
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
  linkText: {
    color: BLUE,
    fontSize: FONT_SIZE_18
  },
  highlightText: {
    color: BLUE,
    fontWeight: 'bold'
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  optionsIcon: {
    backgroundColor: 'transparent',
    marginLeft: 5
  },
  toRow: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  bText: {
    color: APP_COLOR,
    fontWeight: '500'
},
});
