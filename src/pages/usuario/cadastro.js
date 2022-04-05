import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
// import * as Keychain from 'react-native-keychain';
import TextInputMask from 'react-native-text-input-mask';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
// import Modal from 'react-native-modal';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../config/api';
import styles from './styles';

import setClient from '../../store/actions/setClient';

import imgModalInfoNewCompany from '../../assets/images/infoAddCompany.png';

class Registry extends Component {
  state = {
    //Variáveis utilizadas no formulário
    // nomeUsuario: 'Igor Henrique',
    // cpfUsuario: '094.656.866-97',
    // celularUsuario: '11996886326',
    // senha: '123123',
    // confirmaSenha: '123123',

    nomeUsuario: '',
    cpfUsuario: '',
    celularUsuario: '',
    senha: '',
    confirmaSenha: '',

    //Variaveis pra controlar a exibição de erro com input vermelho
    InputNomeErro: false,
    InputCpfErro: false,
    InputCelularErro: false,
    InputSenhaErro: false,

    //Variaveis para receber as mensagens de erro
    nomeErroMsg: null,
    CpfErroMsg: null,
    CelularErroMsg: null,
    SenhaErroMsg: null,

    isFocusFieldName: false,
    isFocusFieldId: false,
    isFocusFieldCel: false,
    isFocusFieldPassword: false,
    isFocusFieldPasswordConnfirmed: false,

    //Variavel para controla o LOADING da tela
    spinner: false,

    //Array com msg de erro para o inputs
    listMsg: [],

    //Variavel controlado para definir se o cadastro é de empresa ou de pessoas fisica (PF ou PJ)
    tipoCad: this.props.navigation.state.params.tipoCad,

    //Variaveis de controle do modal
    exibirModal: false,
    tipoModal: 'erro',
    imgModal: null,

    isModalVisible: false,

    eraseName: '',
    x: '',

    selectedIndex: 0,
    placeholdermask: [
      '(00) 99999-0000',
      '100.100.100-30',
      '10.000.000/0001-10',
    ],
    mask: [
      '[00] [00000]-[0000]',
      '[000].[000].[000]-[00]',
      '[00].[000].[000]/[0000]-[00]',
    ],
  };

