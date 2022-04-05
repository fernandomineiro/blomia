import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightPercentageToDP('10%'),
    alignItems: 'center',
    position: 'relative',
  },
  contentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: widthPercentageToDP('1%'),
    paddingHorizontal: widthPercentageToDP('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP('2%'),
    zIndex: 0,
  },
  contentLabel: {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 1,
    top: heightPercentageToDP('0.75%'),
    left: widthPercentageToDP('5%'),
    paddingHorizontal: widthPercentageToDP('1%'),
  },
  textLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(1.75),
  },
  textPrefix: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
  },
  inputValue: {
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
});

export default styles;
