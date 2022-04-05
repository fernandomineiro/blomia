import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView} from 'react-native';
import LogoBlomia from '../../components/Logo/LogoBlomia.js';
import {styles} from './styles.js';
import styleModal from './stylesModal';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../config/api';
import ActionCable from 'react-native-actioncable';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import Spinner from 'react-native-loading-spinner-overlay';
import {limitadorString} from '../../utils/funcoes';
import { URL_ACTION_CABLE } from '../../../blomia.config';

//REDUX
import {connect} from 'react-redux';

import {setMsgToast} from '../../store/actions/msgToast';
import Balance from '../../components/Balance/index.js';
import CustomHeader from '../../components/CustomHeader/CustomHeader.js';

class CodigoSaque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      starCount: 0,
      counter: '',
      modalAvaliacao: false,
      idSaque: 0,
      IdEmpresaRequisicao: null,
      DataRequisicao: null,
      HoraRequisicao: null,
      CodigoRequisicao: null,
      CodigoValidade: null,
      EnderecoEmpresa: null,
      ValorRequisicao: null,
      EmpresaRequisicao: null,
      BairroRequisicao: null,
      AvaliacaoEmpresa: null,
      codigoVencido: false,
      modalSenha: false,
      modalMsg: false,
      senha: '',
      MsgErro: [''],
      exibirModalErro: false,
      reloadPg: false,
      operacao: null,
      spinner: false,
      carregamentoTela: true,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;

    this.setState({saldo: await AsyncStorage.getItem('saldo')});
    this.setState({idSaque: await AsyncStorage.getItem('idSaque')});

    await this.resumoRequisicao(await AsyncStorage.getItem('idSaque'));
    // this.validaCodigo();
    this.splitDot(this.state.CodigoRequisicao);
    this.ConectaWebSocket();
  }

  /* limpa o timer toda vez que a página é deixada */
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  closeModalErro = () => {
    this.setState({exibirModalErro: false});

    if (this.state.redirectHome) {
      this.props.navigation.navigate('inicioCliente');
    }
  };

  async validaCodigo(CodigoValidade) {
    var DtaAtual = new Date();
    var validadeCodigo = new Date(CodigoValidade);

    if (DtaAtual > validadeCodigo) {
      this.setState({codigoVencido: true});
    } else {
      this.setState({codigoVencido: false});
      await this.start();
    }
  }

  async checkSaldoEmpresa() {
    await api
      .get('in_cash_requisitions/new_code?requisition_id=' + this.state.idSaque)
      .then(async response => {
        if (response.data.message[0].detail === 'Value available') {
          this.setState({modalSenha: true});
        }

        if (
          response.data.message[0].detail ===
          'value is no more available, research again!'
        ) {
          this.setState({modalMsg: true});
        }
      })
      .catch(async error => {});
  }

  RemoveMascara(valor) {
    valor = valor.replace('R$', '');
    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');
    return valor;
  }

  atualizaCodigo = async () => {
    let params = {
      requisition: {
        password: this.state.senha,
      },
    };

    await api
      .post(
        'withdrawal/create?company_id=' +
          this.state.IdEmpresaRequisicao +
          '&value=' +
          this.RemoveMascara(this.state.ValorRequisicao) +
          '&requisition_type=1',
        params,
      )
      .then(async response => {
        //Atualiza tokens para proxima requisição

        await AsyncStorage.setItem('idSaque', JSON.stringify(response.data.id));

        this.setState({modalSenha: false});
        this.componentDidMount();
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição

        if (
          error.response.data.errors &&
          error.response.data.errors[0].detail === 'Wrong password'
        ) {
          this.setState({MsgErro: ['Senha inválida']});
        } else if (
          error.response.data.message &&
          error.response.data.message[0].detail ===
            'You already have a request in progress'
        ) {
          this.setState({
            MsgErro: ['Você já tem um solicitação em andamento.'],
          });
          this.setState({redirectHome: true});
        }

        this.setState({exibirModalErro: true});
        this.setState({modalSenha: false});
      });
  };

  async start() {
    var now = new Date();
    var expiration = new Date(this.state.CodigoValidade);

    /*
        Exibe o tempo em segundos
        totalExecution = (expiration - now)
        */
    var totalSeconds = (expiration - now) / 1000;

    var timer = setInterval(() => {
      var secondsLabel = '';
      var minutesLabel = '';
      var hoursLabel = '';
      function pad(val) {
        var valString = val + '';
        if (valString.length < 2) {
          return '0' + valString;
        } else {
          return valString;
        }
      }

      secondsLabel = pad(totalSeconds % 60);
      minutesLabel = pad(parseInt(totalSeconds / 60));
      hoursLabel = pad(parseInt(minutesLabel / 60));
      totalSeconds--;

      //Utilizado para remover milesegundos
      secondsLabel = secondsLabel.split('.');
      secondsLabel = secondsLabel[0];

      //Utilizado para adicionar zero a esquerda
      secondsLabel.length === 1 ? (secondsLabel = '0' + secondsLabel) : null;
      minutesLabel.length === 1 ? (minutesLabel = '0' + minutesLabel) : null;

      // var zeroVerification = `${hoursLabel}:${minutesLabel}:${secondsLabel}`

      var zeroVerification =
        hoursLabel + ':' + minutesLabel + ':' + secondsLabel;

      if (zeroVerification !== '00:00:00') {
        this.setState({counter: zeroVerification});
      } else {
        this.setState({counter: '00:00:00', codigoVencido: true});

        clearInterval(timer);
      }
    }, 1000);

    this.setState({timer: timer});

    setTimeout(() => {
      clearInterval(timer);
    }, 500000);
  }

  async resumoRequisicao(idTransacao) {
    this.setState({carregamentoTela: true});
    await api
      .get('user/requisition/sumup?requisition_id=' + idTransacao)
      .then(async response => {
        //Atualiza tokens para proxima requisição

        await this.setState({
          IdEmpresaRequisicao: response.data.company_id,
          DataRequisicao: response.data.created_at,
          HoraRequisicao: response.data.created_time,
          CodigoRequisicao: response.data.requisition_code,
          CodigoValidade: response.data.requisition_code_expires_at,
          EnderecoEmpresa: response.data.address,
          BairroRequisicao: response.data.neighborhood,
          ValorRequisicao: response.data.value,
          EmpresaRequisicao: response.data.company,
          AvaliacaoEmpresa: response.data.score.score,
          operacao: response.data.requisition_setting_id,
        });

        await this.validaCodigo(response.data.requisition_code_expires_at);

        this.setState({carregamentoTela: false});
      })
      .catch(async error => {
        this.setState({carregamentoTela: false});
      });
  }

  async cancelarSaque(redirect = true) {
    await api
      .post('requisition/cash/cancelation?requisition_id=' + this.state.idSaque)
      .then(async response => {
        //Atualiza tokens para proxima requisição

        await AsyncStorage.removeItem('idSaque');

        if (redirect) {
          if (this.state.operacao === 1) {
            this.props.setMesageToast('Solicitação de Saque cancelada');
          } else {
            this.props.setMesageToast('Solicitação de Depósito cancelada');
          }

          this.props.navigation.navigate('inicioCliente');
        }
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  }

  enviaAvaliacao = async () => {
    await api
      .post('/create/company/score?requisition_id=' + this.state.idSaque, {
        score: {
          score: this.state.starCount,
        },
      })
      .then(async response => {
        //Atualiza tokens para proxima requisição

        if (this.state.operacao === 1) {
          this.props.navigation.navigate('SaqueConcluido', {
            novoSaldo: response.data.balance,
          });
        } else {
          this.props.navigation.navigate('DepositoConcluido', {
            novoSaldo: response.data.balance,
          });
        }
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleReloadPg = () => {
    this.setState({reloadPg: !this.state.reloadPg});
  };

  async onStarRatingPress(rating) {
    await this.setState({
      starCount: rating,
    });
  }

  splitDot = code => {
    let str1 = code.substr(0, 3);
    let str2 = code.substr(3, 7);
    this.setState({CodigoRequisicao: str1 + '.' + str2});
  };

  showModalAvaliacao() {
    this.setState({modalAvaliacao: true});
  }

  buscaNovaEmpresa = async () => {
    await this.cancelarSaque(false);
    if (this.state.operacao === 1) {
      this.props.navigation.navigate('sacarCliente');
    } else if (this.state.operacao === 2) {
      this.props.navigation.navigate('DepositoDinheiroCliente');
    }
  };

  ConectaWebSocket() {
    let uid = api.defaults.headers.common.uid;
    let accessToken = api.defaults.headers.common['access-token'];
    let client = api.defaults.headers.common.client;
    let that = this;

    const cable = ActionCable.createConsumer(
      `${URL_ACTION_CABLE}?uid=${uid}&access-token=${accessToken}&client=${client}`,
    );

    // Acessa canal do websocket
    cable.subscriptions.create('RequisitionChannel', {
      received(data) {
        AsyncStorage.removeItem('idSaque');
        that.showModalAvaliacao();
      },
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader navigation={this.props.navigation} hiddenButton />
        <Spinner
          visible={this.state.spinner}
          color="white"
          textStyle={styles.spinnerTextStyle}
        />
        {!this.state.carregamentoTela &&
        (this.state.counter !== '' || this.state.codigoVencido === true) ? (
          <>
            <View style={styles.header}>
              <Balance />
            </View>
            <View style={styles.content}>
              {this.state.operacao === 1 && (
                <Text style={styles.descriptionCode}>Código para saque</Text>
              )}
              {this.state.operacao === 2 && (
                <Text style={styles.descriptionCode}>Código para depósito</Text>
              )}
              <Text style={styles.textCode}>{this.state.CodigoRequisicao}</Text>
              {!this.state.codigoVencido && (
                <Text style={styles.textTimer}>
                  Esse código expira em{' '}
                  <Text style={styles.timer}>
                    {this.state.counter !== '01:60:00' && this.state.counter}
                  </Text>
                </Text>
              )}
              {this.state.codigoVencido && (
                <Text style={styles.textCodVencido}>
                  {' '}
                  Esse código está expirado, <Text>solicite um novo.</Text>{' '}
                </Text>
              )}
              <View style={styles.addressContainer}>
                <Text style={styles.companyStyle}>
                  {String(this.state.EmpresaRequisicao).length > 30
                    ? `${String(this.state.EmpresaRequisicao).substr(0, 30)}...`
                    : String(this.state.EmpresaRequisicao)}
                </Text>
                <Text style={styles.addressStyle}>
                  {this.state.EnderecoEmpresa}
                </Text>
                <Text style={styles.addressStyle}>
                  Bairro {limitadorString(this.state.BairroRequisicao, 25)}
                </Text>
              </View>
            </View>

            <View style={styles.containerValorEGps}>
              {/* <Text style={styles.valueStyleText}>Valor</Text> */}
              <Text style={styles.valueStyle}>
                {this.state.ValorRequisicao}
              </Text>
            </View>

            <View style={styles.footer}>
              {/* <Text style={styles.resendCode}>Código não foi gerado?<Text style={{fontFamily: 'Montserrat-Bold'}}> CLIQUE AQUI</Text></Text> */}
              {!this.state.codigoVencido ? (
                <ButtonCustom
                  ação={() => this.props.navigation.navigate('inicioCliente')}
                  btnColor={'#007f0b'}
                  textColor={'#ffffff'}
                  styleCustom={{borderColor: '#007f0b'}}
                  textButton={'INÍCIO'}
                />
              ) : (
                <>
                  <ButtonCustom
                    ação={() => this.checkSaldoEmpresa()}
                    btnColor={'#007f0b'}
                    textColor={'#ffffff'}
                    textButton={'NOVO CÓDIGO'}
                  />
                </>
              )}

              <ButtonCustom
                ação={() => this.cancelarSaque()}
                btnColor={'#ffffff'}
                textColor={'#707070'}
                textButton={
                  this.state.operacao == 1
                    ? 'CANCELAR SAQUE'
                    : 'CANCELAR DEPÓSITO'
                }
                borderColor={'#707070'}
              />
            </View>

            <Modal isVisible={this.state.modalAvaliacao}>
              <View style={styles.containerModal}>
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{width: '144%', alignItems: 'center', left: 14}}>
                      <Text style={styles.textConclusion}>
                        Solicitação concluída
                      </Text>
                    </View>
                    <View style={styles.containerXButton}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('SaqueConcluido', {
                            valorSaque: this.state.ValorRequisicao,
                          })
                        }>
                        <Text style={styles.xButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{width: '150%'}}>
                    <Text style={styles.storeNameText}>avaliar empresa?</Text>
                  </View>
                </View>
                <StarRating
                  disabled={false}
                  emptyStar={'star'}
                  fullStar={'star'}
                  halfStar={'star'}
                  iconSet={'FontAwesome'}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                  fullStarColor={'#FEC107'}
                  starSize={35}
                  emptyStarColor={'#E9E9E9'}
                />
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.enviaAvaliacao()}>
                    <Text style={styles.rateText}>AVALIAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal isVisible={this.state.isModalVisible}>
              <View style={styles.modal}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.descriptionWithdrawTitle}>
                    Resumo do {this.state.operacao == 1 ? 'saque' : 'depósito'}
                  </Text>
                </View>

                <View style={{alignitems: 'flex-start', paddingLeft: 20}}>
                  <Text style={{color: 'black', fontFamily: 'Montserrat-Bold'}}>
                    Em andamento
                  </Text>
                  <Text style={styles.descriptionWithdraw}>
                    Data: {this.state.DataRequisicao}
                  </Text>
                  <Text style={styles.descriptionWithdraw}>
                    Hora: {this.state.HoraRequisicao}
                  </Text>
                  <Text style={styles.descriptionWithdraw}>
                    Código: {this.state.CodigoRequisicao}
                  </Text>
                  <Text style={styles.descriptionWithdraw}>
                    Valor: {this.state.ValorRequisicao}
                  </Text>
                  <Text style={styles.descriptionWithdraw}>
                    {this.state.EmpresaRequisicao}
                  </Text>
                  <Text style={styles.descriptionWithdraw}>
                    Avaliação: {this.state.AvaliacaoEmpresa}{' '}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{paddingTop: 20}}
                  onPress={() => this.toggleModal()}>
                  <Text style={styles.textButtonClose}>FECHAR</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal
              useNativeDriver={true}
              animationType="fade"
              isVisible={this.state.modalSenha}>
              <View style={styleModal.container}>
                <View style={styleModal.modalContent}>
                  <View style={styleModal.titulo}>
                    <Text style={styleModal.textTitulo}>Digite sua senha</Text>
                  </View>
                  <View style={styleModal.userContainer}>
                    <View
                      style={[styleModal.secureBox, {borderColor: '#B3B3B3'}]}>
                      <SmoothPinCodeInput
                        placeholder={
                          <View style={styleModal.placeholderPinStyle} />
                        }
                        mask={<View style={styleModal.pinMaskStyle} />}
                        // maskDelay={100000}
                        password={true}
                        cellStyle={null}
                        cellStyleFocused={'#B3B3B3'}
                        cellSize={responsiveFont(4)}
                        codeLength={6}
                        value={this.state.senha}
                        onFocus={text => this.setState({senha: text})}
                        onTextChange={text => this.setState({senha: text})}
                      />
                    </View>
                  </View>
                  <View style={styleModal.boxActions}>
                    <TouchableOpacity style={{paddingBottom: 10}}>
                      <ButtonCustom
                        navegar={this.atualizaCodigo}
                        textButton={'VALIDAR'}
                        btnColor={'#007F0B'}
                        textColor={'#F3F3F3'}
                        borderColor={'#007F0B'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.setState({modalSenha: false})}
                      style={{paddingBottom: 10, alignSelf: 'center'}}>
                      <Text style={styleModal.estiloTexto}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <ModalTriplo
              ConteudoTextoModal={
                'O estabelecimento escolhido já não tem dinheiro disponível. Deseja procurar outro local?'
              }
              TextoBotãoFechar={'CANCELAR'}
              TextoBotãoFunção={'OUTRO LOCAL'}
              TamanhoDoTexto={18}
              CorBotãoFechar={'#707070'}
              CorBotãoFunção={'#007F0B'}
              isModalVisible={this.state.modalMsg}
              Fechar={() => this.cancelarSaque()}
              Função={() => this.buscaNovaEmpresa()}
            />

            <ModalDefault
              openModal={this.state.exibirModalErro}
              closeModal={this.closeModalErro}
              MsgErro={this.state.MsgErro}
              tipoModal={'erro'}
            />
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {
    client,
  };
};

const mapDispatchToProps = dispatch => ({
  setMesageToast: msg => dispatch(setMsgToast(msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodigoSaque);
