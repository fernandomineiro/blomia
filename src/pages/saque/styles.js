import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginHorizontal: '3%',
  },
  header: {
    paddingTop: '2%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.8),
  },
  content: {
    minHeight:
      Platform.OS === 'android'
        ? heightPercentageToDP('60%')
        : heightPercentageToDP('55%'),
    paddingBottom: heightPercentageToDP('15%'),
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  inquiry: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.8),
  },
  inputValue: {
    textAlign: 'center',
    width: widthPercentageToDP(85),
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(6),
    color: 'gray',
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
    paddingVertical: heightPercentageToDP('2%'),
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
    fontSize: responsiveFontSize(2),
  },
  textContentModal1: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
  },
  textContentModal2: {
    color: '#007f0b',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
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
  valorCustoGratis: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default styles;
