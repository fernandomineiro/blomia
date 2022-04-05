import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

import Animation from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

import {Icon} from 'react-native-elements';
import swiper2img from '../../assets/images/swiper2img.png';
import {styles} from './stylesSwiper2.js';

export default class SwiperScreen2 extends React.Component {
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

        <View style={styles.content}>
          <Text style={styles.instructions1}>
            Defina o valor de seu saque ou depósito, em seguida serão listados
            locais próximos a você.
          </Text>
          <View style={styles.containerImage}>
            <Image
              style={styles.imgPrincipal}
              resizeMode="cover"
              source={swiper2img}
            />
          </View>
          <Text style={styles.instructionsFooter}>
            Selecione o estabelecimento de sua preferência, e o mapa irá mostrar
            como chegar ao local.
          </Text>
        </View>
      </View>
    );
  }
}
const logo = require('../../assets/images/logo-2.png');
