import {StyleSheet } from 'react-native';
import { widthPercentageToDP as wp,   heightPercentageToDP as hp,  } from 'react-native-responsive-screen';
import {  responsiveFontSize as responsiveFont  } from "react-native-responsive-dimensions";
import { COLORS } from '../../constantes/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
    position: 'relative',
  },
  box: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeader: {
    width: '100%',
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  containerBtBack: {
    position: 'absolute',
    left: wp('6%'),
    top: hp('5%'),
  },
  imgLogo: {
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('15%'),
  },
  buttonsContainer: {
      flexDirection: 'column',
      marginTop: 400,
  },
  button1Text: {
      color: 'white',
      textAlign: 'center',
      fontSize: responsiveFont(2),
      fontFamily: 'Montserrat-Bold',
  },
  button2Text: {
      color: 'black',
      textAlign: 'center',
      fontSize: responsiveFont(2),
      fontFamily: 'Montserrat-Bold',
  },
  button1: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      backgroundColor: '#007f0b',
      borderRadius: 90,
      bottom: 90,
      width: wp(60),
      height: hp(7)
  },
  button2: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: 'transparent',
      borderColor: '#808080',
      borderWidth: 0.5,
      borderRadius: 90,
      bottom: 90,
      width: wp(60),
      height: hp(7),
  },
  img: {
      width: wp('60%')
  },
  clearButtonStyle: {
      paddingTop: hp('1.2'),
      paddingLeft: wp('2'),
      left: wp('54'),
      top: hp('3.2'),
      position: 'absolute',
    },

    })


export default styles;
