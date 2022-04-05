import {StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";


const styles = StyleSheet.create({

    btnCustom: {
        borderRadius: 300,
        backgroundColor: '#007f0b',
        width: wp(65),
        height: hp(7),
        justifyContent: 'center',
        borderColor: '#b3b3b3',
        borderWidth: 0.5,
        margin: 8,
        alignSelf: 'center'
    
    
    },
    textBtnCustom: {
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFont(2),
        fontFamily: 'Montserrat-Bold',
        
    }
})

export default styles;
