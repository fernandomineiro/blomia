import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';

import Spinner from 'react-native-loading-spinner-overlay';

import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import api from '../../config/api';
import {currencyFormat} from '../../utils/funcoes';

// Imagens
import arrowLeft from '../../assets/images/arrow-left.png';
import logoImg from '../../assets/images/blomialogo.png';
import welcomeBoletoUsuarioImg from '../../assets/images/welcomeBoletoUsuario.png';

import CadastroEndereco from '../cadastroEndereco/cadastroEndereco';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';
import InputCurrency from '../../components/InputCurrency';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ModalCoast from '../../components/ModalCoast';
import ModalOpeningHours from '../../components/ModalOpenigHours';

import styles from './styles';

class DepositoBoletoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleCadastroEndereco: false,
      value: '0,00',
      valorboleto: 2,
      spinner: false,
      showValueInvalid: false,
      modalCoastVisibility: false,
      modalOpeningHoursVisibility: false,
    };
  }

  calcularValorBoleto = async () => {
    await api
      .get('/requisition_settings/user/expenses?requisition_type=19')
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


      this.setState({
        isVisibleCadastroEndereco: false,
        value: '0,00',
        valorboleto: 2,
        showValueInvalid: false,
        spinner: true,
        modalCoastVisibility: false,
        modalOpeningHoursVisibility: false,
      });

      await this.calcularValorBoleto();
      await this.verificaEndereco();
      this.setState({spinner: false});
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
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

  verificaEndereco = async () => {
    // Verficando endereço
    await api
      .get('/address/check_address')
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({
          isVisibleCadastroEndereco: response.data['address_empty?'],
        });
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
        this.setState({
          isVisibleCadastroEndereco: error.response.data['address_empty?'],
        });
      });
  };

  gerarBoleto = async () => {
    this.setState({showValueInvalid: false});


    if (this.state.value === '000' || this.state.value === '0,00') {
      this.setState({showValueInvalid: true, spinner: false});
      return;
    }

    const coastValue = Number(this.state.valorboleto);
    const requisitionValue = Number(this.removeMascara(this.state.value));

    this.props.navigation.navigate('ConfirmationDepositBankSplitClient',{
      coastValue,
      requisitionValue,
      fast: true,
    });

  };

  modal() {
    this.setState({exibirModal: true});
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.scrollModal}>
        <Spinner visible={this.state.spinner} color="white" />
        {this.state.isVisibleCadastroEndereco ? (
          <View style={styles.conteinerTransferencia}>
            <CadastroEndereco
              type={'usuário'}
              success={() => this.setState({isVisibleCadastroEndereco: false})}
              navigation={this.props.navigation}
              title="Depósito por boleto"
              showMenuDrawer
            />
          </View>
        ) : (
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
                      <IconFeather name="info" size={20} color="#007f0b" />
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
                      <IconFeather name="info" size={20} color="#007f0b" />
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
        )}
      </SafeAreaView>
    );
  }
}

export default DepositoBoletoScreen;
