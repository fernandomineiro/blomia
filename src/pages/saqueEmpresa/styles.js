/* eslint-disable */
import {StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.8)
  },
  content: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  abstract: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
    fontSize: responsiveFontSize(2),
    paddingTop: 10,
  },
  question: {
    fontFamily: 'Montserrat-Bold',
    color: '#4c4c4c',
    fontSize: responsiveFontSize(2.5),
    paddingBottom: 60
  },
  questionInfo: {
    fontFamily: 'Montserrat-Bold',
    color: '#4c4c4c',
    fontSize: responsiveFontSize(2.5),
    paddingBottom: 40
  },
  inquiry: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.8),
    paddingBottom: 0,
  },
  inputValue: {
    paddingTop: 0,
    textAlign: 'center',
    width: widthPercentageToDP(85),
    fontFamily: 'Montserrat',
    fontSize: responsiveFontSize(7),
    color: "gray"
  },
  displayValue: {
    textAlign: 'center',
    width: widthPercentageToDP(85),
    fontFamily: 'Montserrat-Bold',
    fontWeight: "500",
    fontSize: responsiveFontSize(6),
    color: "gray"
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
  footer: {
    height: '10%'
  },
  contentModal: {
    alignSelf: 'center',
    height: '55%',
    width: '85%',
    elevation: 2,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContentModal0: {
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2)
  },
  textContentModal1: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2)
  },
  textContentModal2: {
    color: '#007f0b',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2)
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
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8)
  },
  descriptionWithdraw: {
    color: '#4d4d4d',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(1.7),
    marginTop: 3
  },
  textButtonClose: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.7)
  },
})

export default styles;
