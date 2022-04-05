import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constantes/colors.js'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },
    imgLogo: {
        alignSelf: 'center',
        width: '45%',
        resizeMode: 'contain',
    },
    docsLogo: {
        alignSelf: 'center',
        width: '45%',
        resizeMode: 'contain',
    },  
    textDescription: {
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        color: '#4d4d4d',
        fontSize: responsiveFont(2),
        marginTop: '3%'
    },
    instructionsContainer: {
        padding: 40,
        flex: 0.1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    textGuidance: {
        marginTop: 50,
        alignSelf: 'center',
        paddingLeft: 10,
        paddingBottom: 20,
        fontFamily: 'Montserrat-Regular',
        fontSize: responsiveFont(2),
        color: '#4d4d4d'
    },
    proceedButton: {
        justifyContent: 'center',
        alignItems: 'center',        
        backgroundColor: '#007f0b',
        borderRadius: 300,
        width: wp(65),
        height: hp(7),
        backgroundColor: '#007f0b',
       
    },
    btnCustom: {
        color: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#007f0b',
        borderRadius: 300,
        width: wp(65),
        height: hp(7),

    },
    textBtnCustom: {
        fontFamily: 'Montserrat-Bold',
        color: '#F3F3F3',
        fontSize: responsiveFont(2)
    },
    instructionsStyle: {
       
        fontFamily: 'Montserrat-Regular',
        fontSize: responsiveFont(2),
        color: '#4d4d4d',
        flexDirection: 'row',
        textAlign: 'left',
        justifyContent: 'flex-start',
        marginTop: 3,
        alignSelf: 'flex-start'
    },

    boxLogo: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    imagesContainer: {
        
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    boxImg: {
        flex: 0.4
    },
    boxInfo: {
        flex: 0.4
    },
    boxBtn: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
    },
    textoAviso: { 
        paddingHorizontal: wp(17.98),
        marginBottom: 12,
        textAlign: 'center',
        fontSize: responsiveFont(1.8),
        fontFamily: 'Montserrat-Bold' 
    }
});