import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {TextInputMask as TextInputValue} from 'react-native-masked-text';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import api from '../../config/api';
import {currencyFormat} from '../../utils/funcoes';
import Balance from '../../components/Balance';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

// Imagens
import ModalOpeningHours from '../../components/ModalOpenigHours';

import ModalCoast from '../../components/ModalCoast';
import InputCurrency from '../../components/InputCurrency';
import styles from './styles';

class DepositoBoletoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleCadastroEndereco: false,
      value: '0,00',
      valorboleto: 2.5,
      spinner: false,
      showValueInvalid: false,
      modalCoastVisibility: false,
      modalOpeningHoursVisibility: false,
    };
  }

  calcularValorBoleto = async () => {
    await api
      .get(`/requisition_settings/user/expenses?company_id=${this.props.client.company.id}&requisition_type=19`)
      .then(async response => {
        this.setState({
          valorboleto: this.removeMascara(response.data[0].fee),
        });
      })
      .catch(async error => {});
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.setState({
        isVisibleCadastroEndereco: false,
        value: '0,00',
        valorboleto: 2,
        spinner: true,
        showValueInvalid: false,
        modalOpeningHoursVisibility: false,
        modalCoastVisibility: false,
      });

      await this.calcularValorBoleto();

      this.setState({spinner: false});
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.setState({isVisibleModalWelcome: false});
  }

  removeMascaraCep(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  removeMascara(valor) {
    return Number(
      String(valor)
        .replace('.', '')
        .replace('R$', '')
        .replace(',', '.'),
    );
  }

  gerarBoleto = async () => {
    this.setState({showValueInvalid: false});

    if (this.state.value === '000' || this.state.value === '0,00') {
      this.setState({showValueInvalid: true, spinner: false});
      return;
    }

    const coastValue = Number(this.state.valorboleto);
    const requisitionValue = Number(this.removeMascara(this.state.value));

    this.props.navigation.navigate('ConfirmationDepositBankSplitCompany',{
      coastValue,
      requisitionValue,
      fast: true,
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Spinner visible={this.state.spinner} color="white" />
        <ScrollView keyboardShouldPersistTaps="handled">
          <ModalCoast
            isVisible={this.state.modalCoastVisibility}
            handleClose={() =>
              this.setState({ modalCoastVisibility: false })
            }
            coastValue={Number(this.state.valorboleto)}
            requisitionValue={Number(this.removeMascara(this.state.value))}
          />
          <ModalOpeningHours
            isVisible={this.state.modalOpeningHoursVisibility}
            handleClose={() => this.setState({modalOpeningHoursVisibility: false})}
          />
          <CustomHeader title="Home" navigation={this.props.navigation} />
          <View style={styles.conteinerTransferencia}>
            <View style={styles.header}>
              <Balance />
            </View>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              enabled
            >
              <View style={styles.content}>
                <Text style={styles.textTitlePage}>Depósito por boleto</Text>
                <Text style={styles.textDescription}>
                  Informe o valor que  deseja depositar:
                </Text>
                <View style={styles.input}>
                  <InputCurrency
                    valueInput={this.state.value}
                    label="Valor"
                    onChangeText={text => this.setState({ value: text })}
                  />
                </View>
                <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
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
                          this.state.valorboleto +
                          Number(this.removeMascara(this.state.value))
                        ).toFixed(2)}`}
                      </Text>
                    </Text>
                    <Icon name="info" size={20} color="#007f0b" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.containerValorCusto}
                    onPress={() =>
                      this.setState({ modalOpeningHoursVisibility: true })
                    }
                  >
                    <Text style={styles.labelCusto}>
                      Horários
                    </Text>
                    <Icon name="info" size={20} color="#007f0b" />
                  </TouchableOpacity>
                </View>
                {this.state.showValueInvalid && (
                  <View>
                    <Text style={styles.labelValor}>
                      O boleto deve possuir valor maior que zero.
                    </Text>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
              <TouchableOpacity
                style={
                  this.state.value === '000' || this.state.value === '0,00'
                    ? [styles.gpsButtonStyle, { backgroundColor: 'gray' }]
                    : styles.gpsButtonStyle
                }
                onPress={this.gerarBoleto}
              >
                <Text
                  style={styles.textGpsButtonStyle}
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

export default connect(mapStateToProps)(DepositoBoletoScreen);
