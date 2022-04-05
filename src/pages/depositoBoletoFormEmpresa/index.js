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
import arrowLeft from '../../assets/images/arrow-left.png';
import logoImg from '../../assets/images/blomialogo.png';
import welcomeBoletoUsuarioImgMd2 from '../../assets/images/welcomeBoletoUsuario.png';
import welcomeBoletoUsuarioImgMd1 from '../../assets/images/mobile-banking.png';

import ModalCoast from '../../components/ModalCoast';
import InputCurrency from '../../components/InputCurrency';
import styles from './styles';

class DepositoBoletoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleModalWelcome1: true,
      isVisibleModalWelcome2: false,
      isVisibleCadastroEndereco: false,
      value: '0,00',
      valorboleto: 2,
      spinner: false,
      showValueInvalid: false,
    };
  }

  calcularValorBoleto = async () => {
    await api
      .get(`/requisition_settings/user/expenses?company_id=${this.props.client.company.id}&requisition_type=4`)
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
        isVisibleModalWelcome1: true,
        isVisibleModalWelcome2: false,
        isVisibleCadastroEndereco: false,
        value: '0,00',
        valorboleto: 2,
        spinner: true,
        showValueInvalid: false,
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

    const coastValue = Number(this.removeMascara(this.state.valorboleto));
    const requisitionValue = Number(this.removeMascara(this.state.value));

    this.props.navigation.navigate('ConfirmationDepositBankSplitCompany',{
      coastValue,
      requisitionValue,
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Spinner visible={this.state.spinner} color="white" />
        <Modal
          isVisible={this.state.isVisibleModalWelcome1}
          style={{margin: 0, padding: 0}}
          animationIn="slideInRight"
          animationOut="slideOutLeft"
          transparent={false}>
          <View style={styles.containerModal}>
            <View
              style={{
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isVisibleModalWelcome1: false,
                    isVisibleModalWelcome2: false,
                  });
                  navigation.goBack();
                }}>
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
            <Text style={styles.textModalNegrito}>Boleto Empresa</Text>
            <Image
              style={styles.imgWelcomeDiasModal1}
              source={welcomeBoletoUsuarioImgMd1}
              resizeMode="stretch"
            />
            <View style={styles.contentModal1}>
              <Text style={styles.textModalNegrito}>
                O boleto empresa é o meio pelo qual você irá depositar dinheiro
                no Blomia da sua empresa
              </Text>
              <Text style={styles.textModal}>
                Basta gerar o boleto no valor que deseja depositar, pagar o
                boleto e o dinheiro ficará automaticamente disponível no perfil
              </Text>
            </View>
            <View style={styles.containerBottom}>
              <ButtonCustom
                rippleCentered={true}
                navegar={() => {
                  this.setState({
                    isVisibleModalWelcome1: false,
                    isVisibleModalWelcome2: true,
                  });
                }}
                textButton={'CONTINUAR'}
                btnColor={'#007F0B'}
                textColor={'white'}
                borderColor={'#007f0b'}
                styleCustom={{marginBottom: 30}}
              />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isVisibleModalWelcome2}
          style={{margin: 0, padding: 0}}
          animationIn="slideInRight"
          animationOut="slideOutLeft"
          transparent={false}>
          <View style={styles.containerModal}>
            <View
              style={{
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isVisibleModalWelcome1: true,
                    isVisibleModalWelcome2: false,
                  });
                }}>
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
              source={welcomeBoletoUsuarioImgMd2}
              resizeMode="stretch"
            />
            <View style={styles.contentModal}>
              <Text style={styles.textModalNegrito}>
                Devido ao tempo de processamento de boletos a disponibilização
                pode levar até 3 dias úteis.
              </Text>
              <Text style={styles.textModal}>
                Este é o tempo médio que os bancos levam para nos enviar as
                informações do seu pagamento.
              </Text>
            </View>
            <View style={styles.containerBottom}>
              <ButtonCustom
                rippleCentered={true}
                navegar={() => {
                  this.setState({
                    isVisibleModalWelcome2: false,
                  });
                }}
                textButton={'CONTINUAR'}
                btnColor={'#007F0B'}
                textColor={'white'}
                borderColor={'#007f0b'}
                styleCustom={{marginBottom: 30}}
              />
            </View>
          </View>
        </Modal>
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
                  <Icon name="info" size={20} color="#007f0b" />
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
