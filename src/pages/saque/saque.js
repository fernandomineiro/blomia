import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import IconFeather from 'react-native-vector-icons/Feather';

import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import api from '../../config/api';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import Balance from '../../components/Balance';
import InputCurrency from '../../components/InputCurrency';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ModalCoast from '../../components/ModalCoast';

class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      value: '0,00',
      showModal: false,
      showModalAndamento: false,
      saqueSugerido: null,
      taxa: null,
      spinner: false,
      valorCustoSaque: 0,
      carregamentoTela: true,
      transacoesGratuitas: 0,
      primeiroSaque: false,
      modalCoastVisibility: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({ spinner: true, carregamentoTela: true });
      await this.setState({
        isModalVisible: false,
        value: '0,00',
        showModal: false,
        showModalAndamento: false,
        showModalPrimeiroDeposito: false,
        saqueSugerido: null,
        taxa: null,
        primeiroSaque: false,
        modalCoastVisibility: false,
        valorCustoSaque: 0,
      });
      await this.checkTransacaoAberta();

      const { showModalAndamento, primeiroSaque } = this.state;
      if (!showModalAndamento) {
        await this.calcularValorSaque();
        await this.buscaTransacoesGratuitas();
        // await this.checkPrimeiroSaque();
        this.setState({ spinner: false, carregamentoTela: false });
      } else {
        this.setState({ spinner: false });
      }
      if (primeiroSaque) {
        navigation.navigate('DocumentOrientationUserClient');
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  exibiErro(msg) {
    Toast.show(msg, Toast.SHORT);
  }

  removeMascara(valor) {
    valor = valor.replace('R$', '');
    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');
    return valor;
  }

  toggleModal() {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  }

  toggleModalTriplo() {
    const { showModal } = this.state;

    this.setState({ showModal: !showModal });
  }

  async buscaTransacoesGratuitas() {
    await api.get('/free_requisition').then(async response => {
      this.setState({ transacoesGratuitas: response.data.quantity });
    });
  }

  toggleModalTriploPrimeiroDeposito() {
    const { showModalPrimeiroDeposito } = this.state;
    this.setState({
      showModalPrimeiroDeposito: !showModalPrimeiroDeposito,
    });
  }

  async calcularValorSaque() {
    await api
      .get('/requisition_settings/user/expenses?requisition_type=1')
      .then(async response => {
        this.setState({
          valorCustoSaque: response.data[0].fee,
        });
      });
  }

  async checkPrimeiroSaque() {
    await api
      .get('/in_cash_requisitions/first_withdrawal')
      .then(async response => {
        const firstWithdrawal = response.data.first_withdrawal[0];
        // const solicitarDoc = await AsyncStorage.getItem('solicitarDoc');

        if (
          firstWithdrawal.message &&
          firstWithdrawal.message['has_one_withdrawal?'] === true &&
          firstWithdrawal.message['personal_document_is_empty?'] === true
        ) {
          // Se cair nessa condição vai responder true para abir tele de solicitação de foto
          this.setState({ primeiroSaque: true });
        } else {
          this.setState({ primeiroSaque: false });
        }
      });
  }

  async checkTransacaoAberta() {
    await api.get('/in_cash_requisitions/status').then(async response => {
      if (response.data && response.data[0]) {
        await AsyncStorage.setItem(
          'idSaque',
          JSON.stringify(response.data[0].id),
        );

        this.setState({
          showModalAndamento: true,
        });
      }
      // if (response.data['has_requisition?'] === false) {
      //   this.setState({
      //     showModalPrimeiroDeposito: true,
      //   });
      // }
    });
  }

  async checkSaldoSaque() {
    const { navigation } = this.props;
    const { value, transacoesGratuitas } = this.state;

    const valueWithoutMask = this.removeMascara(value);
    if (transacoesGratuitas > 0) {
      navigation.navigate('empresaTranscaoClientPg', {
        valor: value,
        operacao: 1,
      });
    } else {
      this.setState({ spinner: true });
      await api
        .get(`/check_balance?value=${valueWithoutMask}&requisition_type=1`)
        .then(async response => {
          this.setState({ spinner: false });
          // Atualiza tokens para proxima requisição

          if (response.data.message[0].detail === 'Balance available') {
            // this.props.navigation.navigate('empresaTranscaoClientPg', { valorSaque: this.state.value })
            navigation.navigate('empresaTranscaoClientPg', {
              valor: value,
              operacao: 1,
            });
          }
        })
        .catch(async error => {
          this.setState({ spinner: false });
          // Atualiza tokens para proxima requisição

          if (
            error.response.data.message[0].detail ===
            'Not enough balance available'
          ) {
            this.exibiErro('SALDO INSUFICIENTE');
            // this.props.navigation.navigate('empresaTranscaoClientPg', { valorSaque: this.state.value }
          }

          if (error.response.data.message[0].available_value) {
            const novoValor = error.response.data.message[0].available_value;
            // novoValor = novoValor.toLocaleString('pt-br', {
            //   minimumFractionDigits: 2,
            // });
            const taxa = error.response.data.message[0].cost.toLocaleString(
              'pt-br',
              { minimumFractionDigits: 2 },
            );
            // novoValor = novoValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            await this.setState({
              value: String(novoValor),
              saqueSugerido: novoValor,
              taxa,
            });
            this.toggleModalTriplo();
          }
        });
    }
  }

  render() {
    const { navigation } = this.props;
    const {
      spinner,
      showModalAndamento,
      carregamentoTela,
      showModal,
      showModalPrimeiroDeposito,
      taxa,
      saqueSugerido,
      valorCustoSaque,
      value,
      isModalVisible,
      modalCoastVisibility,
      transacoesGratuitas,
    } = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner visible={spinner} color="white" />
          <ModalTriplo
            ConteudoTextoModal="Você já possui saque ou depósito em andamento."
            TextoBotãoFechar="FECHAR"
            TextoBotãoFunção="MOSTRAR"
            TamanhoDoTexto={18}
            CorBotãoFechar="#707070"
            CorBotãoFunção="#007F0B"
            isModalVisible={showModalAndamento}
            Fechar={() => {
              this.setState({ showModalAndamento: false });
              navigation.navigate('inicioCliente');
            }}
            Função={() => navigation.navigate('CodigoSaque')}
          />
          {!carregamentoTela && (
            <>
              <ModalCoast
                isVisible={modalCoastVisibility}
                handleClose={() =>
                  this.setState({ modalCoastVisibility: false })
                }
                coastValue={
                  transacoesGratuitas > 0
                    ? 0
                    : Number(this.removeMascara(valorCustoSaque))
                }
                requisitionValue={Number(this.removeMascara(value))}
              />
              <ModalTriplo
                ConteudoTextoModal={`Você está tentando sacar todo dinheiro disponível, mas precisa deixar R$ ${taxa} do custo do saque.\n\n Deseja sacar R$${saqueSugerido}?`}
                TextoBotãoFechar=""
                TextoBotãoFunção="CONTINUAR"
                TamanhoDoTexto={18}
                CorBotãoFechar="#707070"
                CorBotãoFunção="#007F0B"
                isModalVisible={showModal}
                Fechar=""
                Função={() => this.toggleModalTriplo()}
              />

              <ModalTriplo
                ConteudoTextoModal="A opção de saque já está disponível, faça seu primeiro depósito."
                TextoBotãoFechar="FECHAR"
                TextoBotãoFunção="IR PARA DEPÓSITO"
                TamanhoDoTexto={18}
                CorBotãoFechar="#707070"
                CorBotãoFunção="#007F0B"
                isModalVisible={showModalPrimeiroDeposito}
                Fechar={() => {
                  this.setState({
                    showModalPrimeiroDeposito: false,
                  });
                  navigation.navigate('inicioCliente');
                }}
                Função={() => {
                  this.setState({
                    showModalPrimeiroDeposito: false,
                  });
                  navigation.navigate('depositoCliente');
                }}
              />
              <CustomHeader title="Setting" isHome navigation={navigation} />
              <View style={styles.container}>
                <View style={styles.header}>
                  <Balance />
                </View>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                  enabled
                >
                  <View style={styles.content}>
                    <Text style={styles.textTitlePage}>Saque</Text>
                    <Text style={styles.textDescription}>
                      Informe o valor que deseja sacar:
                    </Text>
                    <View style={styles.input}>
                      <InputCurrency
                        valueInput={value}
                        label="Valor"
                        onChangeText={text => this.setState({ value: text })}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.containerValorCusto}
                      onPress={() =>
                        this.setState({ modalCoastVisibility: true })
                      }
                    >
                      <Text style={styles.labelCusto}>
                        Valor total:
                        <Text style={styles.valorCusto}>
                          {` R$${(
                            (transacoesGratuitas > 0
                              ? 0
                              : Number(this.removeMascara(valorCustoSaque))) +
                            Number(this.removeMascara(value))
                          ).toFixed(2)}`}
                        </Text>
                      </Text>
                      <IconFeather name="info" size={20} color="#007f0b" />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={
                      value === '000' || value === '0,00'
                        ? [styles.gpsButtonStyle, { backgroundColor: 'gray' }]
                        : styles.gpsButtonStyle
                    }
                    onPress={
                      value === '000' || value === '0,00'
                        ? () => this.exibiErro('Favor informar o valor.')
                        : () => this.checkSaldoSaque()
                    }
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
              <Modal isVisible={isModalVisible}>
                <View style={styles.contentModal}>
                  <View style={{ flex: 0.4 }}>
                    <Text style={styles.textContentModal0}>
                      Para continuar, ative o GPS (localização) do seu celular.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', top: 20, flex: 0.3 }}>
                    <View style={{ marginRight: 60, alignItems: 'center' }}>
                      <TouchableOpacity onPress={this.toggleModal}>
                        <Text style={styles.textContentModal1}>CANCELAR</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={this.funcModal}>
                        <Text style={styles.textContentModal2}>ATIVAR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ client }) => {
  return {
    client,
  };
};
// export default Withdraw
export default connect(mapStateToProps)(Withdraw);
