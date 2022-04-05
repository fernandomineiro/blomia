/* eslint-disable */
import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";
import { styles } from './styles';
import Ripple from 'react-native-material-ripple';
import Button from 'apsl-react-native-button';
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
//import MenuDrawer from '../../navigators/menuDrawer.js'
///import MenuTab from '../../navigators/menuTab'

export default class DocumentOrientation extends React.Component {

    navegar = async ()  => {
         
        //O recomendado para realizar essa ação é utlizar o REDUX, foi utilizado
        //  essa solução paleativa para ganhar tempo de desenvolvimento - Feito por Pablo Lopes
        // await AsyncStorage.setItem('solicitarDoc', 'nao')
        this.props.navigation.navigate('inicioCliente');
        // this.props.navigation.goBack();

        // this.props.navigation.navigate(MenuTab, {}, {
        //     type: "Navigate",
        //     routeName: "Home",
        //     // HomeNav: { screen: MenuDrawer},
        //     params: {param: 'param'},
        // });

    }

render() {
    this.state = {
        isSecond: true
    }

    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>

            <View style={styles.boxLogo}>
                <Image
                    fadeDuration={0}
                    style={styles.imgLogo}
                    source={require('../../assets/images/blomialogo.png')}
                />
            </View>
            {this.state.isSecond &&
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textoAviso}>Você já realizou um saque, agora é importante que você atualize essa informação
                        </Text>
                </View>}
            <View style={styles.imagesContainer}>
                <Image
                    style={styles.docsLogo}
                    resizeMode="contain"
                    resizeMethod="resize"
                    source={require('../../assets/images/docUserMaleS.png')} />
            </View>
            <View style={{ flex: 0.1 }}>
                <Text style={styles.textDescription}>Siga o exemplo acima</Text>
            </View>

            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsStyle}><Text style={{ color: 'green' }}>●</Text> Tire a foto em um lugar iluminado</Text>
                <Text style={styles.instructionsStyle} ><Text style={{ color: 'green' }}>●</Text> Não utilize bonés, chapéus e óculos</Text>
                <Text style={styles.instructionsStyle}><Text style={{ color: 'green' }}>●</Text> Deixe o rosto bem visível</Text>
                <Text style={styles.instructionsStyle}><Text style={{ color: 'green' }}>●</Text> Certifique-se que seu rosto e os dados do documento estão nítidos</Text>
            </View>
            <View style={styles.boxBtn}>
                {this.state.isSecond ? (
                    <Ripple rippleCentered={true} style={[styles.btnCustom, { backgroundColor: '#333333' }]} onPress={() => navigate('docUsuarioPg')} >
                        <Text style={styles.textBtnCustom}>ATUALIZAR FOTO</Text>
                    </Ripple>
                ) : null
                }
                <Ripple rippleCentered={true} style={styles.btnCustom} onPress={ () => this.navegar() } >
                    <Text style={styles.textBtnCustom}>{this.state.isFirst ? ('INÍCIO') : ('INÍCIO')}</Text>
                </Ripple>



            </View>

        </View>
    )
}
}