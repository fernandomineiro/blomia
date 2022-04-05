import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton } from 'react-native-gesture-handler';

import IconOctions from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';
import api from '../../config/api';

import styles from './styles';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import Balance from '../../components/Balance';
import TipApresentation from '../../components/TipApresentation';

class DepositoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgModal: '',
      navegacaoModal: '',
      spinner: false,
      showModal: false,
      carregamentoPagina: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      if (!this.state.carregamentoPagina || !this.state.spinner) {
        this.setState({ carregamentoPagina: true, spinner: true });
      }
      this.setState({ carregamentoPagina: false, spinner: false });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  verificaBoletoEmAberto = async () => {
    this.setState({spinner: true});
    await api
      .get('/bank_split/status')
      .then(async response => {
        // Atualiza tokens para proxima requisição
        this.setState({spinner: false});

        if (!response.data.id) {
          this.props.navigation.navigate('DepositoBoletoCliente');
        } else {
          this.setState({
            navegacaoModal: 'ResumoBoletoCliente',
            msgModal: 'Você já possui boleto em aberto.',
          });
        }
      })
      .catch(async error => {
        this.setState({spinner: false});
        this.props.navigation.navigate('DepositoBoletoCliente');
      });
  }

  checkTransacaoDinheiroAberta = async () => {
    this.setState({spinner: true});
    await api
      .get('/in_cash_requisitions/status')
      .then(async response => {
        this.setState({spinner: false});
        if (response.data && response.data[0]) {
          await AsyncStorage.setItem(
            'idSaque',
            JSON.stringify(response.data[0].id),
          );

          this.setState({ showModal: true });
        } else {
          this.props.navigation.navigate('DepositoDinheiroCliente');
        }
      })
      .catch(async error => {
        this.setState({spinner: false});
        // Atualiza tokens para proxima requisição
      });
  }

  async verificaCartaoEmAberto() {
    this.props.navigation.navigate('DepositoCartaoCliente');
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ModalTriplo
          ConteudoTextoModal="Você já possui saque ou depósito em andamento."
          TextoBotãoFechar="FECHAR"
          TextoBotãoFunção="MOSTRAR"
          TamanhoDoTexto={18}
          CorBotãoFechar="#707070"
          CorBotãoFunção="#007F0B"
          isModalVisible={this.state.showModal}
          Fechar={() => {
            this.setState({ showModal: false });
          }}
          Função={() => navigation.navigate('CodigoSaque')}
        />
        <Spinner visible={this.state.spinner} color="white" />
        {!this.state.carregamentoPagina && (
          <>
            <CustomHeader title="Home" isHome navigation={navigation} />
            <View style={styles.header}>
              <Balance />
            </View>
            <View style={styles.containerBotoes}>
              <Text style={styles.tituloPagina}>Como deseja depositar?</Text>
              <View style={styles.botao}>
                <RectButton
                  style={styles.touchableBox}
                  onPress={this.checkTransacaoDinheiroAberta}
                >
                  <IconOctions name="primitive-dot" color="#007f0b" size={24} />
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.titleButton}>Em dinheiro</Text>
                  </View>
                  <IconFeather name="chevron-right" color="#B3B3B3" size={24} />
                </RectButton>
              </View>
              <View style={styles.botao}>
                <RectButton
                  style={styles.touchableBox}
                  onPress={() => this.props.navigation.navigate('DepositoCartaoCliente', {time: Date.now() })}
                >
                  <IconOctions name="primitive-dot" color="#007f0b" size={24} />
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.titleButton}>Com Cartão de Crédito</Text>
                    <TipApresentation>Novo!</TipApresentation>
                  </View>
                  <IconFeather name="chevron-right" color="#B3B3B3" size={24} />
                </RectButton>
              </View>
              <View style={styles.botao}>
                <RectButton
                  style={styles.touchableBox}
                  onPress={this.verificaBoletoEmAberto}
                >
                  <IconOctions name="primitive-dot" color="#007f0b" size={24} />
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.titleButton}>Por boleto</Text>
                    <TipApresentation>Novidades!</TipApresentation>
                  </View>
                  <IconFeather name="chevron-right" color="#B3B3B3" size={24} />
                </RectButton>
              </View>
            </View>

            <ModalTriplo
              ConteudoTextoModal={this.state.msgModal}
              TextoBotãoFechar="FECHAR"
              TextoBotãoFunção="MOSTRAR"
              TamanhoDoTexto={18}
              CorBotãoFechar="#707070"
              CorBotãoFunção="#007F0B"
              isModalVisible={!!this.state.msgModal}
              Fechar={() => this.setState({ msgModal: '' })}
              Função={() => {
                if (this.state.navegacaoModal !== '') {
                  this.setState({ msgModal: '' });
                  this.props.navigation.navigate(this.state.navegacaoModal);
                } else {
                  this.setState({ msgModal: '' });
                }
              }}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
}

export default DepositoScreen;
