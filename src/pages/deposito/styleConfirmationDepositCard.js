import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  scrollModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conteinerTransferencia: {
    flex: 1,
    marginHorizontal: '3%',
  },
  header: {
    paddingTop: '2%',
    flexDirection: 'row',
  },
  modalProcessing: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 300,
    width: '90%',
    paddingVertical: 31,
    bottom: 45,
  },
  titleModalProcessing: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#4C4C4C',
    fontSize: responsiveFontSize(3.5),
  },
  textModalProcessing: {
    fontFamily: 'Montserrat-Medium',
    color: '#4C4C4C',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: 15,
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
  rowSimple: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: heightPercentageToDP('2%'),
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rowBorderTop: {
    borderTopColor: '#EDEDED',
    borderTopWidth: 1,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#B3B3B3',
  },
  labelValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#333333',
  },
  textDescription: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#B3B3B3',
    marginVertical: heightPercentageToDP('3%'),
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
  textGpsButtonStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
  },
});

export default styles;
