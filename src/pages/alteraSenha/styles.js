import { StyleSheet, Dimensions } from 'react-native';
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
        backgroundColor: 'transparent'
    },
    header: { 
        height: Dimensions.get("window").height - ((Dimensions.get("window").height/100)*80),
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Montserrat',
        fontSize: 14
    },
    pageDescription: {
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(2),
        textAlign: 'center',
    },
    fieldDescription: {
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(1.7),
        paddingLeft: 90,
    },
    inputsDivision: {
        flex: 1,
        justifyContent: 'flex-start',
        textAlign: 'center'
    },
    inputPasswordStyle1: {
        alignSelf: 'center',
        width: wp(65),
        height: hp(7),
        borderRadius: 300,
        borderColor: 'rgb(196, 196, 196)',
        borderWidth: 1.8,
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        letterSpacing: 20,
        color: '#808080',
        textAlign: 'center',
        alignItems: 'center',
    },
    inputPasswordStyle2: {
        alignSelf: 'center',
        width: wp(65),
        height: hp(7),
        borderRadius: 300,
        backgroundColor: 'transparent',
        borderColor: 'rgb(196, 196, 196)',
        borderWidth: 1.8,
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        letterSpacing: 20,
        color: '#808080',
        textAlign: 'center',
        alignItems: 'center',
    },
    loginButtonStyle: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#007f0b',
        borderRadius: 300,
        width: wp(60),
        height: hp(7),
    },
    pinMaskStyle: { 
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: '#007f0b',
      },
      inputPasswordStyle: {
        paddingBottom: 2,
        paddingTop: 1,
        alignSelf: 'center',
        borderRadius: 300,
        width: wp('65%'),
        height: hp('7'),
        borderColor: 'rgb(196, 196, 196)',
        borderWidth: 1.8,
        fontSize: responsiveFont(4.2),
        textAlign: 'center',
        justifyContent: 'center',
        letterSpacing: wp('4%'),
        color: '#808080',
        fontFamily: 'Montserrat-Bold'
      },
      secureBox: { 
        width: wp('65%'),
        height: hp('7%'),
        borderWidth: 1.8,
        borderColor: '#b3b3b3',
        borderRadius: 300,
        alignItems: 'center',   
        justifyContent: 'center',
        marginBottom: 0 
      },
      secureText: { 
        fontSize: responsiveFont('4.8'),
        fontFamily: 'Montserrat-Medium'
      },
      newPasswordtext: {
        justifyContent: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(2),
        marginTop: 10
      },
      placeholderPinStyle: { 
        textAlign: 'center',
        width: 10,
        height: 10,
        borderRadius: 25,
        opacity: 0.3,
        backgroundColor: '#808080',
        borderRadius: 25,
      },
      footer: { 
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
          height: Dimensions.get("window").height - ((Dimensions.get("window").height / 100) * 90)
      }

});

const stylesAlter = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    header: { 
        alignItems: 'center', 
        height: '15%', 
        width: '100%'
    },
    content: { 
        backgroundColor: 'transparent',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    padlock: { 
        height: hp(50),
        width: wp(50)
    },
    footer: { 
        height: '40%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: { 
        fontFamily: 'Montserrat-Regular',
        fontSize: responsiveFont(2)
    },
    button: {
        marginTop: 10,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#007f0b',
        borderRadius: 300,
        width: wp(60),
        height: hp(7),
    },
})


export {styles, stylesAlter};