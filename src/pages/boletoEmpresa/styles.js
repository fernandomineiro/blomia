import { StyleSheet } from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
    responsiveFontSize as responsiveFont
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    header: {
        height: '16%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageLogo: {
        alignSelf: 'center',
        width: wp('45%'),
        height: hp('20%'),
    },
    imageBank: {
        alignSelf: 'center',
        width: wp('80%'),
        height: hp('26%'),
    },
})