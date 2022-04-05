import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {RectButton} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import api from '../../config/api';

import styles from './styles';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';

class MenuEmpresa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saldo: 0,
      msgModal: '',
      navegacaoModal: '',
      spinner: false,
      carregamentoPagina: false,
    };
  }

  verificaBoletoAberto = async () => {
    await api
      .get(`/bank_split/status?company_id=${this.props.client.company.id}`)
      .then(async response => {
        //Atualiza tokens para proxima requisição

        if (!response.data.id) {
          this.props.navigation.navigate('depositoBoletoEmpresa');
        } else {
          this.setState({
            navegacaoModal: 'resumoBoletoEmpresa',
            msgModal: 'Você já possui boleto em aberto.',
          });
        }
      })
      .catch(async error => {
        this.props.navigation.navigate('depositoBoletoEmpresa');
      });
  };

  verificaTransacaoAberta = async () => {
    this.setState({spinner: true});

    await api
      .get(`requisition/transfer?company_id=${this.props.client.company.id}`)
      .then(async response => {
        this.setState({spinner: false});

        //Atualiza tokens para proxima requisição

        if (response.data.company_transfer) {
          this.setState({
            navegacaoModal: 'tedEmpresaResumo',
            msgModal: 'Você já possui transferência em andamento.',
          });
        } else {
          this.props.navigation.navigate('tedEmpresa');
        }
      })
      .catch(async error => {
        this.setState({spinner: false});
        //Atualiza tokens para proxima requisição
      });
  };

  buscarSaldo = async () => {
    if (!this.state.carregamentoPagina) {
      this.setState({carregamentoPagina: true, spinner: true});
    }
    await api
      .get(`/simple_balance?company_id=${this.props.client.company.id}`)
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({
          saldo: response.data.balance.replace('R$', ''),
          carregamentoPagina: false,
          spinner: false,
        });
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.buscarSaldo();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={this.state.spinner} color="white" />
        {!this.state.carregamentoPagina && (
          <>
            <CustomHeader
              title="Home"
              isHome={true}
              navigation={this.props.navigation}
            />
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Dinheiro disponível R${this.state.saldo}
              </Text>
            </View>
            <View style={styles.containerBotoes}>
              <Text style={styles.tituloPagina}>Minha empresa</Text>
              <View style={styles.botao}>
                <RectButton
                  style={styles.touchableBox}
                  onPress={() => {
                    this.props.navigation.navigate('configEmpresa');
                  }}>
                  <Text style={styles.titleButton}>CONFIGURAÇÃO</Text>
                  <Text style={styles.descriptionButton}>Saque/Depósito</Text>
                </RectButton>
              </View>
              <View style={styles.botao}>
                <RectButton
                  style={styles.touchableBox}
                  onPress={this.verificaBoletoAberto}>
                  <Text style={styles.titleButton}>BOLETO EMPRESA</Text>
                  <Text style={styles.descriptionButton}>Depósito empresa</Text>
                </RectButton>
              </View>
              <View style={styles.botao}>
                <RectButton
                  style={styles.touchableBox}
                  onPress={this.verificaTransacaoAberta}>
                  <Text style={styles.titleButton}>TRANSFÊRENCIA</Text>
                  <Text style={styles.descriptionButton}>Saldo empresa</Text>
                </RectButton>
              </View>
            </View>

            <ModalTriplo
              ConteudoTextoModal={this.state.msgModal}
              TextoBotãoFechar={'FECHAR'}
              TextoBotãoFunção={'MOSTRAR'}
              TamanhoDoTexto={18}
              CorBotãoFechar={'#707070'}
              CorBotãoFunção={'#007F0B'}
              isModalVisible={!!this.state.msgModal}
              Fechar={() => this.setState({msgModal: ''})}
              Função={() => {
                if (this.state.navegacaoModal !== '') {
                  this.setState({msgModal: ''});
                  this.props.navigation.navigate(this.state.navegacaoModal);
                } else {
                  this.setState({msgModal: ''});
                }
              }}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(MenuEmpresa);
