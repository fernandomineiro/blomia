import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constantes/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND,
  },
  boxLogo: {
    flex: 0.1,
    width: '100%',
    alignItems: 'center',
    // borderColor: '#000',
    // borderWidth: 1,
  },
  boxRow1: {
    // borderColor: "black",
    // borderWidth: 1,
    width: '80%',
    marginLeft: '9%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  boxRow2: {
    marginTop: '5%',
    // borderColor: "black",
    // borderWidth: 1,
    width: '100%',
    flex: 0.1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxRow3: {
    // borderColor: "black",
    // borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    flex: 0.3,
  },
  boxRow4: {
    // borderColor: "black",
    // borderWidth: 1,
    width: '100%',
    flex: 0.3,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icoCheck: {
    marginTop: 30,
    marginLeft: wp('4%'),
    width: wp('8%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  containerLayoutAndSelection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  firstChildContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  secondChildContainer: {
    flex: 2,
    justifyContent: 'center',
  },

  thirdChildContainer: {
    flex: 3,
    justifyContent: 'flex-end',
  },

  textDescription: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2),
    paddingLeft: 10,
    textAlign: 'center',
    color: '#4d4d4d',
  },

  imgLogo: {
    width: wp('45%'),
    height: hp('20%'),
    marginTop: -28,
  },
  statusFoto: {
    width: wp('5%'),
  },

  btnsGroup: {
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 0.3,
  },

  buttonsTextStyle: {
    fontFamily: 'Montserrat-Medium',
  },

  btnSelected: {
    backgroundColor: '#477e22',
  },

  loginButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
  },

  insertButtonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 300,
    marginTop: 90,
    width: wp('40'),
    height: hp('2'),
  },

  insertButtonTextStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#4d4d4d',
    fontSize: responsiveFont(2),
  },

  frontDocumentButtonStyle: {
    marginTop: 20,
    borderRadius: 300,
    backgroundColor: '#4d4d4d',
    width: wp(65),
    height: hp(7),
    justifyContent: 'center',
  },

  backDocumentButtonStyle: {
    marginTop: 30,
    borderRadius: 300,
    backgroundColor: '#4d4d4d',
    width: wp(65),
    height: hp(7),
    justifyContent: 'center',
  },

  continueButtonStyle: {
    justifyContent: 'center',
    backgroundColor: '#007f0b',
    elevation: 1,
    borderRadius: 300,
    bottom: 45,
    width: wp(65),
    height: hp(7),
  },

  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  continueButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  documentsButtonsContainer: {
    flex: 5,
    justifyContent: 'center',
    marginTop: -140,
  },
  btnCustom: {
    // marginTop: 30,
    // justifyContent: 'center',
    backgroundColor: '#007f0b',
    // elevation: 1,
    borderRadius: 300,
    marginLeft: '18%',
    width: wp(65),
    height: hp(7),
    justifyContent: 'center',
  },
  textBtnCustom: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  modalNewCompany: {
    flex: 1,

    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  titleModal: {
    color: '#007f0b',
    fontSize: responsiveFont(2.5),
    fontFamily: 'Montserrat-Bold',
    width: '80%',
    textAlign: 'center',
  },
  infoModal: {
    color: '#4D4D4D',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginVertical: hp('3%'),
  },
  imginfoModal: {
    width: wp('80%'),
    height: hp('20%'),
  },
  containerButtonsModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnModal: {
    backgroundColor: '#007f0b',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
    justifyContent: 'center',
  },
});

export default styles;
