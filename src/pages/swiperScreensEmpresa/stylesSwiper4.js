import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp('10%'),
  },
  header: {
    height: '16%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('20%'),
  },
  roadImage: {
    width: wp('55%'),
    height: hp('30%'),
  },
  content: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  contentText: {
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
    width: '100%',
  },
  instructions: {
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    width: '100%',
    marginBottom: hp('3%'),
  },
  imgPadLock: {
    width: wp(70),
    height: hp(30),
    marginTop: hp(6),
    marginBottom: hp(5),
  },
});
