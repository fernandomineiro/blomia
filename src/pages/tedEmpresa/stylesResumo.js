import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    width: '100%',
    minHeight: heightPercentageToDP(70),
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 5,
    borderTopColor: '#E6E6E6',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  saldoText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  containerResume: {
    marginTop: 30,
    minWidth: '55%',
  },
  titleResume: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  contentResume: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.75),
    color: '#303030',
    lineHeight: 20,
  },
  textValidade: {
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginTop: 25,
  },
  textDataValidade: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginTop: 25,
  },
  textStatus: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2.5),
    color: '#4C4C4C',
    marginTop: 10,
    width: responsiveScreenWidth(60),
    textAlign: 'center',
  },
  textLabelValor: {
    width: '100%',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginTop: 25,
  },
  textValor: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(6),
    color: '#007f0b',
    textAlign: 'center',
  },
  containerValorCusto: {
    width: '100%',
  },
  labelCusto: {
    color: '#4C4C4C',
    fontFamily: 'Montserrat-Regular',
  },
  valorCusto: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default styles;
