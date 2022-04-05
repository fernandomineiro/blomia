import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constantes/colors';

const styles = StyleSheet.create({
  conteudoPagina: {
    flex: 1,
    width: wp(100),
  },
  container: {
    height: hp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  containerHeader: {
    width: '100%',
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  containerBtBack: {
    position: 'absolute',
    left: wp('6%'),
  },
  imgLogo: {
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('15%'),
  },

  btnsGroup: {
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 300,
    width: wp('65%'),
    height: hp('7%'),
    backgroundColor: 'transparent',
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
  },

  inputUserStyle: {
    alignSelf: 'center',
    position: 'absolute',
    width: wp('65%'),
    height: hp('7%'),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderWidth: 1.8,
    paddingLeft: 34,
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2),
  },

  secureBox: {
    width: wp('65%'),
    height: hp('7%'),
    borderWidth: 1.8,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secureText: {
    fontSize: responsiveFont('4.8'),
    fontFamily: 'Montserrat-Medium',
  },

  placeholderPinStyle: {
    textAlign: 'center',
    width: 10,
    height: 10,
    borderRadius: 25,
    opacity: 0.3,
    backgroundColor: '#808080',
  },

  pinMaskStyle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: '#007f0b',
  },

  inputPasswordStyle: {
    paddingBottom: 2,
    paddingTop: 1,
    alignSelf: 'center',
    borderRadius: 300,
    width: wp('65%'),
    height: hp('7'),
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
    fontSize: responsiveFont(4.2),
    textAlign: 'center',
    justifyContent: 'center',
    letterSpacing: wp('4%'),
    color: '#808080',
    fontFamily: 'Montserrat-Bold',
  },

  btnSelected: {
    backgroundColor: '#477e22',
  },

  buttonsTextStyle: {
    fontFamily: 'Montserrat-Medium',
  },

  selectionTextStyle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#4d4d4d',
  },

  userContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  userTextStyle: {
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(10),
    fontSize: 18,
    color: '#4d4d4d',
    marginBottom: 10,
  },
  passwordTextStyle: {
    marginTop: 10,
    marginLeft: wp(10),
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#4d4d4d',
    marginBottom: 10,
  },

  alterPasswordStyle: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'underline',
    color: 'grey',
  },
  containerLoginButton: {
    marginBottom: hp(15),
  },
  loginButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
  },
  loginButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  clearButtonStyle: {
    paddingTop: 10,
    paddingLeft: 20,
    left: wp('70'),
    top: hp('-2.6'),
    position: 'absolute',
  },
  containerChooseCompany: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
  },
  listagemChooseCompany: {
    height: hp(40),
    width: wp(80),
  },
  textTitleChooseCompany: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFont(2.15),
    color: '#333333',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  containerFooterChooseCompany: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp(80),
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  textButtonFooterChooseCompanyCancel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.75),
    color: '#303030',
  },
  textButtonFooterChooseCompanyEntry: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFont(1.75),
    color: '#477E22',
  },
  textModalSelectName: {
    color: '#303030',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFont(2),
  },
  textModalSelect: {
    color: '#303030',
    fontFamily: 'Montserrat-MediumItalic',
    fontSize: responsiveFont(1.5),
  },
  scrollViewModalAccounts: {
    flex: 1,
    paddingHorizontal: 20,
    borderColor: '#E6E6E6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  containerItemsModalAccounts: {
    flex: 1,
    marginBottom: hp(3),
  },
});

export default styles;
