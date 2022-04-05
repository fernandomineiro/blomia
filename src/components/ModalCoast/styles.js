import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ffffff',

    alignItems: 'center',

    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },

  textTitleModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.75),
    color: '#007f0b',
  },

  containerText: {
    width: '70%',
    marginTop: heightPercentageToDP('3%'),
  },

  textLabel: {
    fontFamily: 'Montserrat-Bold',
    color: '#B7B7B7',
    fontSize: responsiveFontSize(1.9),
  },

  textValueLabel: {
    color: '#4C4C4C',
  },

  buttonClose: {
    backgroundColor: '#007f0b',
    paddingVertical: heightPercentageToDP('2%'),
    paddingHorizontal: widthPercentageToDP('20%'),
    borderRadius: widthPercentageToDP('6%'),
    marginVertical: heightPercentageToDP('5%'),
  },

  textButtonClose: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
});

export default styles;
