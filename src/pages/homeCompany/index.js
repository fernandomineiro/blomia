import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import TipApresentation from '../../components/TipApresentation';

import api from '../../config/api';
import { setMsgToast as setMsgToastRedux } from '../../store/actions/msgToast';
import setValueBalanceRedux from '../../store/actions/setValueBalance';
import setVisibilityBalanceRedux from '../../store/actions/setVisibilityBalance';
import styles from './styles';

import iconTransferHomeCompany from '../../assets/images/iconTransferHomeCompany.png';
import iconExtractHome from '../../assets/images/icoExtractHome.png';
import iconCarteira from '../../assets/images/ico-carteira-ativo.png';
import iconPorquinho from '../../assets/images/ico-deposito-ativo.png';
import iconVisibleBalance from '../../assets/images/eye.png';
import iconInvisibleBalance from '../../assets/images/hide.png';
import iconBankSplitHomeCompany from '../../assets/images/iconBankSplitHomeCompany.png';

import getUpdatedBalance from '../../utils/getUpdatedBalance';

const HomeCompany = ({
  navigation,
  client,
  balance,
  msgToast,
  setMsgToast,
  setValueBalance,
  setVisibilityBalance,
}) => {
  const [spinner, setSpinner] = useState(true);
  const [showModalBankSplitOpent, setShowModalBankSplitOpent] = useState(false);
  const [showModalTransferOpent, setShowModalTransferOpent] = useState(false);

  const resetPage = useCallback(async () => {
    setSpinner(true);
    setShowModalBankSplitOpent(false);

    const valueBalance = await getUpdatedBalance(client);
    setValueBalance(valueBalance);

    if (msgToast && msgToast !== '') {
      exibirToast(msgToast);
      setMsgToast('');
    }
    setSpinner(false);
  }, [msgToast, client, exibirToast, setMsgToast, setValueBalance]);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', async () => {
      resetPage();
    });

    resetPage();

    return () => {
      focusListener.remove();
    };
  }, [navigation, resetPage]);

  const exibirToast = useCallback(async msg => {
    Toast.show(msg, Toast.SHORT);
  }, []);

  const autorizaSaque = useCallback(async () => {
    navigation.navigate('sacarEmpresa');
  }, [navigation]);

  const autorizaDeposito = useCallback(() => {
    navigation.navigate('depositoEmpresa');
  }, [navigation]);

  const verificaBoletoAberto = useCallback(async () => {
    setSpinner(true);
    await api
      .get(`/bank_split/status?company_id=${client.company.id}`)
      .then(async response => {
        // Atualiza tokens para proxima requisição
        setSpinner(false);
        if (!response.data.id) {
          navigation.navigate('depositoBoletoEmpresa');
        } else {
          setShowModalBankSplitOpent(true);
        }
      })
      .catch(async error => {
        setSpinner(false);
        if (
          error.response.data.message &&
          error.response.data.message[0].detail === 'No bank split in progress'
        ) {
          navigation.navigate('depositoBoletoEmpresa');
        }
      });
  }, [client.company.id, navigation]);

  const verificaTransacaoAberta = useCallback(async () => {
    setSpinner(true);

    await api
      .get(`requisition/transfer?company_id=${client.company.id}`)
      .then(async response => {
        setSpinner(false);
        if (response.data.company_transfer) {
          setShowModalTransferOpent(true);
        } else {
          navigation.navigate('tedEmpresa');
        }
      })
      .catch(async () => {
        setSpinner(false);
      });
  }, [client.company.id, navigation]);

  const autorizaExtrato = useCallback(() => {
    navigation.navigate('extratoEmpresa');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        color="white"
        textStyle={styles.spinnerTextStyle}
      />
      <ModalTriplo
        ConteudoTextoModal="Você já possui boleto em aberto."
        TextoBotãoFechar="FECHAR"
        TextoBotãoFunção="MOSTRAR"
        TamanhoDoTexto={18}
        CorBotãoFechar="#707070"
        CorBotãoFunção="#007F0B"
        isModalVisible={showModalBankSplitOpent}
        Fechar={() => setShowModalBankSplitOpent(false)}
        Função={() => {
          setShowModalBankSplitOpent(false);
          navigation.navigate('resumoBoletoEmpresa');
        }}
      />
      <ModalTriplo
        ConteudoTextoModal="Você já possui transferência em andamento."
        TextoBotãoFechar="FECHAR"
        TextoBotãoFunção="MOSTRAR"
        TamanhoDoTexto={18}
        CorBotãoFechar="#707070"
        CorBotãoFunção="#007F0B"
        isModalVisible={showModalTransferOpent}
        Fechar={() => setShowModalTransferOpent(false)}
        Função={() => {
          setShowModalTransferOpent(false);
          navigation.navigate('tedEmpresaResumo');
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
            <Text style={styles.textButtonHead}>DEPÓSITO</Text>
          </RectButton>
          <RectButton onPress={autorizaSaque} style={styles.buttonHead}>
            <Image
              source={iconCarteira}
              resizeMode="cover"
              style={styles.icoButtonHead}
            />
            <Text style={styles.textButtonHead}>SAQUE</Text>
          </RectButton>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={verificaBoletoAberto}
          style={styles.touchOption}
        >
          <Image
            source={iconBankSplitHomeCompany}
            resizeMode="cover"
            style={styles.iconOption}
          />
          <View style={styles.containerStyleOption}>
            <View style={styles.containerTextOption}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textOptionTitle}>Boletos</Text>
                <TipApresentation>Novidades!</TipApresentation>
              </View>
              <Text style={styles.textOption}>
                Deposite na conta dessa empresa
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
          onPress={verificaTransacaoAberta}
          style={styles.touchOption}
        >
          <Image
            source={iconTransferHomeCompany}
            resizeMode="cover"
            style={styles.iconOption}
          />
          <View style={styles.containerStyleOption}>
            <View style={styles.containerTextOption}>
              <Text style={styles.textOptionTitle}>Movimentação bancária</Text>
              <Text style={styles.textOption}>
                Envie o saldo para seu banco
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={30}
              style={styles.chevronImgOption}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={autorizaExtrato} style={styles.touchOption}>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeCompany);
