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
  header: {
    paddingTop: '2%',
    flexDirection: 'row',
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
});

export default styles;
