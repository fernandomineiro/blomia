import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

export default class tipoCadastro extends React.Component {
  navegarCadUsuarioPgPF = () => {
    this.props.navigation.navigate('CadUsuarioPg', {tipoCad: 'PF'});
  };

  navegarCadUsuarioPgPJ = () => {
    this.props.navigation.navigate('CadUsuarioPg', {tipoCad: 'PJ'});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerBtBack}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('preAcesso')}>
            <Icon name="arrow-left" size={30} color="#007f0b" />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Image
            fadeDuration={0}
            style={styles.img}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../assets/images/blomialogo.png')}
          />
        </View>

        <View style={styles.box}>
          <View>
            <ButtonCustom
              navegar={this.navegarCadUsuarioPgPF}
              textButton={'PARA VOCÊ'}
              btnColor={'#007f0b'}
              textColor={'white'}
              borderColor={'#007f0b'}
            />
            <ButtonCustom
              navegar={this.navegarCadUsuarioPgPJ}
              textButton={'PARA SUA EMPRESA'}
              btnColor={'#ffffff'}
              textColor={'#4d4d4d'}
              borderColor={'#4d4d4d'}
            />
          </View>
        </View>
      </View>
    );
  }
}
