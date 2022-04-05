import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boxLogo: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  boxContent: {
    flex: 1,
    justifyContent: 'flex-start',
    width: wp(70),
  },
  imgLogo: {
    alignSelf: 'center',
    width: '55%',
    resizeMode: 'contain',
  },
  imgRegisterComplete: {
    alignSelf: 'center',
    width: wp(50),
    height: hp(40),
    resizeMode: 'contain',
    marginTop: hp(8),
  },
  informativeText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2),
    marginTop: hp(8),
    color: '#4D4D4D',
  },
});

export default styles;
