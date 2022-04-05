import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js'
import api from '../../config/api';
import Animation from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
    responsiveFontSize as responsiveFont
} from "react-native-responsive-dimensions";
const logo = require('../../assets/images/logo-2.png'); 
import {styles} from './stylesSwiper4';
export default class SwiperScreen4 extends Component { 
    render() { 
        const { navigate } = this.props.navigation;
        return ( 
            
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        resizeMode="contain"
                        resizeMethod="resize" 
                        style={styles.imageLogo} 
                        source={logo} 
                    />
                </View>
                <View style={{height: '70%', alignItems: 'center'}}>
                    <Text style={[styles.instructions, {height: '10%'}]}>Orientações finais para saque e depósito</Text>

                    <Text style={[styles.instructions, {paddingHorizontal: 20}]}>O solicitante irá chegar no estabelecimento e informar que pediu um saque ou depósito Blomia. Solicite a pessoa o código gerado e digite-o no seu aplicativo Blomia</Text>
                    <View style={{justifyContent: 'center', height: '15%'}}>
                        <Text style={styles.instructions}>SAQUE</Text>
                    </View>
                    <Text style={[styles.instructions, {paddingHorizontal: 80}]}>Somente entregue o dinheiro quando concluir no Blomia</Text>
                    <View style={{justifyContent: 'center', height: '15%'}}>
                        <Text style={styles.instructions}>DEPÓSITO</Text>
                    </View>
                    <Text style={styles.instructions}>Só finalize no Blomia após receber o dinheiro do depósito em mãos</Text>
                    <View style={{justifyContent: 'flex-end', height: '25%'}}>
                        <ButtonCustom navegar={ () => this.props.navigation.navigate("HomeNav") } 
                            btnColor={'#007f0b'} 
                            textColor={'#ffffff'}
                            textButton={'COMEÇAR A USAR'}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
