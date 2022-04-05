import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import { COLORS } from '../../constantes/colors';

const responsiveHeight =
  Dimensions.get('window').height -
  (Dimensions.get('window').height / 100) * 99;
const responsiveWidth =
  Dimensions.get('window').width -
  (Dimensions.get('window').width / 100) * 97.2;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  containerValorCusto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP('3%'),
  },
  scrollModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgBackModal: {
    width: 25,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
  imgLogoModal: {
    height: 40,
    width: 200,
    marginBottom: 30,
  },
  imgWelcomeDiasModal: {
    height: heightPercentageToDP(14),
    width: widthPercentageToDP(80),
    marginVertical: 30,
  },
  contentModal: {
    width: widthPercentageToDP(70),
  },
  textModalNegrito: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveScreenFontSize(2.25),
    lineHeight: 25,
    color: '#707070',
  },
  textModal: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveScreenFontSize(2.25),
    lineHeight: 25,
    color: '#707070',
    marginTop: 20,
  },
  containerBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: heightPercentageToDP('5%'),
    paddingTop: heightPercentageToDP('3%'),
  },
  conteinerTransferencia: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  header: {
    paddingTop: '2%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.8),
  },
  content: {
    minHeight: heightPercentageToDP('60%'),
    paddingBottom: heightPercentageToDP('15%'),
  },
  textTitlePage: {
    marginTop: '10%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#007f0b',
  },
  textDescription: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginVertical: heightPercentageToDP('3%'),
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputValue: {
    textAlign: 'center',
    width: widthPercentageToDP(85),
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(6),
    color: 'gray',
  },
  labelCusto: {
    color: '#4C4C4C',
    fontFamily: 'Montserrat-Regular',
    marginRight: widthPercentageToDP('1%'),
  },
  labelValor: {
    color: '#ED3832',
    fontFamily: 'Montserrat-Regular',
  },
  valorCusto: {
    fontFamily: 'Montserrat-SemiBold',
  },
  containerCadastro: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'black'
    backgroundColor: COLORS.BACKGROUND,
  },
  boxLogoCadastro: {
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 86,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    // borderColor: '#000',
    // borderWidth: 1,
  },
  boxRow1Cadastro: {
    flexDirection: 'column',
    justifyContent: 'center',
    //  borderColor: 'black',
    //  borderWidth: 1,
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 80,
    width: '85%',
    marginLeft:
      Dimensions.get('window').width -
      (Dimensions.get('window').width / 100) * 94,
  },
  boxRow2Cadastro: {
    flexDirection: 'column',
    justifyContent: 'center',
    //  borderColor: 'black',
    //  borderWidth: 1,
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 87,
    width: '85%',
    marginLeft:
      Dimensions.get('window').width -
      (Dimensions.get('window').width / 100) * 94,
  },
  boxRow3Cadastro: {
    flexDirection: 'column',
    justifyContent: 'center',
    //  borderColor: 'black',
    //  borderWidth: 1,
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 87,
    width: '85%',
    marginLeft:
      Dimensions.get('window').width -
      (Dimensions.get('window').width / 100) * 94,
  },
  boxRow4Cadastro: {
    flexDirection: 'column',
    justifyContent: 'center',
    //  borderColor: 'black',
    //  borderWidth: 1,
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 87,
    width: '85%',
    marginLeft:
      Dimensions.get('window').width -
      (Dimensions.get('window').width / 100) * 94,
  },
  boxBtnCadastro: {
    zIndex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    //  borderColor: 'black',
    //  borderWidth: 1,
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 87,
    width: '100%',
  },
  boxInputsCadastro: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //  borderColor: 'black',
    //  borderWidth: 1,
    // height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 80),
    width: '100%',
  },
  boxTitleCadastro: {
    flexDirection: 'column',
    width: '85%',
    marginTop:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 97,
    marginLeft:
      Dimensions.get('window').width -
      (Dimensions.get('window').width / 100) * 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputTextCadastro: {
    padding: 0,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: responsiveWidth,
    height: heightPercentageToDP('6%'),
    fontSize: responsiveFontSize(1.7),
    borderRadius: 300,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium',
  },
  formContainerCadastro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 300,
  },
  containerDescriptions1Cadastro: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: -20,
    marginLeft: 20,
  },
  containerDescriptions2Cadastro: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: -20,
    marginLeft: 20,
  },
  containerDescriptions3Cadastro: {
    flexDirection: 'row',
    marginTop: -10,
    marginBottom: -20,
  },
  containerForm1Cadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerForm2Cadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerForm3Cadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgLogoCadastro: {
    alignSelf: 'center',
    width: '45%',
    resizeMode: 'contain',
  },
  descriptionTextCadastro: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
  },
  description1Cadastro: {
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 7,
    marginBottom: responsiveHeight,
    fontSize: responsiveFontSize(2),
    color: '#4d4d4d',
  },
  description2Cadastro: {
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 9,
    marginBottom: responsiveHeight,
    fontSize: responsiveFontSize(2),
    color: '#4d4d4d',
  },
  formatInputZipCadastro: {
    padding: 0,
    textAlign: 'center',
    marginBottom: 15,
    height: heightPercentageToDP('6%'),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium',
  },
  formatInputStreetCadastro: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: heightPercentageToDP('7%'),
    width: widthPercentageToDP(45),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium',
  },
  formatInputNumberCadastro: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: heightPercentageToDP('7%'),
    width: widthPercentageToDP(18),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium',
  },
  formatInputComplementCadastro: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: heightPercentageToDP('7%'),
    width: widthPercentageToDP(50),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium',
  },
  formatInputDistrictCadastro: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: heightPercentageToDP('7%'),
    width: widthPercentageToDP(73),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium',
  },
  continueButtonStyleCadastro: {
    marginTop: 600,
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007f0b',
    elevation: 1,
    borderRadius: 300,
    width: widthPercentageToDP(65),
    height: heightPercentageToDP(7),
    position: 'absolute',
  },
  requiredFieldsCadastro: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.5),
    color: '#4d4d4d',
  },
  saveButtonStyleCadastro: {
    backgroundColor: '#007f0b',
    elevation: 1,
    marginBottom: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: widthPercentageToDP(65),
    height: heightPercentageToDP(7),
  },
  footer: {
    paddingVertical: heightPercentageToDP('2%'),
  },
  gpsButtonStyle: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#007f0b',
    borderRadius: 300,
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(7),
  },
});

export default styles;
