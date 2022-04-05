import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightPercentageToDP('8.75%'),
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP('5%'),
  },
  textPrefix: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.9),
    color: '#4C4C4C',
  },
  textValueBalance: {
    marginHorizontal: widthPercentageToDP('3%'),
    color: '#143F00',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2.5),
    flex: 1,
    textAlign: 'right',
  },
});

export default styles;
