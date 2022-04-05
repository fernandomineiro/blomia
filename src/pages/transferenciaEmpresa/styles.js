import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const responsiveHeight = Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 99);
const responsiveWidth = Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 97.2);

const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
        backgroundColor: 'transparent' 
    },
    header: { 
        height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 86), 
        width: '100%', 
        alignItems: 'center', 
        backgroundColor: 'transparent'  
    },
    content: { 
        height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 30), 
        width: '100%', 
        backgroundColor: 'transparent'
    }, 
    footer: { 
        height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 90),
        width: '100%', 
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export {styles};
