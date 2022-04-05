import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Animation from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import styles from './styles';
import api from '../../config/api';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import { setMsgToast as setMsgToastRedux } from '../../store/actions/msgToast';
import setValueBalanceRedux from '../../store/actions/setValueBalance';
import setVisibilityBalanceRedux from '../../store/actions/setVisibilityBalance';

import TrofeuTransacaoGratisAnimation from '../../assets/images/trofeuTransacaoGratis.json';

import iconTransferHome from '../../assets/images/icoTransferHome.png';
import iconExtractHome from '../../assets/images/icoExtractHome.png';
import iconCarteira from '../../assets/images/ico-carteira-ativo.png';
import iconPorquinho from '../../assets/images/ico-deposito-ativo.png';
import iconVisibleBalance from '../../assets/images/eye.png';
import iconInvisibleBalance from '../../assets/images/hide.png';

import getUpdatedBalance from '../../utils/getUpdatedBalance';

const HomeClient = ({
  navigation,
  client,
  balance,
  msgToast,
  setMsgToast,
  setValueBalance,
  setVisibilityBalance,
}) => {
  const [transacoesGratuitas, setTransacoesGratuitas] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalPrimeiroDeposito, setShowModalPrimeiroDeposito] = useState(
    false,
  );
  // Variavel para controla o LOADING da tela
  const [spinner, setSpinner] = useState(true);
  const [PrimeiroSaque, setPrimeiroSaque] = useState(0);
  const [TranscaoAberta, setTranscaoAberta] = useState(0);
  const [novasTransacoesGratis, setNovasTransacoesGratis] = useState(0);
  const [naoRealizouDeposito, setNaoRealizouDeposito] = useState(false);

  const resetPage = useCallback(async () => {
    setTransacoesGratuitas(0);
    setShowModal(false);
    setShowModalPrimeiroDeposito(false);
    // Variavel para controla o LOADING da tela
    setPrimeiroSaque(0);
    setTranscaoAberta(0);
    setNovasTransacoesGratis(0);
    setSpinner(true);

    const valueBalance = await getUpdatedBalance(client);
    setValueBalance(valueBalance);

    await buscaTransacoesGratuitas();

    if (msgToast && msgToast !== '') {
      exibirToast(msgToast);
      setMsgToast('');
    }
    setSpinner(false);
  }, [msgToast]);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', async () => {
      resetPage();
    });

    resetPage();

    return () => {
      focusListener.remove();
    };
  }, [navigation]);

  const checkTransacaoAberta = useCallback(async () => {
    setSpinner(true);
    await api
      .get('/in_cash_requisitions/status')
      .then(async response => {
        if (response.data && response.data[0]) {
          await AsyncStorage.setItem(
            'idSaque',
            JSON.stringify(response.data[0].id),
          );

          setShowModal(true);
          setTranscaoAberta(1);
        } /* else {
          if (response.data['has_requisition?'] === false) {
            this.setState({
              showModalPrimeiroDeposito: true,
              //naoRealizouDeposito: true,
            });
          }
          this.setState({TranscaoAberta: 0});
        } */
        setSpinner(false);
      })
      .catch(async () => {
        // Atualiza tokens para proxima requisição
        setSpinner(false);
      });
  }, []);

  const toggleModalTriplo = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const toggleModalTriploPrimeiroDeposito = useCallback(() => {
    setShowModalPrimeiroDeposito(!showModalPrimeiroDeposito);
  }, [showModalPrimeiroDeposito]);

  const exibirToast = useCallback(async msg => {
    Toast.show(msg, Toast.SHORT);
  }, []);

  const buscaTransacoesGratuitas = useCallback(async () => {
    await api
      .get('/free_requisition')
      .then(async response => {
        // Atualiza tokens para proxima requisição
        setTransacoesGratuitas(response.data.quantity);
        setNovasTransacoesGratis(response.data.free_requisition_bonus);
      })
      .catch(async () => {
        // Atualiza tokens para proxima requisiçã
      });
  }, []);

  // const checkPrimeiroSaque = useCallback(async () => {
  //   await api
  //     .get('/in_cash_requisitions/first_withdrawal')
  //     .then(async response => {
  //       if (
  //         response.data.first_withdrawal[0].message &&
  //         response.data.first_withdrawal[0].message['has_one_withdrawal?'] ===
  //           true &&
  //         response.data.first_withdrawal[0].message[
  //           'personal_document_is_empty?'
  //         ] === true &&
  //         (await AsyncStorage.getItem('solicitarDoc')) !== 'nao'
  //       ) {
  //         // Se cair nessa condição vai responder true para abir tele de solicitação de foto
  //         setPrimeiroSaque(1);
  //       } else {
  //         setPrimeiroSaque(0);
  //       }
  //     })
  //     .catch(async () => {});
  // }, []);

  const autorizaSaque = useCallback(async () => {
    await checkTransacaoAberta();
    // await this.checkPrimeiroSaque();

    if (PrimeiroSaque === 1) {
      // Abre tela para solicitar foto do usuário depois do primeiro saque

      navigation.navigate('sacarCliente');
    }

    if (TranscaoAberta === 0 && PrimeiroSaque === 0 && !naoRealizouDeposito) {
      navigation.navigate('sacarCliente');
    }
  }, [
    PrimeiroSaque,
    TranscaoAberta,
    checkTransacaoAberta,
    naoRealizouDeposito,
    navigation,
  ]);

  const handleTransfer = useCallback(() => {
    navigation.navigate('TransferClient');
  }, []);

  const autorizaDeposito = useCallback(() => {
    // await this.checkTransacaoAberta();
    // await this.checkPrimeiroSaque();

    if (PrimeiroSaque === 1) {
      // Abre tela para solicitar foto do usuário depois do primeiro saque

      navigation.navigate('DocumentOrientationUserClient');
    }

    if (TranscaoAberta === 0 && PrimeiroSaque === 0) {
      navigation.navigate('depositoCliente');
    }
  }, [PrimeiroSaque, TranscaoAberta, navigation]);

  const funcModal = useCallback(() => {
    navigation.navigate('CodigoSaque');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        color="white"
        textStyle={styles.spinnerTextStyle}
      />
      <ModalTriplo
        ConteudoTextoModal="Você já possui saque ou depósito em andamento."
        TextoBotãoFechar="FECHAR"
        TextoBotãoFunção="MOSTRAR"
        TamanhoDoTexto={18}
        CorBotãoFechar="#707070"
        CorBotãoFunção="#007F0B"
        isModalVisible={showModal}
        Fechar={() => toggleModalTriplo()}
        Função={() => funcModal()}
      />
      <ModalTriplo
        ConteudoTextoModal="A opção de saque já está disponível, faça seu primeiro depósito."
        TextoBotãoFechar="FECHAR"
        TextoBotãoFunção="IR PARA DEPÓSITO"
        TamanhoDoTexto={18}
        CorBotãoFechar="#707070"
        CorBotãoFunção="#007F0B"
        isModalVisible={showModalPrimeiroDeposito}
        Fechar={() => toggleModalTriploPrimeiroDeposito()}
        Função={() => {
          toggleModalTriploPrimeiroDeposito();
          autorizaDeposito();
        }}
      />
      <CustomHeader title="Home" isHome navigation={navigation} />
      <View style={styles.headercontainer}>
        <View style={styles.headercontent}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <View style={styles.containerValueDisplay}>
                <Text style={styles.text1header1}>Dinheiro disponível</Text>
              </View>

              <View style={styles.containerValue}>
                {balance.visibility ? (
                  <Text style={styles.text2headerValue}>
                    R$
                    {balance.value}
                  </Text>
                ) : (
                  <View style={styles.containerValueHidden} />
                )}
              </View>
            </View>
          </View>
          <View style={styles.headercontent2}>
            <TouchableOpacity
              onPress={() => setVisibilityBalance(!balance.visibility)}
            >
              <Image
                source={
                  balance.visibility ? iconVisibleBalance : iconInvisibleBalance
                }
                resizeMode="cover"
                style={styles.textheader2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerButtonsHead}>
          <RectButton onPress={autorizaDeposito} style={styles.buttonHead}>
            <Image
              source={iconPorquinho}
              resizeMode="cover"
              style={styles.icoButtonHead}
            />
            <Text style={styles.textButtonHead}>DEPOSITAR</Text>
          </RectButton>
          <RectButton onPress={autorizaSaque} style={styles.buttonHead}>
            <Image
              source={iconCarteira}
              resizeMode="cover"
              style={styles.icoButtonHead}
            />
            <Text style={styles.textButtonHead}>SACAR</Text>
          </RectButton>
        </View>
      </View>
      {transacoesGratuitas > 0 && (
        <View style={styles.headerFooter}>
          <Text style={styles.textFooter}>
            {`Você possui ${transacoesGratuitas} `}
            <Text>
              {transacoesGratuitas > 1
                ? 'saques ou depósitos em dinheiro de graça'
                : 'saque ou depósito em dinheiro de graça'}
            </Text>
          </Text>
        </View>
      )}
      <View style={styles.contentContainer}>
        {!novasTransacoesGratis > 0 ? (
          <>
            <TouchableOpacity
              onPress={handleTransfer}
              style={styles.touchOption}
            >
              <Image
                source={iconTransferHome}
                resizeMode="cover"
                style={styles.iconOption}
              />
              <View style={styles.containerStyleOption}>
                <View style={styles.containerTextOption}>
                  <Text style={styles.textOptionTitle}>Transferências</Text>
                  <Text style={styles.textOption}>
                    Transfira para qualquer pessoa no Blomia
                  </Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={30}
                  style={styles.chevronImgOption}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('extratoCliente')}
              style={styles.touchOption}
            >
              <Image
                source={iconExtractHome}
                resizeMode="cover"
                style={styles.iconOption}
              />
              <View style={styles.containerStyleOption}>
                <View style={styles.containerTextOption}>
                  <Text style={styles.textOptionTitle}>Extrato</Text>
                  <Text style={styles.textOption}>Confira seu extrato</Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={30}
                  style={styles.chevronImgOption}
                />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <Modal isVisible>
            <View style={styles.modalDate}>
              <View style={styles.containerModalDate}>
                <Ripple
                  rippleCentered
                  onPress={() => {
                    setNovasTransacoesGratis(0);
                  }}
                  style={[styles.btnCloseModal, { backgroundColor: 'grey' }]}
                >
                  <Text style={styles.textBtnMenu}>X</Text>
                </Ripple>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: '10%',
                }}
              >
                <Animation
                  source={TrofeuTransacaoGratisAnimation}
                  autoPlay
                  loop
                  style={{ width: '50%' }}
                  resizeMode="cover"
                />
                <Text style={styles.titleFreeTransaction}>PARABÉNS</Text>
                <Text style={styles.textFreeTransaction}>
                  {`Você ganhou ${novasTransacoesGratis} ${
                    novasTransacoesGratis > 1
                      ? 'saques ou dépositos'
                      : 'saque ou déposito'
                  } em dinheiro!`}
                </Text>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ msgToast, client, balance }) => {
  return {
    msgToast: msgToast.msgToast,
    client,
    balance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMsgToast: msg => dispatch(setMsgToastRedux(msg)),
    setValueBalance: value => dispatch(setValueBalanceRedux(value)),
    setVisibilityBalance: visibility =>
      dispatch(setVisibilityBalanceRedux(visibility)),
  };
};

// export default HomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(HomeClient);
