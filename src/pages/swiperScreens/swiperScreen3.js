import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  imageLogoRoad: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('20%'),
  },
  roadImage: {
    marginTop: -20,
    marginBottom: 20,
    alignSelf: 'center',
    width: wp('65%'),
    height: hp('30%'),
  },
  instructionsRoad1: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    top: -80,
    marginTop: 70,
    padding: 20,
  },
  instructionsRoad2: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
    padding: 40,
  },
  instructionsRoad3: {
    fontSize: responsiveFont(2),
    textAlign: 'center',
    paddingVertical: 30,
    fontFamily: 'Montserrat-Medium',
    padding: 30,
    marginTop: 20,
  },
});

export default class SwiperScreen3 extends React.Component {
  render() {
    const logo = require('../../assets/images/logo-2.png');
    const roadImage = require('../../assets/images/roadImage.png');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.imageLogoRoad}
          source={logo}
        />

        <Text style={styles.instructionsRoad1}>
          Após avaliar as opções disponíveis, encaminhe-se ao local de sua
          preferência.
        </Text>

        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.roadImage}
          source={roadImage}
        />

        <Text style={styles.instructionsRoad2}>
          No estabelecimento onde deseja sacar ou depositar o dinheiro, você
          será perguntado e deve informar ao responsável o código gerado no
          aplicativo.
        </Text>

        <Text style={styles.instructionsRoad3}>
          Deixe para gerar o código o mais próximo possível do loca, pois eles
          expiram.
        </Text>
      </View>
    );
  }
}
