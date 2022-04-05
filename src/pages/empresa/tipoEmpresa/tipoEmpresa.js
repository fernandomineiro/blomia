import React, {Component} from 'react';
import {Image, View, Text, TextInput, ScrollView, SafeAreaView} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import styles from './styles';
import api from '../../../config/api';
import Ripple from 'react-native-material-ripple';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

class TipoEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mask: '[00].[000].[000]/[0000]-[00]',
      textCNPJ: '',
      nomeEmpresa: null,
      clickVerify: '#4d4d4d',
      clickVerifyName: '#4d4d4d',
      exibirModal: false,
      MsgErro: [],
      showTextEmpresa: false,
      showTextCnpj: false,
      msgNome: '',
      msgCnpj: '',
      InputCnpjErro: false,
      tipoModal: 'erro',
      isFocusFieldNameCompany: false,
    };
  }

  toggleModal = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.state.exibirModal == true
      ? this.setState({exibirModal: false})
      : this.setState({exibirModal: true});
  };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  limpaMsgs(newArr) {
    this.setState({
      MsgErro: newArr,
    });
  }

  limpaNomeEmpresa() {
    this.setState({showTextEmpresa: false});
    this.setState({nomeEmpresa: null});
  }

  limpaCnpjEmpresa() {
    this.setState({showTextCnpj: false});
    this.setState({textCNPJ: ''});
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onBackPress: this._handleBackPress,
    });
  }

  async registra(tipo) {
    await this.limpaMsgs([]);

    this.setState({showTextEmpresa: false, showTextCnpj: false});
    let submit = true;
    let msg = '';

    if (this.state.nomeEmpresa == null) {
      submit = false;
      this.setState({showTextEmpresa: true});
      this.setState({msgNome: '*Campo obrigatório.'});

      msg = this.state.MsgErro.concat('O nome da empresa é obrigatório');
      this.setState({MsgErro: msg});
    } else if (this.state.nomeEmpresa.length < 4) {
      submit = false;
      this.setState({showTextEmpresa: true});
      msg = this.state.MsgErro.concat('Nome da empresa muito curto');
      this.setState({MsgErro: msg});
    }

    if (this.state.textCNPJ == '' && tipo == 'formal') {
      submit = false;
      this.setState({showTextCnpj: true});
      // this.setState({ msgCnpj: 'Clique aqui para adicionar.' })
      msg = this.state.MsgErro.concat('Informe o CNPJ da empresa');
      this.setState({MsgErro: msg});
    } else if (this.state.textCNPJ.length < 18 && tipo == 'formal') {
      submit = false;
      this.setState({showTextCnpj: true});
      msg = this.state.MsgErro.concat('O CNPJ está incompleto.');
      this.setState({MsgErro: msg});
      // this.setState({ msgCnpj: 'CNPJ Incompleto.' })
    }

    if (this.state.MsgErro.length > 0) {
      this.openModal();
    }

    if (submit == true) {
      let params = '';
      let rota = '';

      if (tipo == 'formal') {
        rota = '/companies';

        params = {
          company: {
            company_name: this.state.nomeEmpresa,
            cnpj: this.state.textCNPJ,
          },
        };
      } else if (tipo == 'informal') {
        rota = '/companies';
        params = {
          company: {
            company_name: this.state.nomeEmpresa,
          },
        };
      }

      api
        .post(rota, params)
        .then(async response => {
          if (response.data.errors) {
            if (response.data.errors == 'User has already a company') {
              this.limpaMsgs([]);
              this.setState({tipoModal: 'erro'});
              this.setState({MsgErro: ['Empresa já registrada.']});
              this.openModal();
            } else {
              this.limpaMsgs([]);
              this.setState({tipoModal: 'erro'});
              this.setState({
                MsgErro: ['Houve algum erro, por favor tente novamente.'],
              });
              this.openModal();
            }
          } else {
            //Variavel salva no async storage para diferenciar o fluxo das telas seguintes | Recuperada na tela docUsuario
            await AsyncStorage.setItem('tipoEmpresa', tipo);
            await AsyncStorage.setItem(
              'blomia@idCompanyAutoLogin',
              String(response.data.id),
            );

            // if (tipo == 'formal') {

            //     this.props.navigation.navigate('orientacaoDocPg');
            // }
            // else if (tipo == 'informal') {
            this.props.navigation.navigate('cadastroEnderecoPg', {
              idEmpresa: response.data.id,
              tipoTela: 'cadastro',
            });
            // }
          }
        })
        .catch(async error => {
          //Grava chave para a proxima autenticação na API

          if (error.response.status == 422) {
            //Dados inválidos ou já registrados
            this.setState({tipoModal: 'erro'});

            //Busca erro da campo CPF
            if (error.response.data.errors) {
              let msgErro = error.response.data.errors[0];

              if (msgErro == 'Cnpj has already been taken') {
                var msg = this.state.MsgErro.concat('CNPJ já registrado!');
                this.setState({MsgErro: msg});
              } else if (msgErro == 'Cnpj is not a valid CNPJ') {
                var msg = this.state.MsgErro.concat('CNPJ Inválido.');
                this.setState({MsgErro: msg});
              }
              this.setState({InputCnpjErro: true});
              this.toggleModal();
            }
          }

          if (error.response.status == 401) {
            this.limpaMsgs([]);
            this.setState({tipoModal: 'alerta'});
            this.setState({
              MsgErro: ['Sua seção expirou, por favor logue novamente.'],
            });
            this.openModal();
          }
        });
    } //fim função regitra
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <CustomHeader title="Setting" isHome={false} navigation={this.props.navigation} />
            <View style={styles.boxInptEmpresa}>
              <Text style={styles.textTitle}>Cadastro da empresa</Text>
              <View>
                <Text style={styles.textTitleInput}>
                  Nome da empresa no Blomia
                </Text>
                <TextInput
                  value={this.state.nomeEmpresa}
                  onChangeText={text => this.setState({nomeEmpresa: text})}
                  placeholderTextColor="#B3B3B3"
                  onBlur={() => {
                    this.setState({isFocusFieldNameCompany: false});
                  }}
                  onFocus={() => {
                    this.setState({isFocusFieldNameCompany: true});
                    this.state.showTextEmpresa == true
                      ? this.limpaNomeEmpresa()
                      : null;
                  }}
                  style={
                    this.state.showTextEmpresa == false
                      ? [
                          styles.inputTextEmpresa,
                          this.state.isFocusFieldNameCompany
                            ? {borderColor: '#477E22'}
                            : {borderColor: '#B3B3B3'},
                        ]
                      : [styles.inputTextEmpresa, {borderColor: 'red'}]
                  }
                  placeholder={'Padaria Pão Brasil'}
                />

                {this.state.showTextEmpresa != true && (
                  <Text style={[styles.inputWarning, {color: '#4D4D4D'}]}>
                    Campo obrigatório.
                  </Text>
                )}
                {this.state.showTextEmpresa == true && (
                  <Text style={styles.inputWarning}>{this.state.msgNome}</Text>
                )}
              </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  styles.textTitleInput,
                  {marginLeft: 0, textAlign: 'center'},
                ]}>
                Sua empresa possui CNPJ?
              </Text>
            </View>

            <View style={styles.boxInptCnpj}>
              <Text style={styles.labelCNPJ}>Clique aqui para adicionar</Text>
              {this.state.showTextCnpj == true && (
                <Text style={styles.inputGuidance}>{this.state.msgCnpj}</Text>
              )}
              <TextInputMask
                onChangeText={text => this.setState({textCNPJ: text})}
                mask={this.state.mask}
                keyboardType="numeric"
                // style={[styles.corporationInput, { borderBottomColor: 'red', borderBottomWidth: 1 }]}
                placeholder={'10.000.000/0001-10'}
                placeholderTextColor="#B3B3B3"
                onFocus={
                  this.state.showTextCnpj == true
                    ? () => this.limpaCnpjEmpresa()
                    : null
                }
                style={
                  this.state.showTextCnpj == false
                    ? styles.corporationInput
                    : [
                        styles.corporationInput,
                        {borderBottomColor: 'red', borderBottomWidth: 1},
                      ]
                }
              />
            </View>

            <View style={styles.boxButtons}>
              <Ripple
                rippleCentered={true}
                style={styles.btnEmpresaFormal}
                onPress={() => this.registra('formal')}>
                <Text style={styles.textBtn}>EMPRESA COM CNPJ</Text>
              </Ripple>

              <Ripple
                rippleCentered={true}
                style={styles.btnEmpresaInformal}
                onPress={() => this.registra('informal')}>
                <Text style={styles.textBtnInformal}>EMPRESA SEM CNPJ</Text>
              </Ripple>
            </View>
          </View>
          <ModalDefault
            openModal={this.state.exibirModal}
            closeModal={this.closeModal}
            MsgErro={this.state.MsgErro}
            tipoModal={this.state.tipoModal}
            loginPgLoad={this.loginPgLoad}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(TipoEmpresa);
