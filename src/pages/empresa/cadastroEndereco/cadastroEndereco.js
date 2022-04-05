import React, {Component, Fragment} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import TextInputMask from 'react-native-text-input-mask';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
// import RadioForm from 'react-native-simple-radio-button';
import {RadioButton} from 'react-native-paper';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import api from '../../../config/api';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAvoid: true,
      shouldExecute: false,
      zipValue: false,
      value: '',
      cidades: [],
      estados: [],
      isVisibleModalEstado: false,
      isVisibleModalCidade: false,
      mask: '[00].[000]-[000]',
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      complemento: '',
      numero: '',

      bgColorLogradouro: '',
      bgColorBairro: '',
      bgColorCidade: 'white',
      bgColorEstado: 'white',

      bdColorCep: '#B3B3B3',
      bdColorLogradouro: '#B3B3B3',
      bdColorNumero: '#B3B3B3',
      bdColorBairro: '#B3B3B3',
      bdColorEstado: '#B3B3B3',
      bdColorCidade: '#B3B3B3',

      txtColorAuto: '#707070',

      editarInptLogradouro: true,
      editarInptBairro: true,
      editarInptCidade: true,
      editarInptEstado: true,

      idEmpresa: this.props.navigation.state.params.idEmpresa,
      // idEmpresa: 1,
      //Variavel para controla o LOADING da tela
      spinner: false,

      exibirModal: false,
      MsgErro: [],

      isFocusFieldCep: false,
      isFocusFieldLogradouro: false,
      isFocusFieldNumero: false,
      isFocusFieldComplemento: false,
      isFocusFieldBairro: false,
      isFocusFieldCidade: false,

      loadingCidade: false,
    };
  }

  async componentDidMount() {
    const {params} = this.props.navigation.state;
    this.setState({valor: ''});
    this.setState({tipoTela: params.tipoTela});
    await this.buscaEstados();
  }
  RemoveMascara(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  async resetInputs() {
    this.setState({bgColorLogradouro: '#FFFFFF'});
    this.setState({bgColorBairro: '#FFFFFF'});
    this.setState({bgColorCidade: '#FFFFFF'});
    this.setState({bgColorEstado: '#FFFFFF'});
    this.setState({editarInptLogradouro: true});
    this.setState({editarInptBairro: true});
    this.setState({editarInptCidade: true});
    this.setState({editarInptEstado: true});

    this.setState({
      logradouro: '',
      numero: '',
      bairro: '',
      estado: '',
      cidade: '',
    });
  }

  handleZipCode = text => {
    this.setState({value: text});
    if (this.state.value.length == 7) {
      this.setState({zipValue: true});
      /* Valor sem formatação
        const unmasked = this.zipCodeField.getRawValue()
        */
    }
  };

  async buscaCidades() {
    if (this.state.shouldExecute) {
      this.setState({cidades: '', loadingCidade: true});
      await api
        .get('/states_cities?initial=' + this.state.estado)
        .then(async response => {
          this.setState({
            cidades: response.data.map(function(cidade) {
              return {label: cidade, value: cidade};
            }),
            loadingCidade: false,
          });
        })
        .catch(async error => {
          this.setState({
            loadingCidade: false,
          });
        });
    }
  }

  async buscaEstados() {
    await api
      .get('/states')
      .then(async response => {
        this.setState({
          estados: response.data.map(function(estado) {
            return {label: estado, value: estado};
          }),
        });
        this.setState({shouldExecute: true});
      })
      .catch(async error => {});
  }

  handleCityValue = text => {
    this.setState({cidade: text});
  };

  buscaCep = () => {
    let CEP = this.RemoveMascara(this.state.cep);

    this.resetInputs();

    if (CEP.length == 8) {
      this.setState({spinner: true});
      api
        .get('/address_find_by_zip_code?zip_code=' + CEP)
        .then(async response => {
          if (!response.data.state) {
            this.resetInputs();

            this.setState({logradouro: ''});
            this.setState({bairro: ''});
            this.setState({cidade: ''});
            this.setState({estado: ''});
            this.setState({complemento: ''});
            this.setState({spinner: false});

            this.setState({exibirModal: true});
            this.setState({MsgErro: ['CEP Inváilido']});
          } else {
            this.setState({logradouro: response.data.address});
            this.setState({bairro: response.data.neighborhood});
            this.setState({cidade: response.data.city});
            this.setState({estado: response.data.state});
            // this.setState({complemento: response.data.complement});
            this.setState({isEditable: false});

            if (this.state.logradouro != '') {
              this.setState({bgColorLogradouro: '#FAF7F7'});
              this.setState({editarInptLogradouro: false});
            }
            if (this.state.bairro != '') {
              this.setState({bgColorBairro: '#FAF7F7'});
              this.setState({editarInptBairro: false});
            }
            if (this.state.cidade != '') {
              this.setState({bgColorCidade: '#FAF7F7'});
              this.setState({editarInptCidade: false});
            }
            if (this.state.estado != '') {
              this.setState({bgColorEstado: '#FAF7F7'});
              this.setState({editarInptEstado: false});
            }
          }

          // FECHA LOAD DA PAGINA
          this.setState({spinner: false});
        })
        .catch(async error => {
          this.resetInputs();
          this.setState({spinner: false});

          if (error.response.status == 401) {
            this.props.navigation.navigate('LoginPg');
          }
        });
    }
  }; //FIM BUSCA CEP

  limpaMsgs(newArr) {
    this.setState({
      MsgErro: newArr,
    });
  }

  registra = async () => {
    const idEmpresa = this.props.navigation.getParam('idEmpresa');

    if (
      this.state.logradouro !== '' &&
      this.state.numero !== '' &&
      this.state.bairro !== '' &&
      this.state.estado !== '' &&
      this.state.cidade !== ''
    ) {
      let rota = `addresses/company_address_create?company_id=${idEmpresa}`;

      let params = {
        address: {
          zip_code: this.state.cep,
          street: this.state.logradouro,
          number: this.state.numero,
          complement: this.state.complemento,
          neighborhood: this.state.bairro,
          city: this.state.cidade,
          state: this.state.estado,
          latitude: '',
          longitude: '',
        },
      };

      await api
        .post(rota, params)
        .then(async response => {
          this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
        })
        .catch(async error => {
          this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
        });
    } else {
      await this.limpaMsgs([]);

      if (this.state.logradouro == '') {
        this.setState({bdColorLogradouro: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o logradouro.');
        this.setState({MsgErro: msg});
      }

      if (this.state.numero == '') {
        this.setState({bdColorNumero: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o número');
        this.setState({MsgErro: msg});
      }

      if (this.state.bairro == '') {
        this.setState({bdColorBairro: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o bairro');
        this.setState({MsgErro: msg});
      }

      if (this.state.estado == '') {
        this.setState({bdColorEstado: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o estado.');
        this.setState({MsgErro: msg});
      }

      if (this.state.cidade == '') {
        this.setState({bdColorCidade: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar a cidade');
        this.setState({MsgErro: msg});
      }

      //  this.setState({ MsgErro: ["Os campos com '*' são obrigatórios."] })
      this.setState({exibirModal: true});
    }
  };

  atualizaEndereço = async () => {
    if (
      this.state.cep != '' &&
      this.state.logradouro != '' &&
      this.state.numero != '' &&
      this.state.bairro != '' &&
      this.state.estado != '' &&
      this.state.cidade != ''
    ) {
      let rota = ('/addresses/', this.state.idUsuario);
      let params = {
        address: {
          zip_code: this.state.cep,
          street: this.state.logradouro,
          number: this.state.numero,
          complement: this.state.complemento,
          neighborhood: this.state.bairro,
          city: this.state.cidade,
          state: this.state.estado,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      };

      // await api
      //   .patch(rota, params)
      //   .then(response => {
      //
      //   })
      //   .catch(error => {
      //
      //     //Grava chave para a proxima autenticação na API

      //     this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
      //   });
    } else {
      if (this.state.cep == '') {
        this.setState({bdColorCep: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o CEP');
        this.setState({MsgErro: msg});
      }

      if (this.state.logradouro == '') {
        this.setState({bdColorLogradouro: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o logradouro.');
        this.setState({MsgErro: msg});
      }

      if (this.state.numero == '') {
        this.setState({bdColorNumero: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o número');
        this.setState({MsgErro: msg});
      }

      if (this.state.bairro == '') {
        this.setState({bdColorBairro: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o bairro');
        this.setState({MsgErro: msg});
      }

      if (this.state.estado == '') {
        this.setState({bdColorEstado: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar o estado.');
        this.setState({MsgErro: msg});
      }

      if (this.state.cidade == '') {
        this.setState({bdColorCidade: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar a cidade');
        this.setState({MsgErro: msg});
      }
      this.setState({exibirModal: true});
    }
  };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView
        style={{width: wp(100), height: hp(100), backgroundColor: '#fff'}}>
        <Spinner
          visible={this.state.spinner}
          color="white"
          textStyle={styles.spinnerTextStyle}
        />
        <ModalDefault
          tipoModal={'erro'}
          openModal={this.state.exibirModal}
          closeModal={this.closeModal}
          MsgErro={this.state.MsgErro}
        />

        <Modal isVisible={this.state.isVisibleModalEstado}>
          <View style={styles.containerModalEstado}>
            <View style={styles.listagemModalEstado}>
              <Text style={styles.textTitleModaldEstado}>
                Selecione um estado:{' '}
              </Text>
              <ScrollView
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderColor: '#E6E6E6',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}>
                {/* <RadioForm
                  radio_props={this.state.estados}
                  initial={-1}
                  buttonColor={'#477E22'}
                  selectedButtonColor={'#477E22'}
                  wrapStyle={{paddingBottom: 20}}
                  onPress={value => {
                    this.setState({estado: value});
                  }}
                /> */}
                {this.state.estados.length > 0 &&
                  this.state.estados.map(estado => (
                    <View
                      key={estado.label}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value={estado.label}
                        color={'#477E22'}
                        status={
                          this.state.estado === estado.label
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => this.setState({estado: estado.label})}
                      />
                      <Text style={styles.textModalSelect}>{estado.label}</Text>
                    </View>
                  ))}
              </ScrollView>
            </View>
            <View style={styles.containerFooterModalEstado}>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() =>
                  this.setState({
                    estado: '',
                    isVisibleModalEstado: false,
                  })
                }>
                <Text style={styles.textButtonFooterModalEstado}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => {
                  this.setState({isVisibleModalEstado: false});
                  this.buscaCidades();
                }}>
                <Text style={styles.textButtonFooterModalEstado}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.isVisibleModalCidade}>
          <View style={styles.containerModalEstado}>
            <View style={styles.listagemModalEstado}>
              <Text style={styles.textTitleModaldEstado}>
                Selecione uma cidade:{' '}
              </Text>
              <ScrollView
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderColor: '#E6E6E6',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}>
                {/* <RadioForm
                  radio_props={this.state.cidades}
                  initial={-1}
                  buttonColor={'#477E22'}
                  selectedButtonColor={'#477E22'}
                  wrapStyle={{paddingBottom: 20}}
                  onPress={value => {
                    this.setState({cidade: value});
                  }}
                /> */}

                {this.state.cidades.length > 0 &&
                  this.state.cidades.map(cidade => (
                    <View
                      key={cidade.label}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value={cidade.label}
                        color={'#477E22'}
                        status={
                          this.state.cidade === cidade.label
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => this.setState({cidade: cidade.label})}
                      />
                      <Text style={styles.textModalSelect}>{cidade.label}</Text>
                    </View>
                  ))}
              </ScrollView>
            </View>
            <View style={styles.containerFooterModalEstado}>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() =>
                  this.setState({
                    cidade: '',
                    isVisibleModalCidade: false,
                  })
                }>
                <Text style={styles.textButtonFooterModalEstado}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => this.setState({isVisibleModalCidade: false})}>
                <Text style={styles.textButtonFooterModalEstado}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.container}>
          <View style={styles.boxLogo}>
            <Image
              fadeDuration={0}
              style={styles.imgLogo}
              source={require('../../../assets/images/blomialogo.png')}
            />
          </View>

          <View style={styles.boxRow}>
            <View style={styles.boxTitle}>
              <Text
                style={{
                  fontSize: responsiveFont(2),
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Endereço da empresa
              </Text>
            </View>

            <View style={styles.boxInputs}>
              <View style={{flex: 0.5}}>
                <Text style={styles.description1}>CEP</Text>
                <TextInputMask
                  value={this.state.cep}
                  onChangeText={text =>
                    this.setState({cep: text}, () => this.buscaCep())
                  }
                  mask={this.state.mask}
                  maxLength={10}
                  keyboardType="numeric"
                  style={[
                    styles.InputText,
                    this.state.isFocusFieldCep
                      ? {borderColor: '#477E22'}
                      : {borderColor: this.state.bdColorCep},
                    {paddingHorizontal: 10, textAlign: 'center'},
                  ]}
                  onFocus={() => {
                    this.setState({
                      bdColorCep: '#B3B3B3',
                      shouldAvoid: false,
                      isFocusFieldCep: true,
                    });
                  }}
                  onBlur={() =>
                    this.setState({shouldAvoid: true, isFocusFieldCep: false})
                  }
                  placeholderTextColor="#B3B3B3"
                  placeholder="10.000-100"
                />
              </View>
              <View style={{flex: 1, paddingLeft: 25}}>
                <Text style={styles.description2}>* Logradouro</Text>
                <TextInput
                  value={this.state.logradouro}
                  onChangeText={text => this.setState({logradouro: text})}
                  onFocus={() =>
                    this.setState({
                      bdColorLogradouro: '#B3B3B3',
                      isFocusFieldLogradouro: true,
                    })
                  }
                  editable={this.state.editarInptLogradouro}
                  style={
                    this.state.logradouro == ''
                      ? [
                          styles.InputText,
                          this.state.isFocusFieldLogradouro
                            ? {borderColor: '#477E22'}
                            : {borderColor: this.state.bdColorLogradouro},
                        ]
                      : [
                          styles.InputText,
                          {
                            backgroundColor: this.state.bgColorLogradouro,
                            color: this.state.txtColorAuto,
                          },
                          this.state.isFocusFieldLogradouro
                            ? {borderColor: '#477E22'}
                            : {borderColor: this.state.bdColorLogradouro},
                        ]
                  }
                  placeholderTextColor="#B3B3B3"
                  placeholder="Rua, Avenida, etc"
                  onBlur={() => {
                    this.setState({isFocusFieldLogradouro: false});
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.boxRow}>
            <View style={styles.boxInputs}>
              <View style={{flex: 0.5}}>
                <Text style={styles.description1}>* Número</Text>
                <TextInput
                  maxLength={5}
                  value={this.state.numero}
                  onChangeText={text => this.setState({numero: text})}
                  keyboardType="numeric"
                  style={[
                    styles.InputText,
                    this.state.isFocusFieldNumero
                      ? {borderColor: '#477E22'}
                      : {borderColor: this.state.bdColorNumero},
                  ]}
                  onFocus={() =>
                    this.setState({
                      bdColorNumero: '#B3B3B3',
                      isFocusFieldNumero: true,
                    })
                  }
                  placeholderTextColor="#B3B3B3"
                  placeholder="140"
                  onBlur={() => {
                    this.setState({isFocusFieldNumero: false});
                  }}
                />
              </View>
              <View style={{flex: 1, paddingLeft: 25}}>
                <Text style={styles.description2}>Complemento</Text>
                <TextInput
                  maxLength={10}
                  value={this.state.complemento}
                  onChangeText={text => this.setState({complemento: text})}
                  style={[
                    styles.InputText,
                    this.state.isFocusFieldComplemento && {
                      borderColor: '#477E22',
                    },
                  ]}
                  placeholderTextColor="#B3B3B3"
                  placeholder="Bloco, apto, etc"
                  onBlur={() => {
                    this.setState({isFocusFieldComplemento: false});
                  }}
                  onFocus={() =>
                    this.setState({
                      isFocusFieldComplemento: true,
                    })
                  }
                />
              </View>
            </View>
          </View>

          <View style={[styles.boxRow]}>
            <View style={styles.boxInputs}>
              <View style={{flex: 1}}>
                <Text style={[styles.description1, {}]}>* Bairro</Text>
                <TextInput
                  value={this.state.bairro}
                  onChangeText={text => this.setState({bairro: text})}
                  placeholderTextColor="#B3B3B3"
                  placeholder="Jardim das Flores"
                  maxLength={255}
                  editable={this.state.editarInptBairro}
                  style={
                    this.state.bairro === ''
                      ? [
                          styles.InputText,
                          this.state.isFocusFieldBairro
                            ? {borderColor: '#477E22'}
                            : {borderColor: this.state.bdColorBairro},
                        ]
                      : [
                          styles.InputText,
                          {
                            backgroundColor: this.state.bgColorBairro,
                            color: this.state.txtColorAuto,
                          },
                        ]
                  }
                  onFocus={() =>
                    this.setState({
                      bdColorBairro: '#B3B3B3',
                      isFocusFieldBairro: true,
                    })
                  }
                  onBlur={() => {
                    this.setState({isFocusFieldBairro: false});
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.boxRow}>
            <View style={styles.boxInputs}>
              <View style={{flex: 0.5}}>
                <Text style={[styles.description1, {marginBottom: 0}]}>
                  * Estado
                </Text>
                <TouchableOpacity
                  disabled={!this.state.editarInptEstado}
                  style={{width: '100%'}}
                  onPress={() => this.setState({isVisibleModalEstado: true})}>
                  <View
                    style={[
                      styles.buttonChooseOption,
                      {
                        borderColor: this.state.bdColorEstado,
                        backgroundColor: this.state.bgColorEstado,
                      },
                    ]}>
                    <Text
                      style={
                        this.state.estado
                          ? {color: '#333333'}
                          : {color: '#B3B3B3'}
                      }>
                      {this.state.estado ? this.state.estado : 'MG'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, paddingLeft: 25}}>
                <Text style={[styles.description2, {marginBottom: 0}]}>
                  * Cidade
                </Text>
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    disabled={!this.state.editarInptCidade}
                    onPress={() => {
                      if (this.state.cidades.length > 0) {
                        this.setState({isVisibleModalCidade: true});
                      }
                    }}
                    style={{width: '100%'}}>
                    <View
                      style={[
                        styles.buttonChooseOption,
                        {
                          borderColor: this.state.bdColorCidade,
                          backgroundColor: this.state.bgColorCidade,
                        },
                      ]}>
                      <Text
                        style={
                          this.state.cidade
                            ? {color: '#333333'}
                            : {color: '#B3B3B3'}
                        }>
                        {this.state.cidade
                          ? this.state.cidade
                          : this.state.loadingCidade
                          ? 'Carregando...'
                          : this.state.estado
                          ? 'Selecione uma cidade'
                          : 'Selecione um estado'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.boxTitle]}>
            <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
              * Campos Obrigatórios
            </Text>
          </View>

          <View style={styles.boxBtn}>
            <Ripple
              rippleCentered={true}
              onPress={() => this.registra()}
              style={styles.saveButtonStyle}>
              <Text
                style={[
                  {
                    fontFamily: 'Montserrat-Bold',
                    color: 'white',
                    fontSize: responsiveFont(2),
                  },
                ]}>
                CONTINUAR
              </Text>
            </Ripple>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(AddressForm);
