import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import api from '../../config/api';
import Modal from 'react-native-modal';

// IMPORTS PARA PARA O MODAL DE SENHA

import ModalDuplo from '../../components/ModalDuplo/ModalDuplo';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import Mapa from '../../components/Mapa/Mapa';
import Geolocation from '@react-native-community/geolocation';
import ModalSenha from '../../components/ModalSenha/ModalSenha';

//REDUX
import {connect} from 'react-redux';

class empresaTransacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empresaSelecionada: 0,
      listEmpresas: [],

      //Variavel para controla o LOADING da tela
      spinner: false,

      text: '',
      textPwd: '',
      inputPwdErro: false,

      senha: '',
      modalSenha: false,
      idEmpresaSaque: null,
      valor: this.props.navigation.state.params.valor,
      MsgErro: [
        'Erro desconhecido, tente novamente. Se persistir entre em contato com o suporte.',
      ],
      exibirModalErro: false,
      redirectHome: false,
      showModal: false,
      latitudeEmpresa: null,
      longitudeEmpresa: null,
      localizacaoDevice: null,
      latitudeDevice: 0,
      longitudeDevice: 0,
      operacao: this.props.navigation.state.params.operacao, //1 = SAQUE | 2 = DEPOSITO
      msgModal: null,
      txtBtnModal: null,
      tipoModal: null,
      carregamentoTela: true,
      NomeEmpresaSelecionada: '',
      modalPermissaoNegada: false,
      contentModal: {
        content: '',
        title: '',
      },
      isEnoughMoney: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({carregamentoTela: true});

      let isGranted;
      if (Platform.OS === 'android') {
        isGranted = await this.requestLocationPermission();
      } else {
        isGranted = true;
      }
      if (isGranted) {
        await this.buscaEmpresas();
      } else {
        this.setState({
          contentModal: {
            content:
              'Para permitir o uso da localiza????o acesse configura????o / Apps / Gerenciar / Blomia / Permiss??es',
            title: 'Permiss??o Negada',
          },
          modalPermissaoNegada: true,
        });
      }

      this.setState({operacao: this.props.navigation.state.params.operacao});
      this.setState({carregamentoTela: false});
    });

    this.blurListener = navigation.addListener('didBlur', () => {
      this.setState({listEmpresas: []});
    });
  }

  selectEmpresa(idEmpresa, latitude, longitude, nomeEmpresa) {
    this.setState({
      empresaSelecionada: idEmpresa,
      latitudeEmpresa: latitude,
      longitudeEmpresa: longitude,
      NomeEmpresaSelecionada: nomeEmpresa,
    });
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiss??o para localiza????o',
          message:
            'Para permitir o uso da localiza????o acesse configura????o / Apps / Gerenciar / Blomia / Permiss??es.',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      //console.warn(err);
    }
  }

  RemoveMascara(valor) {
    valor = valor.replace('R$', '');
    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');
    return valor;
  }

  fecharModal = () => {
    this.setState({modalSenha: false});
  };

  async buscaEmpresas() {
    this.setState({spinner: true});

    //Recebeo valor da opera????o pela prp da tela anterior
    this.setState({valor: this.props.navigation.state.params.valor});

    //A Busca de emprsa ocorre dentro da fun????o que pegar a localiza????o do device
    Geolocation.getCurrentPosition(
      async info => {
        let localizacaoDevice = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };

        // .get(`find_companies?requisition_type=${this.props.navigation.state.params.operacao}&latitude=-19.929117&longitude=-43.931786&value=${this.RemoveMascara(this.state.valor)}`)

        this.setState({
          latitudeDevice: info.coords.latitude,
          longitudeDevice: info.coords.longitude,
        });

        await api
          .get(
            `find_companies?requisition_type=${
              this.props.navigation.state.params.operacao
            }&latitude=${localizacaoDevice.latitude}&longitude=${
              localizacaoDevice.longitude
            }&value=${this.RemoveMascara(this.state.valor)}`,
          )
          .then(async response => {
            this.selectEmpresa(
              response.data[0].id,
              response.data[0].address.latitude,
              response.data[0].address.longitude,
              response.data[0].company_name,
            );

            this.setState({listEmpresas: response.data});
            this.setState({spinner: false});
          })
          .catch(async error => {
            if (
              error.response.data.message[0].detail ==
              'no company available in the region.'
            ) {
              this.setState({
                msgModal:
                  'Infelizmente n??o temos empresas dispon??veis no momento. Por favor, tente mais tarde.',
                showModal: true,
                tipoModal: 1,
                txtBtnModal: 'IN??CIO',
              });
            } else if (
              error.response.data.message[0].minimum_value != 0 &&
              error.response.data.message[0].maximun_value != 0
            ) {
              let minimo = String(
                Number(error.response.data.message[0].minimum_value).toFixed(2),
              ).replace('.', ',');
              let maximo = String(
                Number(error.response.data.message[0].maximun_value).toFixed(2),
              ).replace('.', ',');

              const tipoMsg = this.state.operacao === 1 ? 'sacar' : 'depositar';

              this.setState({
                msgModal: `${
                  this.state.valor
                } n??o est?? dispon??vel no momento. Voc?? pode ${tipoMsg} valores entre R$${minimo} e R$${maximo}.`,
                showModal: true,
                tipoModal: 2,
                txtBtnModal: 'MUDAR VALOR',
              });
            } else {
              this.setState({MsgErro: ['Ocorreu algum erro']});
              this.setState({exibirModalErro: true});
            }
          });
      },
      error => {
        this.setState({
          contentModal: {
            content: 'Para permitir o uso da localiza????o ative o GPS',
            title: 'Acesso ao GPS',
          },
          modalPermissaoNegada: true,
        });
      },
    );
    this.setState({spinner: false});
  }

  funcModal = paginaRediect => {
    this.setState({showModal: false});
    this.props.navigation.navigate(paginaRediect);
  };

  navegarLoginPg = () => {
    this.setState({showModal: false});
    this.props.navigation.navigate('inicioCliente', {
      msgToast: 'Opera????o Cancelada!',
    });
  };

  loadAvalicao(score = 0) {
    score = parseInt(score);
    return (
      <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
        {score >= 1 && (
          <Icon size={16} type="octicon" name="star" color="#DAA520" />
        )}
        {score >= 2 && (
          <Icon size={16} type="octicon" name="star" color="#DAA520" />
        )}
        {score >= 3 && (
          <Icon size={16} type="octicon" name="star" color="#DAA520" />
        )}
        {score >= 4 && (
          <Icon size={16} type="octicon" name="star" color="#DAA520" />
        )}
        {score >= 5 && (
          <Icon size={16} type="octicon" name="star" color="#DAA520" />
        )}

        {score < 1 && (
          <Icon size={16} type="octicon" name="star" color="#E9E9E9" />
        )}
        {score < 2 && (
          <Icon size={16} type="octicon" name="star" color="#E9E9E9" />
        )}
        {score < 3 && (
          <Icon size={16} type="octicon" name="star" color="#E9E9E9" />
        )}
        {score < 4 && (
          <Icon size={16} type="octicon" name="star" color="#E9E9E9" />
        )}
        {score < 5 && (
          <Icon size={16} type="octicon" name="star" color="#E9E9E9" />
        )}
      </View>
    );
  }

  setSenha = senha => {
    this.setState({senha: senha + this.senha});
  };

  openModal = () => {
    this.setState({modalSenha: true});
  };

  openModalErro = () => this.setState({exibirModalErro: true});

  closeModalErro = () => {
    this.setState({exibirModalErro: false});

    if (this.state.redirectHome) {
      this.props.navigation.navigate('inicioCliente');
    }
  };

  solicitaSaque = async () => {
    this.setState({modalSenha: false});

    let params = {
      requisition: {
        // password: this.state.senha,
        password: this.props.senhaModal[0],
      },
    };

    await api
      .post(
        'withdrawal/create?company_id=' +
          this.state.empresaSelecionada +
          '&value=' +
          this.RemoveMascara(this.state.valor) +
          '&requisition_type=1',
        params,
      )
      .then(async response => {
        //Atualiza tokens para proxima requisi????o

        await AsyncStorage.setItem('idSaque', JSON.stringify(response.data.id));

        this.props.navigation.navigate('CodigoSaque');
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisi????o
        if (
          error.response.data.errors &&
          error.response.data.errors[0].detail == 'Wrong password'
        ) {
          this.setState({MsgErro: ['Senha inv??lida']});
        } else if (
          error.response.data.message &&
          error.response.data.message[0].detail ==
            'You already have a request in progress'
        ) {
          this.setState({
            MsgErro: ['Voc?? j?? tem um solicita????o em andamento.'],
          });
          this.setState({redirectHome: true});
        } else if (
          error.response.data.message &&
          error.response.data.message[0].detail ===
            "User don't have enough money"
        ) {
          this.setState({
            MsgErro: ['Voc?? n??o tem saldo suficiente para essa solicita????o.'],
          });
        }

        this.setState({exibirModalErro: true});
      });
  };

  solicitaDeposito = async () => {
    this.setState({modalSenha: false});

    let params = {
      requisition: {
        // password: this.state.senha,
        password: this.props.senhaModal[0],
      },
    };

    await api
      .post(
        'deposit/create?company_id=' +
          this.state.empresaSelecionada +
          '&value=' +
          this.RemoveMascara(this.state.valor) +
          '&requisition_type=2',
        params,
      )
      .then(async response => {
        await AsyncStorage.setItem('idSaque', JSON.stringify(response.data.id));

        this.props.navigation.navigate('CodigoSaque');
      })
      .catch(async error => {
        if (
          error.response.data.errors &&
          error.response.data.errors[0].detail == 'Wrong password'
        ) {
          this.setState({MsgErro: ['Senha inv??lida']});
        } else if (
          error.response.data.message &&
          error.response.data.message[0].detail ==
            'You already have a request in progress'
        ) {
          this.setState({
            MsgErro: ['Voc?? j?? tem um solicita????o em andamento.'],
          });
          this.setState({redirectHome: true});
        }

        this.setState({exibirModalErro: true});
        this.setState({modalSenha: false});
      });
  };

  render() {
    var controlador = 0;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ModalDuplo
          titulo={this.state.contentModal.title}
          conteudo={this.state.contentModal.content}
          buttonFunctionText="IN??CIO"
          visibleExit={this.state.modalPermissaoNegada}
          function={() => {
            this.setState({modalPermissaoNegada: false});
            navigation.navigate('inicioCliente');
          }}
        />
        <ModalTriplo
          ConteudoTextoModal={
            'Voc?? n??o possui saldo suficiente para esse saque.'
          }
          TextoBot??oFechar={'FECHAR'}
          TextoBot??oFun????o={'IR PARA DEP??SITO'}
          TamanhoDoTexto={18}
          CorBot??oFechar={'#707070'}
          CorBot??oFun????o={'#007F0B'}
          isModalVisible={this.state.isEnoughMoney}
          Fechar={() => {
            this.setState({
              isEnoughMoney: false,
            });
            navigation.navigate('inicioCliente');
          }}
          Fun????o={() => {
            this.setState({
              isEnoughMoney: false,
            });
            navigation.navigate('depositoCliente');
          }}
        />

        <Spinner visible={this.state.spinner} color="white" />
        {/* <ScrollView> */}
        <ModalDefault
          openModal={this.state.exibirModalErro}
          closeModal={this.closeModalErro}
          MsgErro={this.state.MsgErro}
          tipoModal={'erro'}
        />

        <ModalTriplo
          ConteudoTextoModal={this.state.msgModal}
          TextoBot??oFechar={this.state.tipoModal == 1 ? null : 'IN??CIO'} //MODAL 1 = renderiza 1 bot??o | 2 = renderiza 2 bot??es
          TextoBot??oFun????o={this.state.txtBtnModal}
          TamanhoDoTexto={18}
          CorBot??oFechar={'#707070'}
          CorBot??oFun????o={'#007F0B'}
          isModalVisible={this.state.showModal}
          Fechar={
            this.state.tipoModal == 1 ? null : () => this.navegarLoginPg()
          }
          Fun????o={
            this.state.tipoModal == 1
              ? () => this.funcModal('inicioCliente')
              : () =>
                  this.funcModal(
                    this.state.operacao == 1
                      ? 'sacarCliente'
                      : 'DepositoDinheiroCliente',
                  )
          }
        />

        <ModalSenha
          useNativeDriver={true}
          animationType="fade"
          isVisible={this.state.modalSenha}
          fechar={() => this.fecharModal()}
          validar={
            this.state.operacao == 1
              ? this.solicitaSaque
              : this.solicitaDeposito
          }
        />
        <KeyboardAvoidingView style={styles.containerAvoid}>
          {!this.state.listEmpresas.length < 1 ? (
            <>
              <View style={styles.boxMapa}>
                {this.state.listEmpresas.length > 0 && (
                  <Mapa
                    navigation={this.props.navigation}
                    latitudeDevice={this.state.latitudeDevice}
                    longitudeDevice={this.state.longitudeDevice}
                    latitudeDest={this.state.latitudeEmpresa}
                    longitudeDest={this.state.longitudeEmpresa}
                    nomeEmpresa={this.state.NomeEmpresaSelecionada}
                  />
                )}
              </View>

              <View style={styles.boxEmpresas}>
                {this.state.latitudeEmpresa !== null &&
                  this.state.listEmpresas.map(empresa => (
                    <View
                      key={empresa.id}
                      style={[
                        styles.empresa,
                        this.state.empresaSelecionada == empresa.id
                          ? {backgroundColor: '#B2D8B5'}
                          : {backgroundColor: '#FFFF'},
                      ]}>
                      <View style={styles.empresaCol_1}>
                        <TouchableOpacity
                          onPress={() => {
                            this.selectEmpresa(
                              empresa.id,
                              empresa.address.latitude,
                              empresa.address.longitude,
                              empresa.company_name,
                            );
                          }}>
                          <Text style={styles.name}>
                            {String(empresa.company_name).length > 35
                              ? `${String(empresa.company_name).substr(
                                  0,
                                  35,
                                )}...`
                              : String(empresa.company_name)}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text>{empresa.score.score}</Text>
                            {empresa.score &&
                              this.loadAvalicao(empresa.score.score)}
                            <Text>({empresa.score.quantity})</Text>
                          </View>
                          <View>
                            <Text style={styles.endEmpresa}>
                              {empresa.address.street}, {empresa.address.number}
                              , {empresa.address.neighborhood}{' '}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.empresaCol_2}>
                        <Text style={{fontFamily: 'Montserrat-Medium'}}>
                          {empresa.address.distance}
                        </Text>
                      </View>
                      {/* <View style={styles.empresaCol_3}><Text style={styles.txtGps}>Ir para GPS</Text></View> */}
                    </View>
                  ))}
              </View>

              <View style={styles.boxButtons}>
                {this.state.latitudeEmpresa !== null && (
                  <ButtonCustom
                    navegar={this.openModal}
                    textButton={'CONTINUAR'}
                    btnColor={'#007F0B'}
                    textColor={'#F3F3F3'}
                    borderColor={'#007F0B'}
                  />
                )}
                {this.state.latitudeEmpresa !== null && (
                  <ButtonCustom
                    navegar={this.navegarLoginPg}
                    textButton={
                      this.state.operacao == 1
                        ? 'CANCELAR SAQUE'
                        : 'CANCELAR DEP??SITO'
                    }
                    btnColor={'#ffffff'}
                    textColor={'#4C4C4C'}
                    borderColor={'#4C4C4C'}
                  />
                )}
              </View>
            </>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({senhaModal}) => {
  return {
    senhaModal: senhaModal.senhaModal,
  };
};

export default connect(
  mapStateToProps,
  null,
)(empresaTransacao);
