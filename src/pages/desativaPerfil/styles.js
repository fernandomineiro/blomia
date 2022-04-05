import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
    },
    header: { 
        height: '15%', 
        backgroundColor: 'transparent', 
        alignItems: 'center'
    },
    content: { 
        height: '60%', 
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    text: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 15,
        textAlign: 'center'
    },
    firstParagraph: { 
        height: '20%', 
        width: '100%', 
        backgroundColor: 'transparent', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center'
    }, 
    secondParagraph: { 
        backgroundColor: 'transparent', 
        height: '30%', 
        width: '100%', 
        justifyContent: 'flex-end'
    },
    thirdParagraph: { 
        height: '20%', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'transparent'
    },
    footer: { 
        height: '25%', 
        width: '100%', 
        backgroundColor: 'transparent'
    },
    modalContainer: { 
        width: '60%', 
        height: '20%', 
        borderRadius: 15, 
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    modalTitleContainer: { 
        width: '100%', 
        height: '35%', 
        textAlign: 'center',
        justifyContent: 'center', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
    },
    modalFiller: { 
        width: '100%', 
        height: '30%', 
    },
    modalButtonFooter: { 
        width: '100%', 
        height: '35%', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15
    }

})

export { styles };