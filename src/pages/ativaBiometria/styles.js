import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  responsiveFontSize as responsiveFont
} from "react-native-responsive-dimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: { 
      height: '20%',
    },
    contentFirstRow: { 
      padding: 10,
      flexDirection: 'row',
      height: '20%',
      backgroundColor: 'transparent',
      alignItems: 'flex-end'
    },
    textFirstRowContent1: { 
      fontFamily: 'Montserrat-Bold',
      fontSize: responsiveFont(1.9),
    },
    textFirstRowContent2: { 
      fontFamily: 'Montserrat-Medium',
      fontSize: responsiveFont(1.8),
    },
    contentSecondRow: {
      padding: 10,
      flexDirection: 'row',
      height: '20%',
      backgroundColor: 'transparent',
      alignItems: 'center'
    },
    textSecondRowContent1: { 
      fontFamily: 'Montserrat-Bold',
      fontSize: responsiveFont(1.9),
    },
    textSecondRowContent2: { 
      fontFamily: 'Montserrat-Medium',
      fontSize: responsiveFont(1.8),
    },

    textHeader: { 
      fontFamily: 'Montserrat-Medium',
      fontSize: responsiveFont(2)
    },
    closeButtonStyle: {
      backgroundColor: '#333333',
      elevation: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 300,
      width: wp(65),
      height: hp(7),
    },
    closeButtonTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: responsiveFont(2),
      fontFamily: 'Montserrat-Bold',
    },
  });

  export {styles};