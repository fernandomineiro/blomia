import {  StyleSheet,} from 'react-native';
import {  widthPercentageToDP as wp,  heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import {  responsiveFontSize as responsiveFont} from "react-native-responsive-dimensions";
import { COLORS } from '../../../constantes/colors'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 60,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: COLORS.BACKGROUND
    },
    imgLogo: {
      width: wp(100),
      height: hp(15),
      marginTop: -140
    },
    imgRegisterComplete: {
      width: wp('50'),
      height: hp('40'),
      marginTop: -100
    },
    informativeText: {
      marginTop: -60,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      fontSize: responsiveFont(2)
    }
  })

  export default styles;