import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '3%',
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
  containerValorCusto: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP('3%'),
  },
  labelCusto: {
    color: '#4C4C4C',
    fontFamily: 'Montserrat-Regular',
    marginRight: widthPercentageToDP('1%'),
  },
  valorCusto: {
    fontFamily: 'Montserrat-SemiBold',
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
  listContacts: {
    flex: 1,
    width: '100%',
  },
  phones: {
    fontSize: responsiveFontSize(1.5),
    marginHorizontal: widthPercentageToDP(5),
    marginVertical: heightPercentageToDP(0.2),
    fontFamily: 'Montserrat-Medium',
    color: '#707070',
  },
  contact_details: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: widthPercentageToDP(5),
    color: '#707070',
  },
  iconAddContact: {
    marginLeft: widthPercentageToDP(5),
  },
  textAddContact: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    marginLeft: widthPercentageToDP(2),
    color: '#707070',
  },
  textHeader: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    marginHorizontal: widthPercentageToDP(5),
    color: '#707070',
  },
  textComplement: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    marginHorizontal: widthPercentageToDP(5),
    color: '#707070',
  },
  textComplementRegular: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    marginHorizontal: widthPercentageToDP(5),
    color: '#707070',
    marginTop: heightPercentageToDP('3%'),
  },
  textHeadPage: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    marginHorizontal: widthPercentageToDP(5),
    color: '#fff',
  },
  textInputHeadPage: {
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    marginHorizontal: widthPercentageToDP(5),
    color: '#fff',
  },
  textInputHeadPagePlaceHolder: {
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    marginHorizontal: widthPercentageToDP(5),
    color: '#fff',
    opacity: 0.5,
  },
  itemContact: {
    height: heightPercentageToDP('8%'),
    justifyContent: 'center',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 0.7,
  },
  itemAddContact: {
    paddingVertical: heightPercentageToDP(1),
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 0.7,
    width: '100%',
    height: heightPercentageToDP('8%'),
    justifyContent: 'center',
  },
  itemHeader: {
    paddingVertical: heightPercentageToDP(1),
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 0.7,
    width: '100%',
    height: heightPercentageToDP('8%'),
    justifyContent: 'center',
  },
  itemComplement: {
    paddingTop: heightPercentageToDP('5%'),
    marginBottom: heightPercentageToDP('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headPage: {
    paddingVertical: heightPercentageToDP(1),
    backgroundColor: '#007F0B',
    width: '100%',
    height: heightPercentageToDP('8%'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  btSearch: {
    marginRight: widthPercentageToDP('3%'),
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.8),
  },
  containerForTransfer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textForTransfer: {
    color: '#303030',
    fontFamily: 'Montserrat-SemiBold',
  },
  textNameForTransfer: {
    color: '#303030',
    fontFamily: 'Montserrat-Medium',
  },
  textPhoneForTransfer: {
    color: '#303030',
    fontFamily: 'Montserrat-Medium',
  },
  btEdit: {
    marginLeft: widthPercentageToDP('5%'),
  },
  pencilImg: {
    width: widthPercentageToDP('10%'),
    height: widthPercentageToDP('10%'),
  },
  userText: {
    marginVertical: heightPercentageToDP('2%'),
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'flex-start',
    paddingLeft: 85,
    color: '#707070',
  },
  inputUserStyle: {
    alignSelf: 'center',
    borderRadius: 300,
    width: widthPercentageToDP(65),
    height: heightPercentageToDP(7),
    backgroundColor: 'transparent',
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
    paddingLeft: '10%',
    fontFamily: 'Montserrat-Medium',
    marginBottom: heightPercentageToDP('15%'),
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default styles;
