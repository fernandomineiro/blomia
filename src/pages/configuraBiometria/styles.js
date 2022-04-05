import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,   heightPercentageToDP as hp,  } from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont} from "react-native-responsive-dimensions";
import { COLORS } from '../../constantes/colors'

const styles = StyleSheet.create({ 

    container: { 
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },

    header: { 
        height: '20%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    content: { 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '60%',
    },

    footer: { 
        justifyContent: 'center',
        height: '20%',
        paddingBottom: 20
    },
    textTitulo: {
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(3),
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: '#4d4d4d'
    },

})

export {styles} 