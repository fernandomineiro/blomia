/* eslint-disable */
import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Button from 'apsl-react-native-button';
import { NavigationEvents } from 'react-navigation';

export default class DocumentOrientation extends React.Component {
    render() {


        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={styles.boxLogo}>
                    <Image
                        fadeDuration={0}
                        style={styles.imgLogo}
                        source={require('../../../assets/images/blomialogo.png')}
                    />
                </View>

                <View style={styles.imagesContainer}>

                    <Image
                        style={styles.docsLogo}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../../assets/images/docUser.png')} />
                </View>
                <View style={{ flex: 0.1 }}>
                    <Text style={styles.textDescription}>Siga o exemplo acima</Text>
                </View>

                <View style={styles.instructionsContainer}>

                    <Text style={styles.textGuidance}>Na próxima etapa você deve enviar uma foto sua segurando sua <Text style={{ fontFamily: 'Montserrat-Bold' }}>CNH</Text> ou <Text style={{ fontFamily: 'Montserrat-Bold' }}>RG</Text></Text>
                    <Text style={styles.instructionsStyle}><Text style={{ color: 'green' }}>●</Text> Tire a foto em um lugar iluminado</Text>
                    <Text style={styles.instructionsStyle} ><Text style={{ color: 'green' }}>●</Text> Não utilize bonés, chapéus e óculos</Text>
                    <Text style={styles.instructionsStyle}><Text style={{ color: 'green' }}>●</Text> Deixe o rosto bem visível</Text>
                    <Text style={styles.instructionsStyle}><Text style={{ color: 'green' }}>●</Text> Certifique-se que seu rosto e os dados do documento estão nítidos</Text>
                </View>
                <View style={styles.boxBtn}>

                    <Ripple rippleCentered={true} style={styles.btnCustom} onPress={ () => navigate('docUsuarioPg')} >
                        <Text style={styles.textBtnCustom}>PRÓXIMA ETAPA</Text>
                    </Ripple>

                </View>

            </View>
        )
    }
}