
import {StyleSheet} from 'react-native'
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    containerModal: {
        justifyContent: 'space-around', 
        paddingHorizontal: 60, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        width: '80%', 
        height: '30%', 
        alignSelf: 'center'
    },
    textConclusion: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: responsiveFontSize(2)
    },
    containerXButton: { 
        width: '-10%', 
        alignItems: 'flex-start', 
        height: '130%', 
        bottom: 7, 
        left: 2
    },
    xButtonText: { 
        fontSize: responsiveFontSize(2.4), 
        fontWeight: 'bold'
    },
    storeNameText: { 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: responsiveFontSize(2), 
        textAlign: 'center'
    },
    rateText: { 
        fontFamily: 'Montserrat-Bold', 
        fontSize: responsiveFontSize(2), 
        color: '#007f0b', 
        paddingBottom: 10
    },
})

export default styles;