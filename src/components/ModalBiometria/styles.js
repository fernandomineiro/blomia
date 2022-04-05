import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,   heightPercentageToDP as hp,  } from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: { 
        flex: 1,
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFFFFF'
    },
    containerLeft: {
        flex: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    containerRight: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fotoBiometria: { 
        justifyContent: 'center',
        width: wp(28),
        height: hp(18),
    },
    cancelar: { 
        height: '25%',
        justifyContent: 'flex-end',
    },
    estiloTexto: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(2)
    },
    containerImagem: {
        paddingTop: 10, 
        alignItems: 'center',
        height: '75%',
    },
    inserirParaAlterar: {
        height: '75%', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoInstrucao: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: responsiveFont(2),
        paddingHorizontal: 40, 
        textAlign: 'center'
    },
    validarComSenha: {
        height: '25%', 
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})

export {styles}