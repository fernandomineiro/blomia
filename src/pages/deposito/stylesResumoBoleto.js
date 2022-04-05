import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  conteinerTransferencia: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  containerBtBack: {
    position: 'absolute',
    left: widthPercentageToDP('6%'),
    top: heightPercentageToDP('2.5%'),
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.8),
  },
  textAguarde: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
  textAguardeVencido: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#ED3832',
  },
  textAguardeVerificando: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  inputValue: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(7),
    color: '#007f0b',
  },
  labelCusto: {
    color: '#4C4C4C',
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2),
    textAlign: 'left',
    marginLeft: 2,
  },
  valorCusto: {
    fontFamily: 'Montserrat-SemiBold',
  },
  textLabel: {
    textAlign: 'center',
    color: '#4C4C4C',
    fontFamily: 'Montserrat-SemiBold',
    marginHorizontal: 50,
    marginTop: 40,
    fontSize: responsiveFontSize(1.75),
  },
  textCodigoBoleto: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },
  textCodigoBoletoDisable: {
    color: '#B3B3B3',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },
  btTouchable: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  containerCod: {
    flex: 1,
  },
  containerCodDisable: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  linkViewSplitBank: {
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    marginTop: heightPercentageToDP('5%'),
  },
});

export default styles;
