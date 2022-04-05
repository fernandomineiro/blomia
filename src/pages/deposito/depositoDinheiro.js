import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {TextInputMask} from 'react-native-masked-text';
import Modal from 'react-native-modal';
import IconFeather from 'react-native-vector-icons/Feather';
import ModalCoast from '../../components/ModalCoast';


import ModalDrawerInferior from '../../components/ModalDrawerInferior/ModalDrawerInferior.js';
import styles from './stylesDinheiro';
import Toast from 'react-native-simple-toast';
import api from '../../config/api';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import Spinner from 'react-native-loading-spinner-overlay';
import InputCurrency from '../../components/InputCurrency';

//REDUX
import {connect} from 'react-redux';
import Balance from '../../components/Balance';
class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: true,
      isModalVisible: false,
      value: '0,00',
      inputColor: 'gray',
      msgErro: null,
      showModal: false,
      cliente: false,
      reRender: false,
      transacoesGratuitas: 0,
      valorCustoDeposito: 0,
      carregamentoTela: true,
      spinner: false,
      modalCoastVisibility: false,
    };
  }

  buscaTransacoesGratuitas = async () => {
    await api
      .get('/free_requisition')
      .then(async response => {
        this.setState({transacoesGratuitas: response.data.quantity});
      })
      .catch(async error => {});
  }

  toggleModalTriplo = () => {
    this.setState({showModal: !this.state.showModal});
  };

  exibiErro = (msg) => {
    Toast.show(msg, Toast.SHORT);
  }

  removeMascara = (valor) => {
    valor = valor.replace('R$', '');
    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');
    return valor;
  }

  checkSaldoSaque = () => {
    this.props.navigation.navigate('empresaTranscaoClientPg', {
      valor: this.state.value,
      operacao: 2,
    });
  }

  geraRecibo = () => {
    this.setState({reRender: true});
  }

  calcularValorDeposito = async () => {
    await api
      .get('/requisition_settings/user/expenses?requisition_type=2')
      .then(async response => {
        this.setState({
          valorCustoDeposito: response.data[0].fee,
        });
      })
      .catch(async error => {});
  };

  resetTela = async () => {
    if (!this.state.carregamentoTela || !this.state.spinner) {
      this.setState({carregamentoTela: true, spinner: true});
    }

    await this.calcularValorDeposito();
    await this.buscaTransacoesGratuitas();

    this.setState({carregamentoTela: false, spinner: false});
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.setState({
        shouldRender: true,
        isModalVisible: false,
        value: '0,00',
        inputColor: 'gray',
        msgErro: null,
        showModal: false,
        cliente: false,
        reRender: false,
        transacoesGratuitas: 0,
        valorCustoDeposito: 0,
        carregamentoTela: true,
        spinner: false,
        modalCoastVisibility: false,
      });

      await this.resetTela();
    });

    // await this.resetTela();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView keyboardShouldPersistTaps="handled">
        <Spinner visible={this.state.spinner} color="white" />
        {!this.state.carregamentoTela && (
          <>
            <CustomHeader
              title="Setting"
              isHome={false}
              navigation={this.props.navigation}
            />

            <ModalCoast
              isVisible={this.state.modalCoastVisibility}
              handleClose={() =>
                this.setState({ modalCoastVisibility: false })
              }
              coastValue={
                this.state.transacoesGratuitas > 0
                  ? 0
                  : Number(this.removeMascara(this.state.valorCustoDeposito))
              }
              requisitionValue={Number(this.removeMascara(this.state.value))}
            />

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
                  <Text style={styles.textTitlePage}>Depósito em dinheiro</Text>
                  <Text style={styles.textDescription}>
                    Informe o valor que deseja depositar:
                  </Text>
                  <View style={styles.input}>
                    <InputCurrency
                      valueInput={this.state.value}
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
                          (this.state.transacoesGratuitas > 0
                          ? 0
                          : Number(this.removeMascara(this.state.valorCustoDeposito))) +
                          Number(this.removeMascara(this.state.value))
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
                    this.state.value == '000' || this.state.value == '0,00'
                      ? [styles.gpsButtonStyle, {backgroundColor: 'gray'}]
                      : styles.gpsButtonStyle
                  }
                  onPress={
                    this.state.value == '000' || this.state.value == '0,00'
                      ? () => this.exibiErro('Favor informa o valor.')
                      : () => this.checkSaldoSaque()
                  }>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(2),
                    }}>
                    CONTINUAR
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {
    client,
  };
};

// export default Withdraw
export default connect(
  mapStateToProps,
  null,
)(Withdraw);
