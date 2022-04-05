import React from 'react';
import {View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import IconFeather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import Balance from '../../components/Balance';
import ModalCoast from '../../components/ModalCoast';
import InputCurrency from '../../components/InputCurrency';

import api from '../../config/api';

import styles from './stylesTransferencia';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

class TedEmpresaTransferencia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saldo: 0,
      conta: null,
      value: '0,00',
      showModalSenha: false,
      exibirModal: false,
      valorCustoTransferencia: 0,
      msgErro: [''],
      spinner: true,
      modalCoastVisibility: false,
    };
  }

  calcularValorTransferencia = async () => {
    await api
      .get('/requisition_settings/company/expenses?requisition_type=5')
      .then(async response => {
        this.setState({
          valorCustoTransferencia: this.removeMascara(response.data[0].fee),
        });
      })
      .catch(async error => {});
  };

  handleFromReceive = async () => {
    if (this.state.value === '0,00') {
      this.setState({
        msgErro: ['Favor informar o valor que deseja enviar.'],
      });
      this.openModal();

    } else {
      this.setState({spinner: true});

      const requisitionValue = this.removeMascara(this.state.value);
      const coastValue = this.removeMascara(this.state.valorCustoTransferencia);
      api
      .get(`/bank_accounts?company_id=${this.props.client.company.id}`)
      .then(response => {
        this.setState({spinner: false});

        if (!Array.isArray(response.data)) {
          this.props.navigation.navigate('tedEmpresaCadastro', {requisitionValue, coastValue});
        } else {
          this.props.navigation.navigate('tedEmpresaListaContas', {requisitionValue, coastValue});
        }
      })
      .catch(() => {
        this.setState({spinner: false});
        this.props.navigation.navigate('tedEmpresaCadastro', {requisitionValue, coastValue});


        //Grava chave para a proxima autenticação na API
      });

    }
  };

  resetPage = async () => {
    await this.setState({
      saldo: 0,
      conta: null,
      value: '0,00',
      showModalSenha: false,
      exibirModal: false,
      valorCustoTransferencia: 0,
      msgErro: [''],
      spinner: true,
      modalCoastVisibility: false,
    });

    await this.calcularValorTransferencia();


    this.setState({spinner: false});
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.resetPage();
    });

  }

  removeMascara(valor) {
    return Number(
      String(valor)
        .replace('.', '')
        .replace('R$', '')
        .replace(',', '.'),
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner visible={this.state.spinner} color="white" />
          <ModalDefault
            openModal={this.state.exibirModal}
            closeModal={this.closeModal}
            MsgErro={this.state.msgErro}
            tipoModal={'erro'}
          />
          <ModalCoast
            isVisible={this.state.modalCoastVisibility}
            handleClose={() =>
              this.setState({ modalCoastVisibility: false })
            }
            coastValue={Number(this.removeMascara(this.state.valorCustoTransferencia))}
            requisitionValue={Number(this.removeMascara(this.state.value))}
          />
          <CustomHeader title="Setting" isHome={false} navigation={navigation} />
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
                <Text style={styles.textTitlePage}>Movimentação bancária</Text>
                <Text style={styles.textDescription}>
                  Informe o valor que  deseja enviar:
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
                        Number(this.removeMascara(this.state.valorCustoTransferencia)) +
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
                  this.state.value === '000' || this.state.value === '0,00'
                    ? [styles.gpsButtonStyle, { backgroundColor: 'gray' }]
                    : styles.gpsButtonStyle
                }
                onPress={this.handleFromReceive}
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
        </ScrollView>
      </SafeAreaView>


    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(TedEmpresaTransferencia);
