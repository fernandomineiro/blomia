import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,   heightPercentageToDP as hp,  } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({ 
    imgBiometria: {
        justifyContent: 'center',
        width: wp(22),
        height: hp(18),
    }    
})

