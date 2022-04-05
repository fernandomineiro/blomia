import React, { Component } from 'react';
import {View, 
        Text, 
        Image,
        TouchableOpacity,
        StyleSheet,
        Dimensions
    } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import {
    responsiveFontSize as responsiveFont
  } from "react-native-responsive-dimensions";
import {TextInputMask} from 'react-native-masked-text'
import Modal from "react-native-modal";
import Logo from '../../../components/Logo/LogoBlomia.js';
let responsiveHeight = Dimensions.get("window").height
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: responsiveHeight - ((responsiveHeight / 100)*85),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    contentrows: { 
        justifyContent: 'flex-end',
        height: responsiveHeight - ((responsiveHeight / 100) * 70),
        backgroundColor: 'transparent',
    },
    footer: {
        justifyContent: 'center', 
        height: responsiveHeight - ((responsiveHeight / 100) * 58),
        backgroundColor: 'transparent'
    },
    imageicons: { 
        height: hp(6),
        width: wp(8),
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: '30%',
        borderWidth: 0.8,
        borderColor: '#BDB9B9'
    },
    row2: {
        borderColor: '#BDB9B9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 0.2,
        height: '30%',
        borderBottomColor: '#BDB9B9'
    },
    textcard: { 
        fontSize: responsiveFont(2),
        fontFamily: 'Montserrat-Regular',
        width: '70%'
    },
    addButtonStyle: {
        backgroundColor: '#007f0b',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 300,
        width: wp(65),
        height: hp(7),
        marginBottom: 10
      },
    addButtonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFont(2),
        fontFamily: 'Montserrat-Bold',
      },
    textContentModal0: { 
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: responsiveFont(2)
    },   
    textContentModal1: { 
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(2)
    },    
    textContentModal2: {   
        color: 'red',
        fontFamily: 'Montserrat-Bold',
        fontSize: responsiveFont(2)
  },
    contentModal: {
        alignSelf: 'center',
        height: '55%',
        width: '85%',
        elevation: 2,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    formsStyle: {
        alignSelf: 'center',
        marginBottom: 15,
        width: wp(65),
        height: hp(7),
        borderRadius: 300,
        paddingLeft: 20,
        textAlign: 'left',
        backgroundColor: 'transparent',
        borderColor: '#b3b3b3',
        borderWidth: 1.8,
        fontFamily: 'Montserrat-Medium',
        fontSize: responsiveFont(2)
      },

})

export default class Cards extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            isModal1Visible: false,
            isModal2Visible: false,
            isEditing: false,
            deletedFirst: false,
            deletedSecond: false,
            borderState: 0.9
        }
    }
    toggleModal1 = () => { 
        this.setState({ isModal1Visible: !this.state.isModal1Visible})
    };

    toggleModal2 = () => { 
        this.setState({ isModal2Visible: !this.state.isModal2Visible})
    };
    
    deleteFirst = () => {
        this.setState({deletedFirst: true, borderState: 0, isModal1Visible: !this.state.isModal1Visible})
    };

    deleteSecond = () => {
        this.setState({deletedSecond: true, borderState: 0, isModal2Visible: !this.state.isModal2Visible})
    };


    render() {

        let {deletedFirst, deletedSecond} = this.state


        return(
            
            <View style={styles.container}>
            {/* <CustomHeader title="Cards" navigation={this.props.navigation}/> */}
                    <View style={styles.header}>
                        <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'transparent'}}>
                            <Logo/>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '10%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat-Regular', fontSize: responsiveFont(2) }}>
                            Cartões de crédito
                        </Text>
                    </View>
                    <View style={styles.contentrows}>
                        { 
                        deletedFirst ?

                        <View/>
                        
                        :
                        
                        <View style={styles.row1}>
                            <Text style={styles.textcard}>MASTER CARD **** 1890</Text>
                            <TouchableOpacity onPress={() => this.toggleModal1()} style={{width: '19%'}}>
                                <Image source={require('../../../assets/images/trash.png')}
                                style={styles.imageicons}
                                resizeMethod='resize'
                                resizeMode='contain' 
                                />
                                

                        
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: '15%'}}>
                                <Image source={require('../../../assets/images/pencil.png')}
                                style={styles.imageicons}
                                resizeMethod='resize'
                                resizeMode='contain' 
                                />
                            </TouchableOpacity>
                        
                        </View>
                        }
                        
                        {
                        deletedSecond ?
                        
                        <View/>
                        
                        :

                        <View style={styles.row2}>
                            <Text style={styles.textcard}>MASTER CARD **** 1890</Text>
                            <TouchableOpacity onPress={this.toggleModal2} style={{width: '19%'}}>
                                <Image source={require('../../../assets/images/trash.png')}
                                style={styles.imageicons}
                                resizeMethod='resize'
                                resizeMode='contain' 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: '15%'}}>
                                <Image source={require('../../../assets/images/pencil.png')}
                                style={styles.imageicons}
                                resizeMethod='resize'
                                resizeMode='contain' 
                                />
                            </TouchableOpacity> 
                        </View>
                        }
                        <View style={{borderTopWidth: this.state.borderState, borderColor: '#BDB9B9' }}/>
                    </View>
                    
                    <View style={styles.footer}>
                        <View style={{backgroundColor: 'transparent', width: '100%', height: '40%', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={this.getNumber} style={styles.addButtonStyle}>
                                <Text style={styles.addButtonTextStyle}>
                                    ADICIONAR
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInputMask
                            type={'credit-card'}
                            options={{
                                obfuscated: true,
                            }}
                            value={this.state.creditCard}
                            onChangeText={text => {
                                this.setState({
                                creditCard: text
                                })
                            }}
                            style={styles.formsStyle}
                            ref={(ref) => this.creditCardField = ref}
                        />
                    </View>
                    <Modal isVisible={this.state.isModal1Visible}>
                    <View>
                        <View style={styles.contentModal}>
                            <View style={{ flex: 0.4}}>
                                <Text style={styles.textContentModal0}>Certeza que deseja excluir esse cartão de crédito?</Text>
                            </View>
                            <View style={{flexDirection: 'row', top: 20, flex: 0.3}}>
                                <View style={{marginRight: 60, alignItems: 'center'}}>
                                    <TouchableOpacity onPress={this.toggleModal1}>
                                        <Text style={styles.textContentModal1}>VOLTAR</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={this.deleteFirst}>
                                        <Text style={styles.textContentModal2}>EXCLUIR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.isModal2Visible}>
                    <View>
                        <View style={styles.contentModal}>
                            <View style={{ flex: 0.4}}>
                                <Text style={styles.textContentModal0}>Certeza que deseja excluir esse cartão de crédito?</Text>
                            </View>
                            <View style={{flexDirection: 'row', top: 20, flex: 0.3}}>
                                <View style={{marginRight: 60, alignItems: 'center'}}>
                                    <TouchableOpacity onPress={this.toggleModal2}>
                                        <Text style={styles.textContentModal1}>VOLTAR</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={this.deleteSecond}>
                                        <Text style={styles.textContentModal2}>EXCLUIR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                     
            </View>
        )
    }
}