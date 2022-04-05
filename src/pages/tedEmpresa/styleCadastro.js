import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  container: {
    marginHorizontal: '3%',
  },
  header: {
    paddingTop: '2%',
    flexDirection: 'row',
  },
  content: {
    minHeight: heightPercentageToDP('60%'),
    paddingBottom: heightPercentageToDP('3%'),
  },
  textDescription: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginVertical: heightPercentageToDP('3%'),
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('1.5%'),
  },
  saldoText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  headerText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.5),
    color: '#707070',
    marginTop: 25,
  },
  form: {
    width: widthPercentageToDP(90),
    alignItems: 'center',
  },
  lineForm: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    height: 40,
    marginTop: 15,
  },
  textForm: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Medium',
    color: '#707070',
  },
  fieldCod: {
    flex: 0.3,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4C4C4C',
    borderRadius: 20,
    alignItems: 'center',
  },
  textCod: {
    width: '100%',
    fontSize: responsiveFontSize(1.75),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  fieldNomeBanco: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNomeBanco: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: '#4C4C4C',
  },
  btEscolha: {
    borderRadius: 300,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    borderColor: '#4C4C4C',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  textTipoconta: {
    fontFamily: 'Montserrat-Bold',
  },
  fieldAgencia: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4C4C4C',
    borderRadius: 20,
    alignItems: 'center',
  },
  textField: {
    width: '100%',
    fontSize: responsiveFontSize(1.75),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  fieldConta: {
    flex: 0.7,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4C4C4C',
    borderRadius: 20,
    alignItems: 'center',
  },
  fieldCodigo: {
    flex: 0.3,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4C4C4C',
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 10,
  },
  titleTransfer: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#707070',
    marginTop: 25,
  },
  fieldFavorecido: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4C4C4C',
    borderRadius: 20,
    alignItems: 'center',
  },
  fieldID: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4C4C4C',
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default styles;
