import {StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: { 
        width: '100%',
        height: '20%',
        alignItems: 'center'
    },
    headerText: { 
        fontFamily: 'Montserrat-SemiBold',
        fontSize: responsiveFontSize(1.8)
    },
    content: {
        height: '65%', 
        alignItems: 'center',
    },
    question: { 
        justifyContent: 'flex-end',
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFontSize(2),
        color: '#4c4c4c'
    },
    inquiry: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFontSize(1.8)
    },
    inputValue: { 
        textAlign: 'center',
        width: widthPercentageToDP(85),
        fontFamily: 'Montserrat-SemiBold',
        fontSize: responsiveFontSize(5),
        color: '#007f0b'
    },
    valueView: { 
        alignItems: 'center',
        justifyContent: 'center',
        height: '35%',
    },
    textView: { 
        alignItems: 'center',
        justifyContent: 'center',
        height: '35%',
    },
    textOrientation: { 
        flex: 0.4,
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        paddingHorizontal: widthPercentageToDP(7)
    },
    textBarCode: { 
        flex: 0.4,
        fontFamily: 'Montserrat-Bold',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        paddingHorizontal: widthPercentageToDP(7)
    },
    gpsButtonStyle: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#007f0b',
        borderRadius: 300,
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(7),
    },
    footer: { 
        height: '25%',
        width: '100%',
        justifyContent: 'flex-start',
    },
    contentModal: {
        alignSelf: 'center',
        height: '55%',
        width: '85%',
        elevation: 2,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textContentModal0: { 
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: responsiveFontSize(2)
    }, 
    textContentModal1: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFontSize(2)
    }, 
    textContentModal2: {   
        color: 'black',
        fontFamily: 'Montserrat-Bold',
        fontSize: responsiveFontSize(2)
  },
})
