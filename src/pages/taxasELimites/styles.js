import { StyleSheet, Dimensions } from 'react-native';
import {  widthPercentageToDP as wp,  heightPercentageToDP as hp,} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: { 
        height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 86),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: { 
        height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 30),
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    footer: { 
        height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 85),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title: { 
        height: '12%', 
        width: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    guidance: { 
        height: '20%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    guidance2: { 
        height: '20%', 
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    rows: { 
        height: '45%', 
        width: '100%', 
        backgroundColor: '#FFFFFF'
    },
    columns: { 
        height: '25%', 
        width: '100%',
        flexDirection: 'row', 
    },
    column1: { 
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%', 
        width: '60%', 
        backgroundColor: '#FFFFFF'
    },
    column2: {
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%', 
        width: '40%', 
        backgroundColor: '#FFFFFF'
    },
    text: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: 18
    },
    textColumn1: { 
        fontFamily: 'Montserrat-Regular',
        color: 'black',
        fontSize: 15,
        paddingLeft: wp(3),
        backgroundColor: 'transparent'
    },
    textColumn2: { 
        fontFamily: 'Montserrat-SemiBold', 
        color: 'black',
        fontSize: 19
    }
})

export { styles };