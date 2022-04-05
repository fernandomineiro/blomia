import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  slide1: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: wp('10%'),
    marginBottom: hp('10%'),
  },
  containerImage: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    alignSelf: 'center',
    height: hp('15%'),
  },

  instructions: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  imageTeacher: {
    height: hp('20%'),
    marginVertical: hp('3%'),
  },
  instructions2: {
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
    marginBottom: hp('3%'),
  },
  instructions3: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: 'Montserrat-Medium',
    marginBottom: hp('3%'),
  },
  instructions4: {
    fontSize: responsiveFont(2.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    paddingBottom: 30,
  },
});
