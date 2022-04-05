import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js';
import Animation from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

import {Icon} from 'react-native-elements';
import {styles} from './stylesSwiper2.js';
const roadImage = require('../../assets/images/roadImage.png');
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
          <Text style={styles.instructions2}>
            Quais as vantagens para minha empresa?
          </Text>
          <View style={{flexDirection: 'row', height: '25%', width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                alignItems: 'center',
                height: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: responsiveFont(1.9),
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                }}>
                1 - Atrair clientes com dinheiro para seu estabelecimento.
              </Text>
            </View>
            <View
              style={{width: '50%', justifyContent: 'center', height: '100%'}}>
              <Image
                style={{height: hp(20), width: wp(30), marginLeft: wp(12)}}
                source={require('../../assets/images/shopping.png')}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', height: '25%', width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Image
                style={{height: hp(20), width: wp(30)}}
                source={require('../../assets/images/truck.png')}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                height: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: responsiveFont(1.9),
                  paddingVertical: 20,
                  paddingHorizontal: 2,
                  textAlign: 'center',
                }}>
                2 - Reduzir o risco e custos no transporte de valores.
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', height: '25%', width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',

                alignItems: 'center',
                height: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: responsiveFont(1.9),
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                }}>
                3 - O seu dinheiro que vai para o Blomia está 100% seguro.
              </Text>
            </View>
            <View
              style={{width: '50%', justifyContent: 'center', height: '100%'}}>
              <Image
                style={{height: hp(20), width: wp(29), marginLeft: wp(12)}}
                source={require('../../assets/images/secure-shield.png')}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const logo = require('../../assets/images/logo-2.png');
