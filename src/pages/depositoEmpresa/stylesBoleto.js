import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  containerBotoes: {
    flex: 1,
    width: '100%',
    marginTop: heightPercentageToDP('5%'),
  },
  containerTextInfo: {
    paddingVertical: heightPercentageToDP('1%'),
    marginHorizontal: widthPercentageToDP('3%'),
  },
  titleTextInfo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
  contentTextInfo: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.75),
    color: '#4C4C4C',
    marginTop: heightPercentageToDP('1%'),
  },
  tituloPagina: {
    marginBottom: heightPercentageToDP('3%'),
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2.25),
    color: '#007f0b',
    marginLeft: widthPercentageToDP('3%'),
  },
  botao: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
    paddingLeft: widthPercentageToDP('3%'),
  },
  cardInfo: {
    borderColor: '#EDEDED',
    borderWidth: 1,
    marginHorizontal: widthPercentageToDP('3%'),
    borderRadius: widthPercentageToDP('1.5%'),
    marginBottom: heightPercentageToDP('3%'),
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
    fontSize: responsiveFontSize(2.25),
    color: '#007f0b',
    marginLeft: widthPercentageToDP('1.5%'),
  },
});

export default styles;
