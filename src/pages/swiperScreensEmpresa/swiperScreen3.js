/* eslint-disable */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
    responsiveFontSize as responsiveFont
} from "react-native-responsive-dimensions";

// const styles = StyleSheet.create({
//     imageLogoRoad: {
//         marginTop: 10,
//         marginBottom: 20,
//         alignSelf: 'center',
//         width: wp('45%'),
//         height: hp('20%')
//       },
//       roadImage: {
//         marginTop: -20,
//         marginBottom: 20,
//         alignSelf: 'center',
//         width: wp('65%'),
//         height: hp('30%')
//       },
//       instructionsRoad1: {
//         fontSize: responsiveFont(2),
//         textAlign: 'center',
//         fontFamily: 'Montserrat-Medium',
//         top: -80,
//         marginTop: 70,
//         padding: 20
//       },
//       instructionsRoad2: {
//         fontSize: responsiveFont(2),
//         textAlign: 'center',
//         fontFamily: 'Montserrat-Medium',
//         marginTop: 20,
//         padding: 40
//       },
//       instructionsRoad3: {
//         fontSize: responsiveFont(2),
//         textAlign: 'center',
//         paddingVertical: 30,
//         fontFamily: 'Montserrat-Medium',
//         padding: 30,
//         marginTop: 20
//       }
// })
import {styles} from './stylesSwiper3.js'
export default class SwiperScreen3 extends React.Component {
    render() {
        const logo = require('../../assets/images/logo-2.png'); 
        const roadImage = require('../../assets/images/roadImage.png');
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        resizeMode="contain"
                        resizeMethod="resize" 
                        style={styles.imageLogoRoad} 
                        source={require('../../assets/images/logo-2.png')} 
                    />
                </View>
    
                <View style={styles.content}>
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Text style={[styles.contentText, {textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: hp('3%')}]}>Como funciona cada saque ou depósito?</Text>
                    </View>
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Text style={[styles.contentText, {textAlign: 'center'}]}>Você pode configurar os valores, dias e horários em que os saques e/ou depósitos estarão disponíveis no seu negócio.</Text>
                    </View>
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Image 
                            resizeMode="contain"
                            resizeMethod="resize" 
                            style={styles.roadImage} 
                            source={roadImage}
                        /> 
                    </View>

                    <View style={{alignItems: 'center'}}>
                            <Text style={[styles.contentText, {textAlign: 'center'}]}>Uma vez que seu estabelecimento esteja ativo você pode ser localizado no App e receber solicitações dos usuários.</Text>
                        </View>
                </View>
    
            </View>
        )
    }
}

