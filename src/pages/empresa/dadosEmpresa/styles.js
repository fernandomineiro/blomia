import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

const responsiveHeight = Dimensions.get("window").height;
const responsiveWidth = Dimensions.get("window").width;

function getResponsiveHeight(percentage) {
    let multiplier = ((percentage - 100) * -1);
    let rh = responsiveHeight - ((responsiveHeight / 100) * multiplier);
    return rh;
}

function getResponsiveWidth(percentage) { 
    let multiplier = ((percentage - 100) * -1);
    let rw = responsiveWidth - ((responsiveWidth / 100) * multiplier);
    return rw;
}

// function getResponsiveWidth(percentage) {
//     let rh = '';
//     return rh = responsiveHeight - ((responsiveHeight / 100) * (percentage -))
// }
const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    header: { 
        height: getResponsiveHeight(15),
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    content: { 
        height: getResponsiveHeight(60),
        width: responsiveWidth,
        backgroundColor: 'transparent'
    },
    titleView: { 
        width: responsiveWidth,
        height: getResponsiveHeight(10),
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    title: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(1.9)
    },
    cnpj: { 
        backgroundColor: 'transparent',
        height: getResponsiveHeight(7),
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(1.9),
        color: 'black'
    },
    form: { 
        alignItems: 'center',
        justifyContent: 'space-around',
        height: getResponsiveHeight(50),
        width: responsiveWidth,
        backgroundColor: 'transparent'
    },
    labelRow: { 
        alignItems: 'center',
        height: getResponsiveHeight(2.6),
        width: getResponsiveWidth(100),
        backgroundColor: 'transparent',
    },
    label: {
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(1.9)
    },
    inputRow: { 
        height: getResponsiveHeight(8),
        width: getResponsiveWidth(80),
        backgroundColor: 'transparent',
        elevation: 0,
        alignItems: 'center'
    },
    input: { 
        textAlign: 'center',
        borderRadius: 300,
        height: hp('6%'),
        width: wp('65%'),
        borderColor: '#b3b3b3',
        borderWidth: 1,
        fontFamily: 'Montserrat-Medium',
        alignItems: 'center',
        justifyContent: 'center',
    },
    note: { 
        fontFamily: 'Montserrat-Regular',
        fontSize: responsiveFont(1.2)
    },
    footer: { 
        height: getResponsiveHeight(40),
        width: responsiveWidth,
        backgroundColor: 'transparent'
    },
    noteCNPJView: { 
        width: responsiveWidth,
        height: getResponsiveHeight(5),
        backgroundColor: 'transparent',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    noteCNPJtext: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(1.7)
    },
    buttonView: { 
        height: getResponsiveHeight(12),
        width: responsiveWidth,
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    tryButton: { 
        position: 'absolute',
        elevation: 1, 
        width: responsiveWidth,
        height: getResponsiveHeight(50),
        paddingRight: wp(20), 
        backgroundColor: 'transparent', 
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }

})

export default styles;
