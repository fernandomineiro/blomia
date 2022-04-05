import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP('100%'),
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionCode: {
    marginTop: 20,
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  textCode: {
    fontSize: responsiveFontSize(5),
    fontFamily: 'Montserrat-SemiBold',
  },
  textCodVencido: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: 'red',
    paddingHorizontal: 65,
    marginBottom: 20,
  },
  textTimer: {
    textAlign: 'center',
    paddingHorizontal: 100,
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
  },
  timer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
  },
  footer: {
    height: heightPercentageToDP(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendCode: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.8),
    paddingBottom: 25,
  },
  resendButton: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.8),
  },
  modal: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 0.34,
    width: '70%',
    paddingVertical: 31,
    bottom: 45,
  },
  descriptionWithdrawTitle: {
    color: '#007f0b',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.8),
  },
  descriptionWithdraw: {
    color: '#4d4d4d',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.7),
    marginTop: 3,
  },
  textButtonClose: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.7),
  },
  containerModal: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    height: '30%',
    alignSelf: 'center',
  },
  textConclusion: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  containerXButton: {
    width: '-10%',
    alignItems: 'flex-start',
    height: '130%',
    bottom: 7,
    left: 2,
  },
  xButtonText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  storeNameText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  rateText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#007f0b',
    paddingBottom: 10,
  },
  containerValorEGps: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP(15),
  },
  valueStyleText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.5),
  },
  valueStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(6),
    color: '#007f0b',
  },
  imageSize: {
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(8),
  },
  addressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  addressStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  companyStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2),
  },
  openGpsStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.7),
  },
});

export { styles };
