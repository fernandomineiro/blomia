import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles.js';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Row from './Row.js';

import api from '../../config/api';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalTriplo from '../ModalTriplo/ModalTriplo';

const nextIcon = require('../../assets/images/next.png');

export default class ModalDrawerInferior extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      spinner: false,
      msgModalConfir: '',
      navegacaoModalConfir: '',
    };
  }

  redirecionaPagina(pagina) {
    this.props.navigation.navigate(pagina);
    this.props.Fechar();
  }

  checkTransacaoAberta = async () => {
    await api
      .get('/in_cash_requisitions/status')
      .then(async response => {
        if (response.data && response.data[0]) {
          await AsyncStorage.setItem(
            'idSaque',
            JSON.stringify(response.data[0].id),
          );

          this.setState({
            navegacaoModalConfir: 'CodigoSaque',
            msgModalConfir: 'Você já possui saque ou depósito em andamento.',
          });
        } else {
          this.redirecionaPagina('DepositoDinheiroCliente');
        }
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  };

  verificaBoletoAberto = async () => {
    this.setState({spinner: true});
    await api
      .get('/bank_split/status')
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({spinner: false});
        if (!response.data.id) {
          this.redirecionaPagina('DepositoBoletoCliente');
        } else {
          this.setState({
            navegacaoModalConfir: 'ResumoBoletoCliente',
            msgModalConfir: 'Você já possui boleto em aberto.',
          });
        }
      })
      .catch(async error => {
        this.setState({spinner: false});
        this.props.navigation.navigate('DepositoBoletoCliente');
      });
    this.props.Fechar();
  };

  render() {
    return (
      <>
        <Modal
          useNativeDriver={true}
          isVisible={this.props.isModalVisible}
          onSwipeComplete={this.props.Fechar}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          transparent={true}
          onBackdropPress={this.props.Fechar}>
          <Spinner visible={this.state.spinner} color="white" />
          <View style={{flex: 1}} />
          <View style={styles.container}>
            <View
              style={{
                justifyContent: 'center',
                height: '50%',
                backgroundColor: '#ffffff',
              }}>
              <TouchableWithoutFeedback onPress={this.checkTransacaoAberta}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.7,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontFamily: 'Montserrat-Bold',
                        color: '#707070',
                        fontSize: responsiveFontSize(2),
                      }}>
                      EM DINHEIRO
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      flex: 0.3,
                      height: '100%',
                    }}>
                    <Image
                      style={{height: '37%', opacity: 0.5}}
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                      source={require('../../assets/images/next.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                justifyContent: 'center',
                height: '50%',
                backgroundColor: '#ffffff',
                borderTopColor: '#E6E6E6',
                borderTopWidth: 1,
              }}>
              <TouchableWithoutFeedback onPress={this.verificaBoletoAberto}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.7,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontFamily: 'Montserrat-Bold',
                        color: '#707070',
                        fontSize: responsiveFontSize(2),
                      }}>
                      POR BOLETO
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      flex: 0.3,
                      height: '100%',
                    }}>
                    <Image
                      style={{height: '37%', opacity: 0.5}}
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                      source={require('../../assets/images/next.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* <View
              style={{
                justifyContent: 'center',
                height: '33%',
                backgroundColor: '#ffffff',
                borderTopColor: '#E6E6E6',
                borderTopWidth: 1,
              }}>
              <TouchableWithoutFeedback>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.7,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontFamily: 'Montserrat-Bold',
                        color: '#707070',
                        fontSize: responsiveFontSize(2),
                      }}>
                      COM CARTÃO DE CRÉDITO
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      flex: 0.3,
                      height: '100%',
                    }}>
                    <Image
                      style={{height: '37%', opacity: 0.5}}
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                      source={require('../../assets/images/next.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View> */}
          </View>
        </Modal>
        <ModalTriplo
          ConteudoTextoModal={this.state.msgModalConfir}
          TextoBotãoFechar={'FECHAR'}
          TextoBotãoFunção={'MOSTRAR'}
          TamanhoDoTexto={18}
          CorBotãoFechar={'#707070'}
          CorBotãoFunção={'#007F0B'}
          isModalVisible={!!this.state.msgModalConfir}
          Fechar={() => {
            this.setState({msgModalConfir: ''});
            this.props.Fechar();
          }}
          Função={() => {
            if (this.state.navegacaoModal !== '') {
              this.setState({msgModalConfir: ''});
              this.props.navigation.navigate(this.state.navegacaoModalConfir);
            } else {
              this.setState({msgModalConfir: ''});
            }
          }}
        />
      </>
    );
  }
}
