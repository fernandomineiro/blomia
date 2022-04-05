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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.BACKGROUND,
  },
  imgLogo: {
    marginTop: -24,
    width: wp('45%'),
    height: hp('20%'),
  },
  img: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  img2: {
    marginTop: 60,
    width: wp('15') /*100*/,
    height: hp('10'),
    //transform: [{ rotate: RotateData }],
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  inputDivision: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  passCode1: {
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    height: 60,
    width: 50,
  },
  passCode2: {
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    height: 60,
    width: 50,
  },
  passCode3: {
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    height: 60,
    width: 50,
  },
  passCode4: {
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    height: 60,
    width: 50,
  },
  textDescription: {
    marginTop: 30,
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: '#4d4d4d',
  },
  textDescriptionTel: {
    fontSize: responsiveFont(2.75),
    fontFamily: 'Montserrat-Medium',
    color: '#4d4d4d',
  },
  containerTel: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: wp(90),
  },
  textDescription2: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: '#4d4d4d',
    marginTop: 30,
  },

  circularButton: {
    backgroundColor: '#007f0b',
    marginTop: 40,
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
  pencilSize: {
    width: wp(8),
    height: hp(4),
    marginLeft: 10,
  },
  containerModal: {
    position: 'absolute',
    flex: 0.3,
    width: '80%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 20,
  },
  tituloModal: {
    paddingTop: hp(2),
    alignItems: 'center',
  },
  textoTituloModal: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFont(1.9),
  },
  containerLabel: {
    paddingLeft: wp(9),
    // paddingTop: hp(2),
    justifyContent: 'flex-end',
    height: '20%',
  },
  labelCel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.8),
    paddingBottom: hp(1.2),
  },
  inputCelContainer: {
    height: '40%',
    alignItems: 'center',
  },
  inputCel: {
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#b3b3b3',
    borderWidth: 1.8,
    paddingLeft: '10%',
    fontFamily: 'Montserrat-Medium',
    width: wp('64%'),
  },
  botões: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  estiloTextoBotão1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFont(2.0),
  },
  estiloTextoBotão2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFont(2.0),
    color: '#007f0b',
  },
});

export default styles;
