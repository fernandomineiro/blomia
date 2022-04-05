import {StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";


const styles = StyleSheet.create({
    
    content: {
        height: 300,
        backgroundColor: "#FFF", 
        marginTop: 10,      
        marginLeft: 20,
        marginRight: 20,        
        marginBottom: 5,
        borderColor: "#000",              
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,        
        elevation: 6,    
        flex: 0.8   
     },
    fundo: 
    {   backgroundColor: "rgba(0, 0, 0, 0.7)",
        flex: 1
    },
    remover: {
        backgroundColor: "#D60000",
         flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        color: "#F3F3F3",        
        flex: 0.1  
    },
    teste: {
        borderColor: "#000",
        borderWidth: 1,
        flex: 0.9
    },
    teste2: {
        backgroundColor: "#D60000",        
        color: "#F3F3F3",    
        flex: 0.1,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    btnCustom: {
        marginTop: 30,
        borderRadius: 300,
        backgroundColor: '#4d4d4d',
        width: wp(65),
        height: hp(7),
        justifyContent: 'center',

    },
    textBtnCustom: {
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFont(2),
        fontFamily: 'Montserrat-Bold',
    }

});

export default styles; 