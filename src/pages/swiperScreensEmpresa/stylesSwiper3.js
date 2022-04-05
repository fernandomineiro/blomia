import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('10%'),
    paddingBottom: hp('15%'),
  },
  header: {
    height: '16%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogoRoad: {
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('20%'),
  },
  roadImage: {
    width: wp('55%'),
    height: hp('30%'),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentText: {
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
  },
});
