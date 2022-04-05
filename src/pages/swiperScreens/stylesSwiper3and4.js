import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  header: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSwipe: {
    flex: 1,
    width: '100%',
    paddingHorizontal: wp('10%'),
    marginBottom: hp('10%'),
  },
  contentSwipe: {
    flex: 1,
    width: '100%',
  },
  instruction: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  imgContentSwipe: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSwipe: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo1: {
    marginTop: -20.7,
    width: wp('45%'),
    height: hp('20%'),
  },
  imageLogo2: {
    marginTop: -40.77,
    marginBottom: 20,
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('20%'),
  },

  imageTeacher: {
    width: wp('45%'),
    height: hp('20%'),
    top: -60,
    alignSelf: 'center',
  },
  instructions: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    top: -80,
    marginTop: 20,
    padding: 20,
  },
  instructions2: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    marginTop: -30,
  },
  instructions3: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: 30,
    fontFamily: 'Montserrat-Medium',
    padding: 30,
  },
  instructions4: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  instructionsScreen2: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    top: -80,
    marginTop: -10,
    padding: 15,
  },
  textRowStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  textRowStyleBold: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  rowOfInformations: {
    marginTop: -140,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b2d8b5',
  },
  rowOfInformations2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -40,
  },
  establishmentInfo: {
    right: 0,
  },
  div1: {
    backgroundColor: 'black',
  },
  distance: {
    top: 12,
    marginHorizontal: 30,
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
  },
  gps: {
    top: 12,
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  tap: {
    position: 'absolute',
    width: wp('20'),
    height: hp('20'),
    marginLeft: 20,
    marginBottom: 40,
    zIndex: 2,
  },
  imageLogoRoad: {
    alignSelf: 'center',
    height: hp('15%'),
  },
  instructionsRoad1: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  instructionsRoad2: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  instructionsRoad3: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  imageLogoOrientation: {
    alignSelf: 'center',
    height: hp('15%'),
  },
  roadImage: {
    alignSelf: 'center',
    width: wp('55%'),
    height: hp('25%'),
  },
  instructionsOrientation1: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    paddingBottom: hp('3%'),
  },
  instructionsOrientation: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    paddingBottom: hp('3%'),
  },
  instructionsOrientation3: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: 30,
    fontFamily: 'Montserrat-Medium',
  },
  instructionsOrientation4: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    padding: hp('3%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  instructionsOrientation5: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: hp('3%'),

    fontFamily: 'Montserrat-Medium',
  },
  instructionsOrientation6: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: hp('3%'),

    fontFamily: 'Montserrat-Medium',
  },
  instructionsOrientation7: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: hp('3%'),

    fontFamily: 'Montserrat-Medium',
  },
  loginButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7.5),
  },
  startButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7.5),
  },
  closeButtonStyle: {
    backgroundColor: '#333333',
    elevation: 1,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7.5),
  },
  loginButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
});
