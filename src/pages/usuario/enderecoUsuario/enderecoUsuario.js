import React, {Fragment} from 'react';
import {Image, View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import SearchableDropdown from 'react-native-searchable-dropdown';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';
import Ripple from 'react-native-material-ripple';

import styles from './styles';
import api from '../../../config/api';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {connect} from 'react-redux';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUsuario: this.props.client.id,
      shouldAvoid: true,
      shouldExecute: false,
      selectedCidade: this.props.address_company.city,
      selectedEstado: [],
      selectedItems: [],
      zipValue: false,
      value: '',
      municipios: 'teste',
      estados: 'teste',
      mask: '[00].[000]-[000]',
      cep: '',
      logradouro: this.props.address_company.street,
      bairro: this.props.address_company.neighborhood,
      cidade: this.props.address_company.city,
      estado: this.props.address_company.state,
      complemento: '',
      numero: this.props.address_company.number,
      latitude: this.props.address_company.latitude,
      longitude: this.props.address_company.longitude,
      bgColorLogradouro: '',
      bgColorBairro: '',
      bgColorCidade: '',
      bgColorEstado: '',

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

      idEmpresa: 1,
      // idEmpresa: 1,
      //Variavel para controla o LOADING da tela
      spinner: false,

      exibirModal: false,
      MsgErro: [],
      isEditable: true,
    };
  }

  async componentDidMount() {
    this.setState({valor: ''});
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
  }

  handleZipCode = text => {
    this.setState({value: text});
    if (this.state.value.length == 7) {
      this.setState({zipValue: true});
    }
  };

  async buscaMunicipios() {
    if (this.state.shouldExecute) {
      this.setState({municipios: ''});
      await api
        .get('/states_cities?initial=' + this.state.estado)
        .then(async response => {
          this.setState({
            municipios: response.data.map(function(municipio) {
              return {name: municipio};
            }),
          });
        })
        .catch(async error => {});
    }
  }

  async buscaEstados() {
    await api
      .get('/states')
      .then(async response => {
        this.setState({
          estados: response.data.map(function(estado) {
            return {name: estado};
          }),
        });
      })
      .catch(async error => {});
  }

  handleCityValue = text => {
    this.setState({cidade: text});
  };
  buscaCep = () => {
    const cep = this.RemoveMascara(this.state.cep);

    this.resetInputs();

    if (cep.length === 8) {
      this.setState({spinner: true});
      api
        .get(`/address_find_by_zip_code?zip_code=${cep}`)
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
            this.setState({selectedCidade: response.data.city});
            this.setState({estado: response.data.state});
            this.setState({complemento: response.data.complement});
            this.setState({isEditable: false});

            if (this.state.logradouro != '') {
              this.setState({bgColorLogradouro: '#FAF7F7'});
              this.setState({editarInptLogradouro: false});
            }
            if (this.state.bairro != '') {
              this.setState({bgColorBairro: '#FAF7F7'});
              this.setState({editarInptBairro: false});
            }
            if (this.state.selectedCidade != '') {
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
        });
    }
  }; //FIM BUSCA CEP

  limpaMsgs(newArr) {
    this.setState({
      MsgErro: newArr,
    });
  }

  registra = async () => {
    if (
      this.state.cep != '' &&
      this.state.logradouro != '' &&
      this.state.numero != '' &&
      this.state.bairro != '' &&
      this.state.estado != '' &&
      this.state.selectedCidade != ''
    ) {
      let rota = '/addresses/user_address_create';

      let params = {
        address: {
          zip_code: this.state.cep,
          street: this.state.logradouro,
          number: this.state.numero,
          complement: this.state.complemento,
          neighborhood: this.state.bairro,
          city: this.state.selectedCidade,
          state: this.state.estado,
          latitude: '',
          longitude: '',
        },
      };
      api
        .post(rota, params)
        .then(response => {
          this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
        })
        .catch(error => {
          this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
        });
    } else {
      await this.limpaMsgs([]);

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

      if (this.state.selectedCidade == '') {
        this.setState({bdColorCidade: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar a cidade');
        this.setState({MsgErro: msg});
      }

      //  this.setState({ MsgErro: ["Os campos com '*' são obrigatórios."] })
      this.setState({exibirModal: true});
    }
  };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  atualizaEndereço = async () => {
    if (
      this.state.cep != '' &&
      this.state.logradouro != '' &&
      this.state.numero != '' &&
      this.state.bairro != '' &&
      this.state.estado != '' &&
      this.state.selectedCidade != ''
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

      await api
        .patch(rota, params)
        .then(response => {})
        .catch(error => {
          //Grava chave para a proxima autenticação na API

          this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
        });
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

      if (this.state.selectedCidade == '') {
        this.setState({bdColorCidade: 'red'});
        var msg = this.state.MsgErro.concat('Favor informar a cidade');
        this.setState({MsgErro: msg});
      }
      this.setState({exibirModal: true});
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled={this.state.shouldAvoid}>
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

        <View style={styles.container}>
          <View style={styles.boxLogo}>
            <Image
              fadeDuration={0}
              style={styles.imgLogo}
              source={require('../../../assets/images/blomialogo.png')}
            />
          </View>

          <View style={styles.boxRow1}>
            <View style={styles.boxTitle}>
              <Text
                style={{
                  fontSize: responsiveFont(2),
                  fontFamily: 'Montserrat-Regular',
                }}>
                O preenchimento do endereço é necessário para geração do boleto
              </Text>
            </View>

            <View style={styles.boxInputs}>
              <View style={{width: '30%'}}>
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
                    {borderColor: this.state.bdColorCep},
                  ]}
                  onFocus={() =>
                    this.setState({bdColorCep: '#B3B3B3', shouldAvoid: false})
                  }
                  onBlur={() => this.setState({shouldAvoid: true})}
                  placeholderTextColor="#B3B3B3"
                  placeholder="00.000-000"
                />
              </View>

              <View style={{width: '55%'}}>
                <Text style={styles.description2}>* Logradouro</Text>
                <TextInput
                  value={this.state.logradouro}
                  onChangeText={text => this.setState({logradouro: text})}
                  onFocus={() => this.setState({bdColorLogradouro: '#B3B3B3'})}
                  maxLength={20}
                  editable={this.state.editarInptLogradouro}
                  style={
                    this.state.logradouro == ''
                      ? [
                          styles.InputText,
                          {borderColor: this.state.bdColorLogradouro},
                        ]
                      : [
                          styles.InputText,
                          {
                            backgroundColor: this.state.bgColorLogradouro,
                            color: this.state.txtColorAuto,
                          },
                        ]
                  }
                  placeholderTextColor="#B3B3B3"
                  placeholder="Rua, Avenida, etc"
                />
              </View>
            </View>
          </View>

          <View style={styles.boxRow2}>
            <View style={styles.boxInputs}>
              <View style={{width: '30%'}}>
                <Text style={styles.description1}>* Número</Text>
                <TextInput
                  maxLength={5}
                  value={this.state.numero}
                  onChangeText={text => this.setState({numero: text})}
                  keyboardType="numeric"
                  style={[
                    styles.InputText,
                    {borderColor: this.state.bdColorNumero},
                  ]}
                  onFocus={() => this.setState({bdColorNumero: '#B3B3B3'})}
                  placeholderTextColor="#B3B3B3"
                  placeholder="140"
                />
              </View>
              <View style={{width: '55%'}}>
                <Text style={styles.description2}>Complemento</Text>
                <TextInput
                  maxLength={10}
                  value={this.state.complemento}
                  onChangeText={text => this.setState({complemento: text})}
                  style={styles.InputText}
                  placeholderTextColor="#B3B3B3"
                  placeholder="Bloco, apto, etc"
                />
              </View>
            </View>
          </View>

          <View style={[styles.boxRow3]}>
            <View style={styles.boxInputs}>
              <View style={{width: '92%'}}>
                <Text style={[styles.description1, {}]}>* Bairro</Text>
                <TextInput
                  value={this.state.bairro}
                  onChangeText={text => this.setState({bairro: text})}
                  placeholderTextColor="#B3B3B3"
                  placeholder="Jardim das Flores"
                  maxLength={15}
                  editable={this.state.editarInptBairro}
                  style={
                    this.state.bairro == ''
                      ? [
                          styles.InputText,
                          {borderColor: this.state.bdColorBairro},
                        ]
                      : [
                          styles.InputText,
                          {
                            backgroundColor: this.state.bgColorBairro,
                            color: this.state.txtColorAuto,
                          },
                        ]
                  }
                  onFocus={() => this.setState({bdColorBairro: '#B3B3B3'})}
                />
              </View>
            </View>
          </View>

          <View style={styles.boxRow4}>
            <View style={styles.boxInputs}>
              <View style={{width: '30%', marginTop: hp(0.59)}}>
                <Text style={styles.description1}>* UF</Text>
                <SearchableDropdown
                  multi={false}
                  items={this.state.estados}
                  selectedItems={this.state.selectedEstado}
                  onItemSelect={item => {
                    this.setState({estado: item.name, shouldExecute: true});
                    this.buscaMunicipios();
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedEstado.filter(
                      sitem => sitem.id !== item.id,
                    );
                    this.setState({selectedEstado: items});
                  }}
                  itemStyle={{
                    zIndex: 1,
                    width: 150,
                    height: hp('6%'),
                    padding: 10,
                    backgroundColor: 'white',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}
                  itemTextStyle={{
                    color: '#222',
                    fontFamily: 'Montserrat-Medium',
                  }}
                  itemsContainerStyle={{
                    maxHeight: 130,
                    width: 150,
                    zIndex: 1,
                  }}
                  defaultIndex={2}
                  chip={true}
                  resetValue={false}
                  textInputProps={{
                    value: this.state.estado,
                    editable: this.state.isEditable,
                    placeholder: 'Estado',
                    underlineColorAndroid: 'transparent',
                    style: {
                      marginLeft: 9,
                      width: 140,
                      height: hp('6%'),
                      padding: 12,
                      borderWidth: 1,
                      borderColor: this.state.bdColorEstado,
                      backgroundColor: '' || this.propscityBackgroundColor,
                      borderRadius: 300,
                      fontFamily: 'Montserrat-Medium',
                      fontSize: responsiveFont(1.8),
                    },
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                {/* Single */}
              </View>

              <View style={{width: '70%'}}>
                <Text style={[styles.description2, {paddingLeft: wp(20)}]}>
                  * Cidade
                </Text>
                <View style={{width: '40%'}}>
                  {/* Multi */}
                  <SearchableDropdown
                    multi={false}
                    selectedItems={this.state.selectedCidade}
                    onItemSelect={item => {
                      this.setState({selectedCidade: item.name});
                    }}
                    containerStyle={{padding: 5, marginLeft: wp(20)}}
                    onRemoveItem={(item, index) => {
                      const items = this.state.selectedCidade.filter(
                        sitem => sitem.id !== item.id,
                      );
                      this.setState({cidade: items});
                    }}
                    itemStyle={{
                      zIndex: 1,
                      width: 130,
                      height: hp('6%'),
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      fontFamily: 'Montserrat-Medium',
                    }}
                    itemTextStyle={{
                      color: '#222',
                      fontFamily: 'Montserrat-Medium',
                    }}
                    itemsContainerStyle={{
                      maxHeight: 130,
                      width: 130,
                      zIndex: 1,
                    }}
                    items={this.state.municipios}
                    defaultIndex={2}
                    chip={true}
                    resetValue={false}
                    textInputProps={{
                      editable: this.state.isEditable,
                      value: this.state.selectedCidade,
                      placeholder: 'Cidade',
                      underlineColorAndroid: 'transparent',
                      style: {
                        marginTop: 5,
                        width: 140,
                        height: hp('6%'),
                        padding: 12,
                        borderWidth: 1,
                        borderColor: this.state.bdColorCidade,
                        backgroundColor: '' || this.propscityBackgroundColor,
                        borderRadius: 300,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: responsiveFont(1.8),
                      },
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                  {/* Single */}
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.boxTitle, {marginTop: hp(7)}]}>
            <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
              * Campos Obrigatórios
            </Text>
          </View>

          <View style={styles.boxBtn}>
            <Ripple
              rippleCentered={true}
              onPress={this.registra}
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
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {
    client,
    address_company: client.company.address,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AddressForm);
