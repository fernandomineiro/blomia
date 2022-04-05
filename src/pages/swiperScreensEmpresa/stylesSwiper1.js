import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {
    responsiveFontSize as responsiveFont
  } from "react-native-responsive-dimensions";
export const styles = StyleSheet.create({
    header: {
        height: '28%',
        alignItems: 'center',
        justifyContent: 'center',
    },  
    content: {
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    imageLogo: {
        marginTop: 23,
        marginBottom: 20,
        alignSelf: 'center',
        width: wp('45%'),
        height: hp('20%')
    },

    instructions: {
        fontSize: responsiveFont(2),
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        top: -80,
        padding: 20
      },
      imageTeacher: {
        width: wp('45%'),
        height: hp('20%'),
      }, 
      instructions2: {
        fontSize: responsiveFont(2),
        fontFamily: 'Montserrat-Medium',
      },
      instructions3: {
        fontSize: responsiveFont(2),
        textAlign: 'center',
        paddingVertical: 5,
        fontFamily: 'Montserrat-Medium',
        padding: 30
      },
      instructions4: {
        fontSize: responsiveFont(2.5),
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        paddingBottom: 30
      },
  }) 