  toggleModal = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.state.exibirModal == true
      ? this.setState({exibirModal: false})
      : this.setState({exibirModal: true});
  };

  limpaSenha() {
    this.setState({InputSenhaErro: false});
    this.setState({senha: ''});
    this.setState({confirmaSenha: ''});
  }

  limpaCelular() {
    this.setState({InputCelularErro: false});
    this.setState({celularUsuario: ''});
  }

  limpaCpf() {
    this.setState({InputCpfErro: false});
    this.setState({cpfUsuario: ''});
  }

  limpaNome() {
    this.setState({InputNomeErro: false});
    this.setState({nomeUsuario: ''});
  }

  limpaMsgs(newArr) {
    this.setState({
      listMsg: newArr,
      imgModal: null,
    });
  }

  async validaCampos() {
    //Limpa todos as msgs de erro
    await this.limpaMsgs([]);
    let celularUsuario = await this.RemoveMascara(this.state.celularUsuario);
    this.setState({tipoModal: 'erro'}); //Apenas para CPF já cadastro o modal troca para o modelo de ALERTA

    if (this.state.cpfUsuario == '') {
      var msg = this.state.listMsg.concat('Favor informar o CPF');
      this.setState({listMsg: msg});
      this.setState({InputCpfErro: true});
    }

    if (this.state.nomeUsuario == '') {
      var msg = this.state.listMsg.concat('Favor informar o nome de usuário');
      this.setState({listMsg: msg});
      this.setState({InputNomeErro: true});
    }

    if (this.state.celularUsuario == '') {
      var msg = this.state.listMsg.concat('Favor informar o número de celular');
      this.setState({listMsg: msg});
      this.setState({InputCelularErro: true});
    }

    if (celularUsuario.length < 11) {
      var msg = this.state.listMsg.concat('Número de celular incompleto');
      this.setState({listMsg: msg});
      this.setState({InputCelularErro: true});
    }

    if (this.state.senha == '') {
      var msg = this.state.listMsg.concat('Favor informar uma senha');
      this.setState({listMsg: msg});
      this.setState({InputSenhaErro: true});
    }

    if (this.state.senha.length < 6) {
      var msg = this.state.listMsg.concat(
        'Favor informar uma senha de 6 digitos',
      );
      this.setState({listMsg: msg});
      this.setState({InputSenhaErro: true});
    }

    if (this.state.senha != this.state.confirmaSenha) {
      var msg = this.state.listMsg.concat(
        'O campo de senha e confirmação de senha devem se iguais.',
      );
      this.setState({listMsg: msg});
      this.setState({InputSenhaErro: true});
    }
  }

  RemoveMascara(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  async registraUsuario() {
    //Remove pontuação
    var CPF = await this.RemoveMascara(this.state.cpfUsuario);
    var NUMERO = await this.RemoveMascara(this.state.celularUsuario);
    // Cadastro usuário
    api
      .post('/auth', {
        user: {
          cpf: CPF,
          password: this.state.senha,
          phone_number: NUMERO,
          full_name: this.state.nomeUsuario,
        },
      })
      .then(async response => {
        this.setState({spinner: false});

        //Variaveis utilizadas no KEYCHAIN para acesso com biometria
        // const username = NUMERO;
        // const password = this.state.senha;

        // //Salva credenciais no device
        await AsyncStorage.setItem('blomia@tipoAutoLogin', '0');
        await AsyncStorage.setItem('blomia@textAutoLogin', NUMERO);
        await AsyncStorage.setItem(
          'blomia@passwordAutoLogin',
          this.state.senha,
        );
        this.props.setClient(response.data.user);
        //Armazena credencias
        // await Keychain.setGenericPassword(username, password);
        const tipoCadastro = this.props.navigation.getParam('tipoCad');

        this.props.navigation.navigate('CheckSmsPg', {
          tipoCad: tipoCadastro,
          telUsuario: this.state.celularUsuario,
        });
      })
      .catch(async error => {
        this.setState({spinner: false});

        if (error.response.status == 422) {
          if (error.response.data.errors === 'Invalid Phone Number.') {
            var msg = this.state.listMsg.concat('Número de telefone inválido!');
            this.setState({listMsg: msg});
            this.setState({InputCelularErro: true});
          }

          //Dados inválidos ou já registrados
          this.setState({tipoModal: 'erro'}); //Apenas para CPF já cadastrado o modal troca para o modelo de ALERTA

          //Busca erro do campo CPF
          if (error.response.data.errors.cpf) {
            let msgErroCpf = error.response.data.errors.cpf[0];

            if (msgErroCpf == 'has already been taken') {
              var msg = this.state.listMsg.concat('CPF já registrado!');
              this.setState({listMsg: msg});
              this.setState({tipoModal: 'alerta'});
              if (this.state.tipoCad === 'PJ') {
                this.setState({
                  imgModal: imgModalInfoNewCompany,
                });
              }
              this.setState({InputCpfErro: true});
              this.toggleModal();

              return false;
            } else if (msgErroCpf == 'is not a valid CPF') {
              var msg = this.state.listMsg.concat('CPF inválido');
              this.setState({listMsg: msg});
            }
            this.setState({InputCpfErro: true});
          }

          //Busca erro da campo celular
          if (error.response.data.errors.phone_number) {
            let msgErroPhone = error.response.data.errors.phone_number[0];

            if (msgErroPhone === 'has already been taken') {
              var msg = this.state.listMsg.concat(
                'Número de telefone já registrado!',
              );
              this.setState({listMsg: msg});
            } else if (msgErroPhone === 'Invalid Phone Number') {
              this.setState({CelularErroMsg: 'Número de telefone inválido'});
            }
            this.setState({InputCelularErro: true});
          }

          if (error.response.data.errors.full_name) {
            let msgErroNome = error.response.data.errors.full_name[0];

            if (msgErroNome === 'is invalid') {
              var msg = this.state.listMsg.concat(
                'Nome inválido - (Digite nome e sobrenome)',
              );
              this.setState({listMsg: msg});
            }
            this.setState({InputNomeErro: true});
          }

          if (this.state.listMsg.length > 0) {
            this.toggleModal();
            return false;
          }
        }

        if (error.response.status == 500) {
          this.setState({tipoModal: 'erro'});
          var msg = this.state.listMsg.concat('Erro inesperado no servidor.');
          this.setState({listMsg: msg});

          this.toggleModal();
          return false;
        }
      });
  }

  startRegistraUsuario = async () => {
    await this.validaCampos();
    if (this.state.listMsg.length > 0) {
      this.toggleModal();
      return false;
    }

    if (this.state.senha === this.state.confirmaSenha) {
      this.setState({InputSenhaErro: false});
      this.setState({spinner: true});

      await this.registraUsuario();
    } else {
      this.setState({InputSenhaErro: true});
      this.toggleModal();
      return false;
    }
  };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  loginPgLoad = () => {
    this.setState({exibirModal: false});
    this.props.navigation.navigate('LoginPg');
  };

  navegarCheckSmsPg = () => {
    this.startRegistraUsuario();
  };

  render() {
    return (
      <ScrollView>
        <ModalDefault
          openModal={this.state.exibirModal}
          closeModal={this.closeModal}
          MsgErro={this.state.listMsg}
          tipoModal={this.state.tipoModal}
          loginPgLoad={this.loginPgLoad}
          imageAdd={this.state.imgModal}
        />

        <Spinner
          visible={this.state.spinner}
          color="white"
          textStyle={styles.spinnerTextStyle}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <View style={styles.containerBtBack}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('preAcesso')}>
                <Icon name="arrow-left" size={30} color="#007f0b" />
              </TouchableOpacity>
            </View>
            <View style={styles.boxLogo}>
              <Image
                fadeDuration={0}
                style={styles.img}
                source={require('../../assets/images/blomialogo.png')}
              />
            </View>

            <View style={styles.boxInputs}>
              <View>
                {this.state.tipoCad == 'PJ' && (
                  <Text style={styles.titleStyle2}>Cadastro da empresa</Text>
                )}
                {this.state.tipoCad == 'PF' && (
                  <Text style={styles.titleStyle}>Meu Cadastro</Text>
                )}
              </View>

              <View>
                {this.state.tipoCad == 'PF' && (
                  <Text style={styles.textLabel}>Nome completo</Text>
                )}
                {this.state.tipoCad == 'PJ' && (
                  <Text style={styles.textLabel}>Nome proprietário/sócio</Text>
                )}
                <TextInput
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.InptCpf.focus();
                  }}
                  blurOnSubmit={false}
                  onChangeText={text =>
                    this.setState({nomeUsuario: text}, this.setState({x: '✕'}))
                  }
                  value={this.state.nomeUsuario}
                  placeholder={'Maria da Silva'}
                  style={
                    this.state.InputNomeErro === false
                      ? [
                          styles.InputText,
                          this.state.isFocusFieldName
                            ? {borderColor: '#477E22'}
                            : {borderColor: '#B3B3B3'},
                        ]
                      : [styles.InputText, {borderColor: 'red'}]
                  }
                  onFocus={() => {
                    this.setState({
                      isFocusFieldName: true,
                    });
                    this.state.InputNomeErro === true ? this.limpaNome() : null;
                  }}
                  onBlur={() => {
                    this.setState({isFocusFieldName: false});
                  }}
                />
              </View>

              <View>
                <Text style={[styles.textLabel]}>CPF </Text>
                <TextInputMask
                  refInput={input => {
                    this.InptCpf = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.InptTel.focus();
                  }}
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  value={this.state.cpfUsuario}
                  mask={this.state.mask[1]}
                  placeholder={this.state.placeholdermask[1]}
                  style={
                    this.state.InputCpfErro == false
                      ? [
                          styles.InputText,
                          this.state.isFocusFieldId
                            ? {borderColor: '#477E22'}
                            : {borderColor: '#B3B3B3'},
                        ]
                      : [styles.InputText, {borderColor: 'red'}]
                  }
                  onChangeText={text => this.setState({cpfUsuario: text})}
                  onFocus={() => {
                    this.setState({
                      isFocusFieldId: true,
                    });
                    this.state.InputCpfErro === true ? this.limpaCpf() : null;
                  }}
                  onBlur={() => {
                    this.setState({isFocusFieldId: false});
                  }}
                />
              </View>

              <View>
                <Text style={styles.textLabel}>Celular</Text>

                <TextInputMask
                  refInput={input => {
                    this.InptTel = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.InptPass.focus();
                  }}
                  blurOnSubmit={false}
                  value={this.state.celularUsuario}
                  keyboardType="numeric"
                  mask={this.state.mask[0]}
                  placeholder={this.state.placeholdermask[0]}
                  style={
                    this.state.InputCelularErro === false
                      ? [
                          styles.InputText,
                          this.state.isFocusFieldCel
                            ? {borderColor: '#477E22'}
                            : {borderColor: '#B3B3B3'},
                        ]
                      : [styles.InputText, {borderColor: 'red'}]
                  }
                  onChangeText={text => this.setState({celularUsuario: text})}
                  onFocus={() => {
                    this.setState({
                      isFocusFieldCel: true,
                    });
                    this.state.InputCelularErro === true
                      ? this.limpaCelular()
                      : null;
                  }}
                  onBlur={() => {
                    this.setState({isFocusFieldCel: false});
                  }}
                />
              </View>
                <Text style={styles.textLabel}>Criar senha</Text>
                <View style={{alignSelf: 'center'}}>
                  <View
                    style={
                      this.state.InputSenhaErro == false
                        ? [
                            styles.secureBox,
                            this.state.isFocusFieldPassword
                              ? {borderColor: '#477E22'}
                              : {borderColor: '#B3B3B3'},
                          ]
                        : [styles.secureBox, {borderColor: 'red'}]
                    }>
                    <SmoothPinCodeInput
                      placeholder={<View style={styles.placeholderPinStyle} />}
                      mask={
                        <View
                          style={
                            this.state.InputSenhaErro == false
                              ? [styles.pinMaskStyle]
                              : [styles.pinMaskStyle, {backgroundColor: 'red'}]
                          }
                        />
                      }
                      maskDelay={1000}
                      password={true}
                      cellStyle={null}
                      cellStyleFocused={null}
                      cellSize={responsiveFont(3)}
                      codeLength={6}
                      value={this.state.senha}
                      onTextChange={text =>
                        this.setState({textPwd: text, senha: text})
                      }
                      onFocus={() => {
                        this.setState({
                          isFocusFieldPassword: true,
                        });
                        this.state.InputSenhaErro == true
                          ? this.limpaSenha()
                          : null;
                      }}
                      ref={input => {
                        this.InptPass = input;
                      }}
                      // returnKeyType={"next"}
                      onSubmitEditing={() => {
                        this.InptPass2.focus();
                      }}
                      blurOnSubmit={false}
                      onBlur={() => {
                        this.setState({isFocusFieldPassword: false});
                        this.InptPass2.focus();
                      }}
                    />
                  </View>
                </View>
                <Text style={[styles.textLabel]}>Confirmar senha</Text>
                <View
                  style={
                    this.state.InputSenhaErro == false
                      ? [
                          styles.secureBox,
                          this.state.isFocusFieldPasswordConnfirmed
                            ? {borderColor: '#477E22'}
                            : {borderColor: '#B3B3B3'},
                        ]
                      : [styles.secureBox, {borderColor: 'red'}]
                  }>
                  <SmoothPinCodeInput
                    placeholder={<View style={styles.placeholderPinStyle} />}
                    mask={
                      <View
                        style={
                          this.state.InputSenhaErro == false
                            ? [styles.pinMaskStyle]
                            : [styles.pinMaskStyle, {backgroundColor: 'red'}]
                        }
                      />
                    }
                    maskDelay={1000}
                    password={true}
                    cellStyle={null}
                    onFocus={() => {
                      this.setState({
                        isFocusFieldPasswordConnfirmed: true,
                      });
                    }}
                    cellStyleFocused={null}
                    cellSize={responsiveFont(3)}
                    codeLength={6}
                    value={this.state.confirmaSenha}
                    onTextChange={text =>
                      this.setState({
                        textPwdConfirmation: text,
                        confirmaSenha: text,
                      })
                    }
                    ref={input => {
                      this.InptPass2 = input;
                    }}
                    onBlur={() => {
                      this.setState({isFocusFieldPasswordConnfirmed: false});
                    }}
                  />
                </View>
              <View>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#4D4D4D',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Todos os campos são obrigatórios
                </Text>
              </View>
            </View>

            <View style={styles.boxBtn}>
              <View>
                <ButtonCustom
                  navegar={this.navegarCheckSmsPg}
                  textButton={'CONTINUAR'}
                  btnColor={'#007f0b'}
                  textColor={'white'}
                  borderColor={'#007f0b'}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

const mapDispatchToProps = dispatch => {
  return {setClient: client => dispatch(setClient(client))};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registry);
