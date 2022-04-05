import {StyleSheet, Dimensions} from 'react-native';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  imgLogo: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(15),
    marginTop: -40,
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  pageDescription: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2.5),
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  fieldDescription: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.7),
    paddingLeft: 90,
  },
  inputsDivision: {
    flex: 1,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  inputPasswordStyle1: {
    alignSelf: 'center',
    width: wp(65),
    height: hp(7),
    borderRadius: 300,
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFont(5),
    letterSpacing: 20,
    color: '#808080',
    textAlign: 'center',
    alignItems: 'center',
  },
  inputPasswordStyle2: {
    alignSelf: 'center',
    width: wp(65),
    height: hp(7),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFont(5),
    letterSpacing: 20,
    color: '#808080',
    textAlign: 'center',
    alignItems: 'center',
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
  secureBox: {
    width: wp('65%'),
    height: hp('7%'),
    borderWidth: 1.8,
    borderColor: '#b3b3b3',
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  secureText: {
    fontSize: responsiveFont('4.8'),
    fontFamily: 'Montserrat-Medium',
  },
  newPasswordtext: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2),
    marginTop: 10,
  },
  loginButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    marginBottom: 10,
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
  },
  // NOVO CSS

  textLabel: {
    paddingLeft: 20,
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
    marginBottom:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 99.3,
  },
  // secureBox: {

  //   padding: 0,
  //   textAlign: 'center',
  //   marginBottom: 15,
  //   height: hp('6%'),
  //   width: wp('65%'),
  //   borderRadius: 300,
  //   backgroundColor: 'transparent',
  //   borderColor: '#b3b3b3',
  //   borderWidth: 1,
  //   fontFamily: 'Montserrat-Medium',
  //   alignItems: 'center',
  //   justifyContent: 'center'

  // },

  placeholderPinStyle: {
    textAlign: 'center',
    width: responsiveFont(1),
    height: responsiveFont(1),
    borderRadius: 25,
    opacity: 0.3,
    backgroundColor: '#808080',
  },
  pinMaskStyle: {
    width: responsiveFont(1),
    height: responsiveFont(1),
    borderRadius: 25,
    backgroundColor: '#007f0b',
  },
  clearButtonStyle: {
    width: wp('7'),
    height: hp('5'),
    paddingLeft: wp('2%'),
    left: wp('54'),
    top: hp('5.1%'),
    position: 'absolute',
  },
});
export default styles;
