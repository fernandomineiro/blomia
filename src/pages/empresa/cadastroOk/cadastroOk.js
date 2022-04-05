import React, {Component} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import styles from './styles';

export default class RegisterComplete extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          fadeDuration={0}
          style={styles.imgLogo}
          resizeMethod="resize"
          resizeMode="contain"
          source={require('../../../assets/images/logo-2.png')}
        />
        <Image
          fadeDuration={0}
          style={styles.imgRegisterComplete}
          resizeMethod="resize"
          resizeMode="contain"
          source={require('../../../assets/images/registercomplete.png')}
        />
        <Text style={styles.informativeText}>
          Cadastro concluído com sucesso! Em no máximo 5 dias úteis a análise da
          sua empresa estará concluída.
        </Text>
      </View>
    );
  }
}
