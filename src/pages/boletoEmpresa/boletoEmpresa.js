import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { responsiveFontSize as responsiveFont } from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { styles } from './styles';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

const logo = require('../../assets/images/logo-2.png');

export default class BoletoEmpresa extends Component {
  render() {
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
        <View style={{ alignItems: 'center', height: '37%' }}>
          <Text
            style={{
              height: '17%',
              fontFamily: 'Montserrat-Medium',
              fontSize: responsiveFont(2),
            }}
          >
            Boleto na empresa
          </Text>
          <Image
            style={styles.imageBank}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../assets/images/mobile-banking.png')}
          />
        </View>
        <View style={{ alignItems: 'center', height: '28%' }}>
          <Text
            style={{
              height: '45%',
              fontFamily: 'Montserrat-Medium',
              fontSize: responsiveFont(2),
              textAlign: 'center',
              paddingHorizontal: wp(10),
            }}
          >
            O boleto empresa é o meio pelo qual você irá depositar dinheiro no
            Blomia da sua empresa.
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: responsiveFont(2),
              textAlign: 'center',
              paddingHorizontal: wp(10),
            }}
          >
            Basta gerar o boleto no valor que deseja depositar, pagar o boleto e
            o dinheiro ficará automaticamente disponível no perfil.
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '12%',
          }}
        >
          <ButtonCustom
            btnColor="#007f0b"
            textColor="#ffffff"
            textButton="CONTINUAR"
          />
        </View>
      </View>
    );
  }
}
