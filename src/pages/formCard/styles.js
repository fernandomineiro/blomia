import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '3%',
  },
  header: {
    paddingTop: '2%',
    flexDirection: 'row',
  },
  card: {
    width: '85%',
    height: heightPercentageToDP('25%'),
  },
  templateCard: {
    position: 'relative',
    flex: 1,
  },
  numberCardText: {
    position: 'absolute',
    top: '55%',
    left: '5%',
    zIndex: 10,
    fontFamily: 'Montserrat-SemiBold',
    color: '#969696',
    fontSize: responsiveFontSize(2),
    letterSpacing: widthPercentageToDP('0.5%'),
  },
  nameCardText: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    zIndex: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.5),
    color: '#969696',
    letterSpacing: widthPercentageToDP('0.5%'),
  },
  validCardText: {
    position: 'absolute',
    bottom: '15%',
    right: '5%',
    zIndex: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.15),
    color: '#969696',
    letterSpacing: widthPercentageToDP('0.3%'),
  },
  codeCardText: {
    position: 'absolute',
    top: '46%',
    right: '10%',
    zIndex: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.5),
    color: '#969696',
    letterSpacing: widthPercentageToDP('0.3%'),
  },
  content: {
    minHeight: heightPercentageToDP('60%'),
    paddingBottom: heightPercentageToDP('15%'),
    alignItems: 'center',
  },
  textTitlePage: {
    marginTop: '10%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#007f0b',
    width: '100%',
  },
  textDescription: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginVertical: heightPercentageToDP('3%'),
    width: '100%',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightPercentageToDP('3%'),
  },
  buttonFooter: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: heightPercentageToDP('5%'),
    paddingHorizontal: widthPercentageToDP('5%'),
    paddingVertical: heightPercentageToDP('1.5%'),
  },
  containerButtonsFooter: {
    paddingVertical: heightPercentageToDP('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textButtonsFooter: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.75),
  },
  containerBotoes: {
    flex: 1,
    width: '100%',
    paddingLeft: widthPercentageToDP('3%'),
    marginVertical: heightPercentageToDP('5%'),
  },
  botao: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  touchableBox: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('2%'),
    flexDirection: 'row',
    paddingRight: widthPercentageToDP('3%'),
  },
  titleButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#007f0b',
    marginLeft: widthPercentageToDP('1.5%'),
  },
});

export default styles;
