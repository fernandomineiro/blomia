import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Feather';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

import api from '../../config/api';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {limitadorString} from '../../utils/funcoes';

// import * as Keychain from 'react-native-keychain';

import setClient from '../../store/actions/setClient';
import setAddressClient from '../../store/actions/setAddressClient';
import styles from './styles';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rota: '',
      text: '',
      textPwd: '',
      x: '',
      color: '#080808',
      selectedIndex: 0,
      placeholdermask: [
        '(31) 99999-0000',
        '100.100.100-10',
        '10.000.000/0001-10',
      ],
      mask: [
        '[00] [00000]-[0000]',
        '[000].[000].[000]-[00]',
        '[00].[000].[000]/[0000]-[00]',
      ],
      numbers: ['celular', 'CPF', 'CNPJ'],
      exibirModal: false,
      exibirModal2: false,
      tipoModal: 'erro',
      isModalVisible: false,
      inputLoginErro: false,
      inputPwdErro: false,
      MsgErro: [],
      isFirstAccess: false,
      //Variavel para controla o LOADING da tela
      spinner: false,

      //Controla exibição da biometria
      errorMessage: undefined,
      BiometriaDevice: false,
      switchBiometria: false,

      habilitaSwitchBio: false,
      isFocusFieldLogin: false,
      borderInptSenha: '#B3B3B3',
      userLogged: null,
      companiesChoose: [],
      chooseCompanyShow: false,
      idCompanySelected: null,
      loading: true,
      numberOfCompanies: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  toggleModal = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.state.exibirModal == true
      ? this.setState({exibirModal: false})
      : this.setState({exibirModal: true});
  };

  toggleSwitch = () => {
    if (this.state.switchBiometria == true) {
      this.setState({switchBiometria: false});
    } else {
      this.setState({switchBiometria: true});
      this.checkBiometria();
    }

    // this.state.switchBiometria == true ? this.setState({ switchBiometria: false }) : this.setState({ switchBiometria: true }, this.checkBiometria());
  };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  async updateIndex(selectedIndex) {
    await this.setState({selectedIndex});
    this.setState({text: ''});
    this.setState({textPwd: ''});
  }

  RemoveMascara(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  checkBiometria = async () => {
    await FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        this.setState({BiometriaDevice: true});
      })
      .catch(error => {});

    if (this.state.BiometriaDevice == true) {
      try {
        // Recupera credencias armazenadas
        // const credentials = await Keychain.getGenericPassword();
        // if (credentials) {
        //   //Exibi switch da biometria caso haja credenciais armazenadas
        //   this.setState({habilitaSwitchBio: true});
        //   //Definie posição do swicth de biometria qunado utilizado
        //   this.setState({switchBiometria: true});
        //   //Aber modal da biometria
        //   FingerprintScanner.authenticate({
        //     description: 'Logar com biometria',
        //     cancelButton: 'CANCELAR',
        //     onAttempt: this.handleAuthenticationAttempted,
        //   })
        //     .then(() => {
        //       this.setState({selectedIndex: 0});
        //       this.setState({text: credentials.username});
        //       this.setState({textPwd: credentials.password});
        //       this.login();
        //     })
        //     .catch(() => {
        //       FingerprintScanner.release();
        //       this.handleAuthenticationAttempted;
        //       this.setState({switchBiometria: false});
        //     });
        // } else {
        // }
      } catch (error) {}
    }
  };

  getJSON(json) {
    var arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });
  }

  getEndereco(data) {
    let property = data;
    let endereço = {
      rua: property.street,
      numero: property.number,
      bairro: property.neighborhood,
      cidade: property.city,
      estado: property.state,
      pais: property.country,
      cep: property.zip_code,
      latitude: property.latitude,
      longitude: property.longitude,
    };
    return endereço;
  }

  async componentDidMount() {
    this.setState({selectedIndex: 0});

    const [
      [, tipoAutoLogin],
      [, textAutoLogin],
      [, passwordAutoLogin],
    ] = await AsyncStorage.multiGet([
      'blomia@tipoAutoLogin',
      'blomia@textAutoLogin',
      'blomia@passwordAutoLogin',
    ]);

    if (tipoAutoLogin && textAutoLogin && passwordAutoLogin) {
      const companyIdAutoLogin = await AsyncStorage.getItem(
        'blomia@idCompanyAutoLogin',
      );

      const idCompanySelected = companyIdAutoLogin
        ? Number(companyIdAutoLogin)
        : null;
      await this.setState({
        text: textAutoLogin,
        textPwd: passwordAutoLogin,
        selectedIndex: this.RemoveMascara(tipoAutoLogin),
        idCompanySelected,
      });

      await this.login(true);
    } else {
      this.setState({loading: false});
    }
  }

  //Desmonta componente da biometria
  componentWillUnmount = () => FingerprintScanner.release();

  //Se autenticação falhar exibe erro
  handleAuthenticationAttempted = error => {
    this.setState({errorMessage: error.message});
    this.setState({switchBiometria: false});
  };

  limpaMsgs(newArr) {
    this.setState({
      MsgErro: newArr,
    });
  }

  entryApp = async () => {
    const {userLogged} = this.state;

    this.props.setClient(userLogged);

    let tipo = await this.RemoveMascara(
      JSON.stringify(this.state.selectedIndex),
    );
    let usuario = await this.RemoveMascara(this.state.text);
    let senha = await this.RemoveMascara(this.state.textPwd);

    // //Salva credenciais no device
    await AsyncStorage.setItem('blomia@tipoAutoLogin', tipo);
    await AsyncStorage.setItem('blomia@textAutoLogin', usuario);
    await AsyncStorage.setItem('blomia@passwordAutoLogin', senha);

    try{
      const responseAddressClient = await api.get('/address/without_id');
      this.props.setAddressClientRedux(responseAddressClient);
    } catch (error) {
      this.props.setAddressClientRedux(null);
    }

    if (userLogged.is_validated === false) {
      this.props.navigation.navigate('CheckSmsPg', {
        telUsuario: userLogged.phone_number,
        tipoCad: 'PF',
      });
    }

    if (userLogged.company) {
      const company = userLogged.company;
      await AsyncStorage.setItem(
        'blomia@idCompanyAutoLogin',
        String(company.id),
      );

      if (!company.address) {
        this.props.navigation.navigate('cadastroEnderecoPg', {
          idEmpresa: company.id,
          tipoTela: 'cadastro',
        });
      } else if (userLogged.self_front_side_document_url === null) {
        this.props.navigation.navigate('orientacaoDocPg');
      } else if (company.status === 'Pendente') {
        this.props.navigation.navigate('registroInconsistente');
      } else if (company.status === 'Em Análise') {
        this.props.navigation.navigate('registroCompleto');
      } else if (userLogged.first_access) {
        this.props.navigation.navigate('SwiperScreensEmpresa');
      } else {
        this.props.navigation.navigate(
          this.props.navigation.getParam('redirect')
            ? this.props.navigation.getParam('redirect')
            : 'HomeNavEmpresa',
        );
      }
    } else {
      if (userLogged.first_access) {
        this.props.navigation.navigate('SwiperScreens');
      } else {
        this.props.navigation.navigate('HomeNavCliente');
      }
    }
  };

  handleSelectCompany = async () => {
    if (this.state.idCompanySelected !== null) {
      const companySelected = this.state.companiesChoose.find(
        ({company}) => company.id === this.state.idCompanySelected,
      );
      if (companySelected) {
        await this.setState({
          userLogged: {...this.state.userLogged, ...companySelected},
        });
      }
    }
    this.entryApp();
  };

  getParamsLogin = () => {
    if (this.state.selectedIndex == 0) {
      return {
        phone_number: this.RemoveMascara(this.state.text),
        password: this.state.textPwd,
      };
    }
    if (this.state.selectedIndex == 1) {
      return {
        cpf: this.RemoveMascara(this.state.text),
        password: this.state.textPwd,
      };
    }
    if (this.state.selectedIndex == 2) {
      return {
        cnpj: this.RemoveMascara(this.state.text),
        password: this.state.textPwd,
      };
    }
  };

  login = async (autoLogin = false) => {
    await this.limpaMsgs([]);
    if (this.state.text != '' && this.state.textPwd != '') {
      const params = this.getParamsLogin();
      this.setState({spinner: true});
      await api
        .post('/auth/sign_in', params)
        .then(async response => {
          this.setState({spinner: false});
          const {user, user_companies} = response.data;
          //Grava chave para a proxima autenticação na API
          const userLogged = {
            ...user,
            number_of_companies: user_companies.length,
          };
          await this.setState({
            userLogged,
            companiesChoose: user_companies,
          });

          if (user_companies.length > 0) {
            if (!autoLogin) {
              this.setState({
                spinner: false,
                chooseCompanyShow: true,
              });
            } else {
              this.handleSelectCompany();
            }
          } else {
            this.entryApp();
            this.setState({spinner: false});
          }
        })
        .catch(error => {
          this.setState({spinner: false, loading: false});
          if (
            error.response.data.errors ==
            'Invalid login credentials. Please try again.'
          ) {
            this.setState({MsgErro: ['Usuário ou senha inválido!']});
          }
          this.openModal();
        });
    } else if (this.state.text == '' && this.state.textPwd != '') {
      this.setState({inputLoginErro: true});
      if (this.state.selectedIndex === 0) {
        let msg = this.state.MsgErro.concat('Favor informar o celular');
        this.setState({MsgErro: msg});
      } else if (this.state.selectedIndex === 1) {
        let msg = this.state.MsgErro.concat('Favor informar o CPF');
        this.setState({MsgErro: msg});
      } else if (this.state.selectedIndex === 2) {
        let msg = this.state.MsgErro.concat('Favor informar o CNPJ');
        this.setState({MsgErro: msg});
      }
      this.openModal();
    } else if (this.state.textPwd == '' && this.state.text != '') {
      this.setState({inputPwdErro: true});
      let msg = this.state.MsgErro.concat('Favor informar Senha');
      this.setState({MsgErro: msg});
      this.openModal();
    } else if (this.state.text == '' && this.state.textPwd == '') {
      this.setState({inputLoginErro: true, inputPwdErro: true});
      let msg = this.state.MsgErro.concat([
        'Favor informar ' + this.state.numbers[this.state.selectedIndex],
        'Favor informar senha',
      ]);
      this.setState({MsgErro: msg});
      this.openModal();
    }
  };

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  render() {
    const buttons = ['CEL', 'CPF', 'CNPJ'];
    const {selectedIndex} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <>
        <Modal isVisible={this.state.chooseCompanyShow}>
          <View style={styles.containerChooseCompany}>
            <View style={styles.listagemChooseCompany}>
              <Text style={styles.textTitleChooseCompany}>
                Em qual perfil deseja entrar?
              </Text>
              <ScrollView style={styles.scrollViewModalAccounts}>
                <View style={styles.containerItemsModalAccounts}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => this.setState({idCompanySelected: null})}>
                    <RadioButton
                      value={null}
                      color={'#477E22'}
                      uncheckedColor={'#477E22'}
                      status={
                        this.state.idCompanySelected === null
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => this.setState({idCompanySelected: null})}
                    />
                    <View>
                      <Text style={styles.textModalSelectName}>Pessoal</Text>
                    </View>
                  </TouchableOpacity>
                  {this.state.companiesChoose.length > 0 &&
                    this.state.companiesChoose.map(({company}) => (
                      <TouchableOpacity
                        key={company.id}
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() =>
                          this.setState({idCompanySelected: company.id})
                        }>
                        <RadioButton
                          value={company.id}
                          color={'#477E22'}
                          uncheckedColor={'#477E22'}
                          status={
                            this.state.idCompanySelected === company.id
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() =>
                            this.setState({idCompanySelected: company.id})
                          }
                        />
                        <View style={{paddingTop: 10}}>
                          <Text style={styles.textModalSelectName}>
                            {limitadorString(company.company_name, 20)}
                          </Text>
                          <Text style={styles.textModalSelect}>
                            {company.address &&
                              limitadorString(company.address.street, 25)}
                            , {company.address && company.address.number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.containerFooterChooseCompany}>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() =>
                  this.setState({
                    chooseCompanyShow: false,
                  })
                }>
                <Text style={styles.textButtonFooterChooseCompanyCancel}>
                  FECHAR
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => {
                  this.setState({chooseCompanyShow: false});
                  this.handleSelectCompany();
                }}>
                <Text style={styles.textButtonFooterChooseCompanyEntry}>
                  ENTRAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ModalDefault
          openModal={this.state.exibirModal}
          closeModal={this.closeModal}
          MsgErro={this.state.MsgErro}
          tipoModal={'erro'}
        />
        {!this.state.loading ? (
          <ScrollView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.conteudoPagina}>
              <View style={[styles.container]}>
                <View style={styles.containerHeader}>
                  <View style={styles.containerBtBack}>
                    <TouchableOpacity onPress={() => navigate('preAcesso')}>
                      <Icon name="arrow-left" size={30} color="#007f0b" />
                    </TouchableOpacity>
                  </View>
                  <Image
                    fadeDuration={0}
                    style={styles.imgLogo}
                    resizeMode="contain"
                    resizeMethod="resize"
                    source={require('../../assets/images/logo-2.png')}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Spinner
                    visible={this.state.spinner}
                    color="white"
                    textStyle={styles.spinnerTextStyle}
                  />
                  <Text style={styles.selectionTextStyle}>
                    Selecione como deseja entrar
                  </Text>

                  <ButtonGroup
                    placeholder={this.state.placeholdermask[selectedIndex]}
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={styles.btnsGroup}
                    selectedButtonStyle={styles.btnSelected}
                    textStyle={styles.buttonsTextStyle}
                    style={styles.container}
                  />

                  <Text style={styles.userTextStyle}>Usuário</Text>

                  <View style={styles.userContainer}>
                    <TextInputMask
                      onChangeText={text =>
                        this.setState({text: text}, this.setState({x: '✕'}))
                      }
                      value={this.state.text}
                      keyboardType={'numeric'}
                      placeholder={this.state.placeholdermask[selectedIndex]}
                      mask={this.state.mask[selectedIndex]}
                      style={
                        this.state.inputLoginErro == false
                          ? [
                              styles.inputUserStyle,
                              this.state.isFocusFieldLogin
                                ? {borderColor: '#477E22'}
                                : {borderColor: '#B3B3B3'},
                            ]
                          : [styles.inputUserStyle, {borderColor: 'red'}]
                      }
                      onFocus={() =>
                        this.setState({
                          inputLoginErro: false,
                          isFocusFieldLogin: true,
                        })
                      }
                      onBlur={() => {
                        this.setState({isFocusFieldLogin: false});
                      }}
                    />
                  </View>
                  <Text style={styles.passwordTextStyle}>Senha</Text>
                  <View style={{alignSelf: 'center'}}>
                    <View
                      style={
                        this.state.inputPwdErro == false
                          ? [
                              styles.secureBox,
                              {borderColor: this.state.borderInptSenha},
                            ]
                          : [styles.secureBox, {borderColor: 'red'}]
                      }>
                      <SmoothPinCodeInput
                        placeholder={
                          <View style={styles.placeholderPinStyle} />
                        }
                        mask={<View style={styles.pinMaskStyle} />}
                        maskDelay={1000}
                        password={true}
                        cellStyle={null}
                        cellStyleFocused={'#B3B3B3'}
                        cellSize={responsiveFont(4)}
                        codeLength={6}
                        value={this.state.textPwd}
                        onFocus={() =>
                          this.setState({
                            inputPwdErro: false,
                            borderInptSenha: 'green',
                          })
                        }
                        onBlur={() =>
                          this.setState({borderInptSenha: '#B3B3B3'})
                        }
                        onTextChange={text2 => this.setState({textPwd: text2})}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => navigate('RecuperaNav', {teste: 'asda'})}
                    style={styles.alterPasswordButtonStyle}>
                    <Text style={styles.alterPasswordStyle}>Alterar senha</Text>
                  </TouchableOpacity>

                  {this.state.habilitaSwitchBio == true && (
                    <View style={{flexDirection: 'row'}}>
                      <Switch
                        trackColor={{false: '#989898', true: '#ABCE94'}}
                        thumbColor={
                          this.state.switchBiometria == true
                            ? '#477E22'
                            : '#707070'
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchBiometria}
                      />
                      <Text style={{textAlign: 'center', alignSelf: 'center'}}>
                        Entrar com biometria
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.containerLoginButton}>
                  <Ripple
                    rippleCentered={true}
                    onPress={() => this.login()}
                    style={styles.loginButtonStyle}>
                    <Text style={styles.loginButtonTextStyle}>ENTRAR</Text>
                  </Ripple>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#477E22" />
          </View>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: client => dispatch(setClient(client)),
    setAddressClientRedux: addressClient => dispatch(setAddressClient(addressClient)),
  };
};

// export default HomeScreen;
export default connect(
  null,
  mapDispatchToProps,
)(Login);
