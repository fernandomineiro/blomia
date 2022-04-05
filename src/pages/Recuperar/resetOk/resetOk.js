import React, {Component} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom';
import styles from './styles';

export default class resetOk extends React.Component {
  navegarLoginPg = () => {
    this.props.navigation.navigate('LoginPg');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: '10%'}}>
          <Image
            fadeDuration={0}
            style={styles.imgLogo}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../../assets/images/logo-2.png')}
          />
        </View>

        <View>
          <Image
            fadeDuration={0}
            style={styles.imgRegisterComplete}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../../assets/images/registercomplete.png')}
          />
        </View>
        <View>
          <Text style={styles.informativeText}>
            Senha alterada {'\n'}com sucesso!
          </Text>
        </View>

        <View>
          <ButtonCustom
            rippleCentered={true}
            navegar={this.navegarLoginPg}
            textButton={'ENTRAR'}
            btnColor={'#007f0b'}
            textColor={'white'}
            borderColor={'#007f0b'}
          />
        </View>
      </View>
    );
  }
}
