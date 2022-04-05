import React from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux';
import {responsiveFontSize as responsiveFont, responsiveFontSize} from 'react-native-responsive-dimensions';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
// import RadioForm from 'react-native-simple-radio-button';
import {RadioButton} from 'react-native-paper';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import api from '../../config/api';
import Balance from '../../components/Balance';
import InputText from '../../components/InputText';
import Select from '../../components/Select';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import setAddressClient from '../../store/actions/setAddressClient';


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
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: null,
      estado: null,
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

      //Variavel para controla o LOADING da tela
      spinner: false,

      exibirModal: false,
      MsgErro: [],

      loadingCidade: false,
    };
  }

  async componentDidMount() {
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
    }
  };

  async buscaCidades(stateSelected) {
    if (this.state.shouldExecute) {
      this.setState({cidades: [], loadingCidade: true});
      await api
        .get(`/states_cities?initial=${stateSelected}`)
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
      .catch(async error => {
        this.setState({shouldExecute: false});
      });
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
            this.setState({cidade: null});
            this.setState({estado: null});
            this.setState({complemento: ''});
            this.setState({spinner: false});

            this.setState({exibirModal: true});
            this.setState({MsgErro: ['CEP Inváilido']});
          } else {
            this.setState({logradouro: response.data.address});
            this.setState({bairro: response.data.neighborhood});
            this.setState({estado: {label: response.data.state, value: response.data.state}});
            this.setState({cidade: {label: response.data.city, value: response.data.city}});
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
      this.state.logradouro !== '' &&
      this.state.numero !== '' &&
      this.state.bairro !== '' &&
      this.state.estado &&
      this.state.cidade
    ) {
      const rota =
        this.props.type === 'empresa'
          ? `addresses/company_address_create?company_id=${
              this.props.client.company.id
            }`
          : 'addresses/user_address_create';

      let params = {
        address: {
          zip_code: this.state.cep,
          street: this.state.logradouro,
          number: this.state.numero,
          complement: this.state.complemento,
          neighborhood: this.state.bairro,
          city: this.state.cidade.value,
          state: this.state.estado.value,
          latitude: '',
          longitude: '',
        },
      };

      await api
        .post(rota, params)
        .then(async response => {
          //Grava chave para a proxima autenticação na API
          this.props.setAddressClientRedux(response.data);
          this.props.success();
        })
        .catch(async error => {
          // para manter o catch
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

  // atualizaEndereço = async () => {
  //   if (
  //     this.state.cep != '' &&
  //     this.state.logradouro != '' &&
  //     this.state.numero != '' &&
  //     this.state.bairro != '' &&
  //     this.state.estado != '' &&
  //     this.state.cidade != ''
  //   ) {
  //     let rota = ('/addresses/', this.state.idUsuario);
  //     let params = {
  //       address: {
  //         zip_code: this.state.cep,
  //         street: this.state.logradouro,
  //         number: this.state.numero,
  //         complement: this.state.complemento,
  //         neighborhood: this.state.bairro,
  //         city: this.state.cidade,
  //         state: this.state.estado,
  //         latitude: this.state.latitude,
  //         longitude: this.state.longitude,
  //       },
  //     };

  //     await api
  //       .patch(rota, params)
  //       .then(response => {

  //       })
  //       .catch(error => {
  //         //Grava chave para a proxima autenticação na API

  //         this.props.navigation.navigate('orientacaoDocPg'); //CHAMADA PROVISORIA
  //       });
  //   } else {
  //     if (this.state.cep == '') {
  //       this.setState({bdColorCep: 'red'});
  //       var msg = this.state.MsgErro.concat('Favor informar o CEP');
  //       this.setState({MsgErro: msg});
  //     }

  //     if (this.state.logradouro == '') {
  //       this.setState({bdColorLogradouro: 'red'});
  //       var msg = this.state.MsgErro.concat('Favor informar o logradouro.');
  //       this.setState({MsgErro: msg});
  //     }

  //     if (this.state.numero == '') {
  //       this.setState({bdColorNumero: 'red'});
  //       var msg = this.state.MsgErro.concat('Favor informar o número');
  //       this.setState({MsgErro: msg});
  //     }

  //     if (this.state.bairro == '') {
  //       this.setState({bdColorBairro: 'red'});
  //       var msg = this.state.MsgErro.concat('Favor informar o bairro');
  //       this.setState({MsgErro: msg});
  //     }

  //     if (this.state.estado == '') {
  //       this.setState({bdColorEstado: 'red'});
  //       var msg = this.state.MsgErro.concat('Favor informar o estado.');
  //       this.setState({MsgErro: msg});
  //     }

  //     if (this.state.cidade == '') {
  //       this.setState({bdColorCidade: 'red'});
  //       var msg = this.state.MsgErro.concat('Favor informar a cidade');
  //       this.setState({MsgErro: msg});
  //     }
  //     this.setState({exibirModal: true});
  //   }
  // };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  render() {
    const {showMenuDrawer, navigation, title = ""} = this.props;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {showMenuDrawer && (
            <CustomHeader
              title="Home"
              navigation={navigation}
              isHome={false}
            />
          )}
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
          >
          <View style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.textTitlePage}>{title}</Text>
                <Text style={styles.textDescription}>
                  Para efetuar o depósito, precisamos que você informe seu endereço:
                </Text>
                <View style={styles.input}>
                  <InputText
                    label="CEP"
                    valueInput={this.state.cep}
                    onChangeText={text => {
                      this.setState({cep: text}, () => this.buscaCep())
                    }}
                    placeHolder="00.000-000"
                    keyboardType="numeric"
                    maskType="cep"
                  />
                </View>
                <View style={styles.input}>
                  <InputText
                    label="Endereço"
                    valueInput={this.state.logradouro}
                    onChangeText={text => {
                      this.setState({logradouro: text})
                    }}
                    placeHolder="Rua, Avenida, Alameda, etc"
                  />
                </View>
                <View style={styles.input}>
                  <InputText
                    label="Número"
                    valueInput={this.state.numero}
                    onChangeText={text => {
                      this.setState({numero: text})
                    }}
                    placeHolder="000"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.input}>
                  <InputText
                    label="Complemento"
                    valueInput={this.state.complemento}
                    onChangeText={text => {
                      this.setState({complemento: text})
                    }}
                    placeHolder="Casa, Apartamento, Sala, etc"
                  />
                </View>
                <View style={styles.input}>
                  <InputText
                    label="Bairro"
                    valueInput={this.state.bairro}
                    onChangeText={text => {
                      this.setState({bairro: text})
                    }}
                    placeHolder="Bairro"
                  />
                </View>
                <View style={styles.input}>
                  <Select
                    label="Estado"
                    valueInput={this.state.estado}
                    placeHolder="Estado"
                    changeValue={optionFiltroTipoConta => {
                      this.setState({estado: optionFiltroTipoConta});
                    }}
                    options={this.state.estados}
                    handleClose={optionSelected => {
                      if(optionSelected){
                        this.buscaCidades(optionSelected.value);
                      }
                    }}
                  />
                </View>
                <View style={styles.input}>
                  <Select
                    label="Cidade"
                    valueInput={this.state.cidade}
                    placeHolder="Cidade"
                    changeValue={optionFiltroTipoConta => {
                        this.setState({cidade: optionFiltroTipoConta})
                    }}
                    loading={this.state.loadingCidade}
                    options={this.state.cidades}
                  />
                </View>
              </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.gpsButtonStyle}
                onPress={() => this.registra()}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: responsiveFontSize(2),
                  }}
                >
                  CONTINUAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </KeyboardAvoidingView>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

const mapDispatchToProps = dispatch => {
  return {
    setAddressClientRedux: addressClient => dispatch(setAddressClient(addressClient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
