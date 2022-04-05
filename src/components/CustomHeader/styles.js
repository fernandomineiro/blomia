import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  logo: {
    // width: '100%',
    // flex: 0.1
  },
  imgLogo: {
    height: hp('5%'),
    width: wp('40%'),
  },
  btBackHome: {
    marginLeft: wp('3%'),
  },
  textButtonCancelled: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
    fontSize: responsiveFontSize(1.75),
  },
});

export default styles;
