import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,   heightPercentageToDP as hp,  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    imgLogo: { 
        marginTop: -20,
        width: wp('45%'),
        height: hp('20%')
    }
})

export {styles}