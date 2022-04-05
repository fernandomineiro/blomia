import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    alignSelf: 'center',
    height: hp('15%'),
  },
  containerImage: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('10%'),
    marginBottom: hp('10%'),
  },
  instructions1: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    paddingBottom: hp(3),
  },
  instructionsFooter: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    paddingBottom: hp(3),
  },
  instructions2: {
    fontSize: responsiveFont(1.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    paddingBottom: hp(3),
  },
  imgPrincipal: {
    height: hp(45),
    width: wp(70),
    marginTop: hp(0),
  },
  footer: {
    flex: 0.65,
    justifyContent: 'space-around',
    height: '15%',
  },
  columnFooter1: {
    flex: 0.5,
    height: '50%',
    backgroundColor: 'green',
  },
  columnFooter2: {
    flex: 0.5,
    height: '50%',
    backgroundColor: 'purple',
  },
  columnFooter3: {
    height: '50%',
    backgroundColor: 'white',
  },
  columnFooter4: {
    height: '50%',
    backgroundColor: 'green',
  },
  columnsFooter1: {
    flex: 0.37,
    height: '50%',
    flexDirection: 'row',
  },
  columnsFooter2: {
    flex: 0.5,
    height: '50%',
    flexDirection: 'row',
  },
  rowsFooter1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#b2d8b5',
  },
  rowsFooter2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerFooter2: {
    height: '10%',
    backgroundColor: 'red',
  },
  containerFooter3: {
    height: '20%',
    backgroundColor: 'green',
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFont(1.7),
  },
  tap: {
    position: 'absolute',
    width: wp('30'),
    height: hp('10'),
    zIndex: 2,
  },
});
