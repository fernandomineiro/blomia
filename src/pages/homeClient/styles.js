import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headercontainer: {
    height: heightPercentageToDP('20%'),
    backgroundColor: '#007F1C',
  },
  headerRows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headercontent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headercontent2: {
    flex: 0.3,
    alignItems: 'center',
    paddingBottom: 10,
  },
  text1header1: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontSize: responsiveFontSize(2),
    marginLeft: 2,
  },
  containerValueDisplay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerValue: {
    flex: 1,
    marginBottom: heightPercentageToDP('2%'),
    marginTop: heightPercentageToDP('0%'),
    justifyContent: 'center',
  },
  containerValueHidden: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#1E9D29',
    marginTop: heightPercentageToDP(0.8),
  },
  text2headerValue: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontSize: responsiveFontSize(4),
    marginLeft: 2,
  },
  text2header1: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontSize: responsiveFontSize(4.5),
  },
  textheader2: {
    height: heightPercentageToDP('5%'),
    width: heightPercentageToDP('5%'),
    marginRight: widthPercentageToDP('3%'),
  },
  headerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    height: heightPercentageToDP('8%'),
    marginTop: widthPercentageToDP('3%'),
    marginHorizontal: widthPercentageToDP('3%'),
  },
  textFooter: {
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
    fontSize: widthPercentageToDP(3.25),
    width: widthPercentageToDP(100),
    textAlign: 'center',
  },
  contentContainer: {
    height: '55%',
    marginHorizontal: '2%',
  },

  titleFreeTransaction: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#007F0B',
    fontSize: responsiveFontSize(3.5),
  },
  textFreeTransaction: {
    fontFamily: 'Montserrat-Medium',
    color: '#4C4C4C',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: 15,
  },
  modalDate: {
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
  containerModalDate: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btnCloseModal: {
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    alignItems: 'center',
    marginRight: 10,
  },
  textBtnMenu: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Bold',
  },
  iconOption: {
    height: widthPercentageToDP('18%'),
    width: widthPercentageToDP('18%'),
  },
  touchOption: {
    width: '100%',
    flexDirection: 'row',
    height: heightPercentageToDP('12%'),
    alignItems: 'center',
  },
  containerTextOption: {
    flex: 1,
  },
  textOptionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
    fontSize: responsiveFontSize(2),
  },
  containerStyleOption: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    height: '100%',
    alignItems: 'center',
    paddingLeft: widthPercentageToDP('2%'),
  },
  textOption: {
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    fontSize: responsiveFontSize(1.5),
  },
  containerButtonsHead: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonHead: {
    height: heightPercentageToDP('6%'),
    borderRadius: heightPercentageToDP('3%'),
    marginHorizontal: widthPercentageToDP('3%'),
    marginBottom: widthPercentageToDP('3%'),
    width: '43%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textButtonHead: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.75),
    color: '#007F0B',
  },
  icoButtonHead: {
    height: heightPercentageToDP('4%'),
    width: heightPercentageToDP('4%'),
    marginRight: widthPercentageToDP('3%'),
  },
});

export default styles;
