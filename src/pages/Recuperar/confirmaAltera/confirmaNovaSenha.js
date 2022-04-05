/* eslint-disable  */
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import ModalDefault from '../../../components/ModalDefault/ModalDefault'
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";
import api from '../../../config/api';


import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import AsyncStorage from '@react-native-community/async-storage';

export default class Alter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textPwd1: '',
      textPwd2: '',
      inputSenha1Erro: false,
      inputSenha2Erro: false,
      listMsg: [],
      exibirModal: false,
      tipoModal: 'erro',
      isModalVisible: false,
      x: '',
      firstValueError: false,
      secondValueError: false,
      isFocusFieldPassword: false,
      isFocusFieldPasswordConfirmed: false,

      tokenResetSenha: null,

      InputSenhaErro: false
    }
  }


 
  toggleModal = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.state.exibirModal == true ? this.setState({ exibirModal: false }) : this.setState({ exibirModal: true });
  };


  openModal = () => this.setState({ exibirModal: true })

  closeModal = () => this.setState({ exibirModal: false })

  limpaMsgs(newArr) {
    this.setState({
      listMsg: newArr,
    });
  }

  RemoveMascara(valor) {
    return valor.replace(/[^0-9]/g, '')
  }

  resetaBorda() {
    this.setState({ inputSenhaErro: false })

  }
  async verifySize() {
    await this.limpaMsgs([]);
    await this.resetaBorda();
    if (this.state.textPwd1 < 6 || this.state.textPwd2 < 6 || this.state.textPwd1 != this.state.textPwd2) {
      if (this.state.textPwd1 < 6) {
        this.setState({ inputSenhaErro: true })
        let msg = this.state.listMsg.concat('A senha deve conter pelo menos 6 dígitos e os dois campos devem ser preenchidos');
        this.setState({ listMsg: msg })
        this.openModal()
        return
      } else if (this.state.textPwd2 < 6) {
        this.setState({ inputSenhaErro: true })
        let msg = this.state.listMsg.concat('As duas senhas devem ser iguais e devem conter pelo menos 6 dígitos.')
        this.setState({ listMsg: msg })
        this.openModal()
        return
      } else if (this.state.textPwd1 != this.state.textPwd2) {
        this.setState({ inputSenhaErro: true })
        this.setState({ inputSenhaErro: true })
        let msg = this.state.listMsg.concat('As duas senhas devem ser iguais.');
        this.setState({ listMsg: msg })
        this.openModal()
        return
      }
    }
    else { //SENHA OK E ENVIA PARA ENDPOINT
      this.RegistraNovaSenha();
    }
  }

  async RegistraNovaSenha() {
    const TokenResetSenha = await AsyncStorage.getItem('tk_ReseteSenha');

    api.patch('auth/password?reset_password_token=' + TokenResetSenha, {
      password: this.state.textPwd1,
      password_confirmation: this.state.textPwd2,
    })
      .then(async response => {
        //PRECISA CRIA LOLGICA PARA RESETAR BIOMETRIA

        //Atualiza tokens para proxima requisição                
    

        this.props.navigation.navigate('ResetOkPg')
        

      })
      .catch(error => {
        //Atualiza tokens para proxima requisição                

      })

  }

  handleFocus = (condition) => {
    if (condition) {
      this.inputFirstValue.focus();
    } else {
      return
    }
  }


  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ModalDefault openModal={this.state.exibirModal} closeModal={this.closeModal} MsgErro={this.state.listMsg} tipoModal={this.state.tipoModal} loginPgLoad={this.loginPgLoad} />
        <View style={styles.firstDivision}>
          <Image
            style={styles.imgLogo}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../../assets/images/logo-2.png')} />

          <Text style={styles.pageDescription}>Alterar senha</Text>
        </View>

        {/* <View style={{ alignSelf: 'center' }}>
          <Text style={styles.newPasswordtext}>Nova senha</Text>
          <View style={this.state.inputSenha1Erro == true ? [styles.secureBox, { borderColor: 'red' }] : styles.secureBox}>
            <SmoothPinCodeInput
              refInput={(input) => { this.inputFirstValue = input; }}
              placeholder={<View style={styles.placeholderPinStyle}>
              </View>}
              mask={<View style={styles.pinMaskStyle}></View>}
              maskDelay={1000}
              password={true}
              cellStyle={null}
              cellStyleFocused={null}
              cellSize={36}
              codeLength={6}
              value={this.state.textPwd1}
              returnKeyType={"next"}
              onTextChange={text => this.setState({ textPwd1: text })}
              onFocus={() => this.resetaBorda()}
            />
          </View>
          <Text style={styles.newPasswordtext}>Confirmar nova senha</Text>
          <View style={this.state.inputSenha2Erro == true ? [styles.secureBox, { borderColor: 'red' }] : styles.secureBox}>
            <SmoothPinCodeInput
              refInput={(input) => { this.inputSecondValue = input; }}
              placeholder={<View style={styles.placeholderPinStyle}>
              </View>}
              mask={<View style={styles.pinMaskStyle}></View>}
              maskDelay={1000}
              password={true}
              cellStyle={null}
              cellStyleFocused={null}
              cellSize={36}
              codeLength={6}
              value={this.state.textPwd2}
              onTextChange={text => this.setState({ textPwd2: text })}
              onFocus={() => this.resetaBorda()} />

          </View> 
        </View>*/}
        <View style={{ alignSelf: 'center' }}>
          <View>
            <Text style={styles.textLabel}>Criar senha</Text>
            <View style={{ alignSelf: 'center' }}>

              <View 
                style={this.state.InputSenhaErro == false ? [styles.secureBox, this.state.isFocusFieldPassword ? {borderColor: '#477E22'} : { borderColor: '#B3B3B3' }] : [styles.secureBox, { borderColor: 'red' }]} >
                <SmoothPinCodeInput
                  placeholder={<View style={styles.placeholderPinStyle}></View>}
                  mask={
                    <View style={
                      this.state.InputSenhaErro == false 
                      ? [styles.pinMaskStyle] 
                      : [styles.pinMaskStyle, 
                      { backgroundColor: 'red' }]} />
                  }
                  maskDelay={1000}
                  password={true}
                  cellStyle={null}
                  cellStyleFocused={null}
                  cellSize={responsiveFont(3)}
                  codeLength={6}
                  value={this.state.senha}
                  onTextChange={text => this.setState({ textPwd1: text, senha: text })}
                  onFocus={() => { 
                    if(this.state.InputSenhaErro == true) {
                      this.limpaSenha()
                    }; 
                    this.setState({ isFocusFieldPassword: true });
                  }}
                  ref={(input) => { this.InptPass = input; }}
                  // returnKeyType={"next"}
                  onSubmitEditing={() => { this.InptPass2.focus(); }}
                  blurOnSubmit={false}
                  onBlur={() => { this.InptPass2.focus(); this.setState({ isFocusFieldPassword: false });}}

                />
              </View>
            </View>

          </View>

          <View>
            <Text style={[styles.textLabel]}>Confirmar senha</Text>
            <View style={this.state.InputSenhaErro == false ? [styles.secureBox, this.state.isFocusFieldPasswordConfirmed ? {borderColor: '#477E22'} : { borderColor: '#b3b3b3' }] : [styles.secureBox, { borderColor: 'red' }]} >
              <SmoothPinCodeInput
                placeholder={<View style={styles.placeholderPinStyle}>
                </View>}
                mask={<View style={this.state.InputSenhaErro == false ? [styles.pinMaskStyle] : [styles.pinMaskStyle, { backgroundColor: 'red' }]}></View>}
                maskDelay={1000}
                password={true}
                cellStyle={null}
                cellStyleFocused={null}
                cellSize={responsiveFont(3)}
                codeLength={6}
                value={this.state.confirmaSenha}
                onTextChange={text => this.setState({ textPwd2: text, confirmaSenha: text })}
                ref={(input) => { this.InptPass2 = input; }}
                onBlur={() => {this.setState({ isFocusFieldPasswordConfirmed: false });}}
                onFocus={() => {
                  this.setState({ isFocusFieldPasswordConfirmed: true });
                }}
              />
            </View>
          </View>
        </View>


        <TouchableOpacity onPress={() => this.verifySize(this.state.textPwd1, this.state.pwd2)} style={styles.loginButtonStyle}><Text style={{ color: 'white', fontSize: 'Montserrat', fontSize: 18, fontWeight: 'bold' }}>FINALIZAR</Text></TouchableOpacity>
      </View>
    );
  }
}