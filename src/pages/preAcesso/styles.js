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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  modalContainer: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 300,
    width: '70%',
    paddingVertical: 31,
    bottom: 45,
  },
  box: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginTop: 410,
  },
  button1Text: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  button2Text: {
    color: 'black',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  button1: {
    borderRadius: 300,
    backgroundColor: '#007f0b',
    width: wp(65),
    height: hp(7),
    justifyContent: 'center',
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    margin: 10,
  },
  button2: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderRadius: 90,
    borderWidth: 0.5,
    bottom: 90,
    width: wp(60),
    height: hp(7),
  },
  img: {
    width: wp('60%'),
  },
  containerPoliticas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: wp('10%'),
  },
  textoPoliticas: {
    fontSize: responsiveFont(1.5),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  textoBtnPoliticas: {
    fontSize: responsiveFont(1.5),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  containerModalPolicy: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp('95%'),
    width: '99%',
    top: hp('1%'),
  },
  contentModalPolicy: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  footerModalPolicy: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
