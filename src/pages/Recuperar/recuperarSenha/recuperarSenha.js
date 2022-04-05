/* eslint-disable */
import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import TextInputMask from 'react-native-text-input-mask';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import styles from './styles'
import { COLORS } from '../../../constantes/colors.js';

import api from '../../../config/api';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export default class Recovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      x: '',
      fontsize: 56,
      color: '#cccccc',
      selectedIndex: 0,
      placeholdermask: [
        '(31) 97521-4389',
        '135.888.963-74',
        '12.000.334/0001-66',
      ],
      mask: [
        '[00] [00000]-[0000]',
        '[000].[000].[000]-[00]',
        '[00].[000].[000]/[0000]-[00]',
      ],

      exibirModal: false,
      tipoModal: 'erro',
      isModalVisible: false,
      inputLoginErro: false,
      inputPwdErro: false,
      isFocusFieldPassword: false,
      MsgErro: [],

      //Variavel para controla o LOADING da tela
      spinner: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({ text: '' });
    this.setState({ selectedIndex });
  }


  checkUsuario(usuario) {

    this.setState({ MsgErro: [''] });

    switch (this.state.selectedIndex) {
      case 0: //CELULAR
        if (usuario == '') {
          this.setState({ MsgErro: ['Favor informa o celular'] });
          this.setState({ exibirModal: true })
          return false;
        }

        if (usuario.length < 11) {
          this.setState({ MsgErro: ['Celular incompleto, favor verificar.'] });
          this.setState({ exibirModal: true })
          return false;
        }
        break;

      case 1: //CPF
        if (usuario == '') {
          this.setState({ MsgErro: ['Favor informa o CPF'] });
          this.setState({ exibirModal: true })
          return false;
        }

        if (usuario.length < 11) {
          this.setState({ MsgErro: ['CPF incompleto, favor verificar.'] });
          this.setState({ exibirModal: true })
          return false;
        }
        break;

      case 2: //CNPJ
        if (usuario == '') {
          this.setState({ MsgErro: ['Favor informa o CNPJ'] });
          this.setState({ exibirModal: true })

          return false;
        }

        if (usuario.length < 14) {
          this.setState({ MsgErro: ['CNPJ incompleto, favor verificar.'] });
          this.setState({ exibirModal: true })
          return false;
        }
        break;
    }
    return true;
  }

  RemoveMascara(valor) {
    return valor.replace(/[^0-9]/g, '')
  }

  resetSenha = async () => {

    let usuario = this.RemoveMascara(this.state.text);
    let usuarioValidado = await this.checkUsuario(usuario);

    if (usuarioValidado) {

      var params = ''
      switch (this.state.selectedIndex) {
        case 0:
          params = "?phone_number=" + usuario

          break;

        case 1:
          params = "?cpf=" + usuario
          break;

        case 2:
          params = "?cnpj=" + usuario

          break;

      }

      this.setState({ MsgErro: [''] });
      this.setState({ spinner: true });

      api.get('/auth/password/edit' + params)
        .then(async response => {
          this.setState({ spinner: false });
          //Atualiza tokens para proxima requisição


          if (response.data.errors == "User not found.") {
            this.setState({ MsgErro: ['Usuário não encontrado.'] });
            this.setState({ exibirModal: true })
          }

          await AsyncStorage.setItem('tk_ReseteSenha', response.data.message[0].reset_password_token)
          this.props.navigation.navigate('CheckSmsPg', { telUsuario: this.state.text, resetSenha: true });

        })
        .catch(error => {
          this.setState({ spinner: false });

          //Atualiza tokens para proxima requisição

          if (error.response.data.errors == "User not found.") {
            this.setState({ MsgErro: ['Usuário não encontrado.'] });
            this.setState({ exibirModal: true })
          }

          if (error.response.data.errors == "Invalid Phone Number.") {
            this.setState({ MsgErro: ['Número não existe.'] });
            this.setState({ exibirModal: true })
          }

        });


    }

  }


  openModal = () => this.setState({ exibirModal: true })

  closeModal = () => this.setState({ exibirModal: false })


  render() {
    const { navigate } = this.props.navigation;

    const buttons = ['CEL', 'CPF', 'CNPJ'];
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={{ backgroundColor: 'white'}} >
        <View style={styles.container}>
          <Spinner visible={this.state.spinner} color="white" textStyle={styles.spinnerTextStyle} />
          <ModalDefault openModal={this.state.exibirModal} closeModal={this.closeModal} MsgErro={this.state.MsgErro} tipoModal={'erro'} />

          <View style={styles.logo}>
            <Image style={styles.imgLogo} resizeMode="contain" resizeMethod="resize" source={require('../../../assets/images/blomialogo.png')} />
          </View>

          <View style={styles.box1}>
            <Text style={styles.selectionTextStyle}>
              Selecione com qual acesso deseja {'\n'} alterar sua senha
          </Text>
          </View>

          <View style={styles.box2}>
            <ButtonGroup
              placeholder={this.state.placeholdermask[selectedIndex]}
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={styles.btnsGroup}
              selectedButtonStyle={styles.btnSelected}
              textStyle={styles.buttonsTextStyle}

            />
            <Text style={styles.userText}>Usuário</Text>
            <TextInputMask
              onChangeText={text => this.setState({ text }, this.setState({ x: '✕' }))}
              value={this.state.text}
              keyboardType={'numeric'}

              placeholder={this.state.placeholdermask[selectedIndex]}
              mask={this.state.mask[selectedIndex]}
              onFocus={() => this.setState({ isFocusFieldPassword: true })}
              onBlur={() => { this.setState({ isFocusFieldPassword: false })}}
              style={[styles.inputUserStyle, this.state.isFocusFieldPassword ? {borderColor: '#477E22'} : { borderColor: '#B3B3B3' }]} />

            <Text style={styles.informativeText}>
              Ao continuar, você irá receber {'\n'} um{' '}
              <Text style={{ fontWeight: 'bold' }}>SMS</Text> para alteração da sua
              senha.
          </Text>
          </View>


          <View style={styles.boxBtn}>

            <ButtonCustom navegar={this.resetSenha} textButton={'CONTINUAR'} btnColor={'#007f0b'} textColor={'white'} borderColor={'#007f0b'} />
          </View>
        </View>
      </ScrollView>


    );
  }
}
