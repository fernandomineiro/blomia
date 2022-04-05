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

import styles from './styles';

class DepositoBoletoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleModalWelcome: true,
      isVisibleCadastroEndereco: false,
      value: '0,00',
      valorboleto: 2,
      spinner: false,
      showValueInvalid: false,
      modalCoastVisibility: false,
    };
  }

  calcularValorBoleto = async () => {
    await api
      .get('/requisition_settings/user/expenses?requisition_type=4')
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
        isVisibleModalWelcome: true,
        isVisibleCadastroEndereco: false,
        value: '0,00',
        valorboleto: 2,
        showValueInvalid: false,
        spinner: true,
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

  verificaEndereco = async () => {
    // Verficando endereço
    this.setState({spinner: true});
    await api
      .get('/address/check_address')
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({
          isVisibleCadastroEndereco: response.data['address_empty?'],
          spinner: false,
        });
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
        this.setState({
          isVisibleCadastroEndereco: error.response.data['address_empty?'],
          spinner: false,
        });
      });
    this.setState({isVisibleModalWelcome: false});
  };

  gerarBoleto = async () => {
    this.setState({showValueInvalid: false});


    if (this.state.value === '000' || this.state.value === '0,00') {
      this.setState({showValueInvalid: true, spinner: false});
      return;
    }

    const coastValue = Number(this.removeMascara(this.state.valorboleto));
    const requisitionValue = Number(this.removeMascara(this.state.value));

    this.props.navigation.navigate('ConfirmationDepositBankSplitClient',{
      coastValue,
      requisitionValue,
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
        {this.state.isVisibleModalWelcome ? (
          <ScrollView style={styles.scrollModal}>
            <View style={{margin: 0, padding: 0}}>
              <View style={styles.containerModal}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('depositoCliente')}>
                    <Image
                      style={styles.imgBackModal}
                      source={arrowLeft}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  style={styles.imgLogoModal}
                  source={logoImg}
                  resizeMode="stretch"
                />
                <Image
                  style={styles.imgWelcomeDiasModal}
                  source={welcomeBoletoUsuarioImg}
                  resizeMode="stretch"
                />
                <View style={styles.contentModal}>
                  <Text style={styles.textModalNegrito}>
                    Devido ao tempo de processamento de boletos a
                    disponibilização pode levar até 3 dias úteis.
                  </Text>
                  <Text style={styles.textModal}>
                    Este é o tempo médio que os bancos levam para nos enviar as
                    informações do seu pagamento.
                  </Text>
                </View>
                <View style={styles.containerBottom}>
                  <ButtonCustom
                    rippleCentered={true}
                    navegar={async () => {
                      await this.verificaEndereco();
                    }}
                    textButton={'CONTINUAR'}
                    btnColor={'#007F0B'}
                    textColor={'white'}
                    borderColor={'#007f0b'}
                    styleCustom={{marginBottom: 30}}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        ) : this.state.isVisibleCadastroEndereco ? (
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
              coastValue={Number(this.removeMascara(this.state.valorboleto))}
              requisitionValue={Number(this.removeMascara(this.state.value))}
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
