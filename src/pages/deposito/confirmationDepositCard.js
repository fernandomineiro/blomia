import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { format } from 'date-fns';

import { RSA } from 'react-native-rsa-native';
import { MoipCreditCard } from 'moip-sdk-js';
import Modal from 'react-native-modal';
import Animation from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionCable from 'react-native-actioncable';

import loadCardJson from '../../assets/images/loadCard.json';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';
import ModalNotice from '../../components/ModalDuplo/ModalDuplo';

import { URL_ACTION_CABLE, KEY_PUB_WIRE_CARD } from '../../../blomia.config';
import api from '../../config/api';

import { currencyFormat, getNumber } from '../../utils/funcoes';

import styles from './styleConfirmationDepositCard';

function ConfirmationDepositBankSplit({ navigation }) {
  const [spinner, setSpinner] = useState(true);
  const [installment, setInstallment] = useState(null);
  const [value, setValue] = useState(0);
  const [dataCardDeposit, setDataCardDeposit] = useState(null);
  const [
    isVisibilityModalProcessing,
    setIsVisibilityModalProcessing,
  ] = useState(false);
  const [isVisibleModalNotice, setIsVisibleModalNotice] = useState(false);
  const [titleModalNotice, setTitleModalNotice] = useState(false);
  const [contentModalNotice, setcontentModalNotice] = useState(false);

  const refreshData = useCallback(() => {
    const {
      valueDeposit,
      installmentDeposit,
      dataCard,
    } = navigation.state.params;

    setValue(valueDeposit);
    setInstallment(installmentDeposit);
    setDataCardDeposit(dataCard);
    setSpinner(false);
    setIsVisibilityModalProcessing(false);
    setIsVisibleModalNotice(false);
    setTitleModalNotice(false);
    setcontentModalNotice(false);
  }, [navigation.state.params]);

  const generateHash = useCallback(async () => {
    conectaWebSocket();

    setIsVisibilityModalProcessing(true);

    const dataCard = {
      number: String(dataCardDeposit.numberCard).replace(/[^\d]/g, ''),
      cvc: dataCardDeposit.codeCard,
      expirationMonth: String(dataCardDeposit.dueDateCard).split('/')[0],
      expirationYear: String(dataCardDeposit.dueDateCard).split('/')[1],
    };

    const responseHash = await MoipCreditCard.setEncrypter(RSA, 'react-native')
      .setPubKey(KEY_PUB_WIRE_CARD)
      .setCreditCard(dataCard)
      .hash();

    const bodyParam = {
      requisition: {
        credit_card_hash: responseHash,
      },
    };

    console.log('hash', bodyParam);

    const queryParam = [
      `value=${Number(value).toFixed(2)}`,
      `amount_gross=${getNumber(currencyFormat(installment.coastTotal))}`,
      `requisition_type=3`,
      `installment_count=${installment ? installment.installmentQuantity : 0}`,
      `holder_name=${dataCardDeposit ? dataCardDeposit.nameOwnerCard : ''}`,
      `birth_date=${dataCardDeposit ? dataCardDeposit.dateBirthOwnerCard : ''}`,
      `holder_cpf=${dataCardDeposit ? dataCardDeposit.cpfOwnerCard : ''}`,
      `holder_phone_number=${
        dataCardDeposit ? dataCardDeposit.phoneOwnerCard : ''
      }`,
    ];

    try {
      const response = await api.post(
        `/credit_card?${queryParam.join('&')}`,
        bodyParam,
      );

      if (response.data.errors) {
        setIsVisibilityModalProcessing(false);
        const errorPrimary = response.data.errors[0];

        showModalNotice({
          title: 'Erro no pagamento',
          message: errorPrimary.description,
        });
      }
    } catch (error) {
      console.error(error);
    }

    //    navigation.navigate('DepositCardFinished');
  }, [dataCardDeposit, installment, value]);

  useEffect(() => {
    refreshData();
  }, [refreshData, conectaWebSocket]);

  const showModalNotice = useCallback(({ title = '', message = '' }) => {
    setTitleModalNotice(title);
    setcontentModalNotice(message);
    setIsVisibleModalNotice(true);
  }, []);

  const conectaWebSocket = useCallback(() => {
    const accessToken = api.defaults.headers.common['access-token'];
    const { client } = api.defaults.headers.common;
    const { uid } = api.defaults.headers.common;

    const cable = ActionCable.createConsumer(
      `${URL_ACTION_CABLE}?uid=${uid}&access-token=${accessToken}&client=${client}`,
    );

    // Acessa canal do websocket
    cable.subscriptions.create('CreditCardDepositReleaseChannel', {
      received(data) {
        setIsVisibilityModalProcessing(false);
        if (data.status === 'PAYMENT AUTHORIZED') {
          navigation.navigate('DepositoConcluido');
        } else {
          showModalNotice({
            title: 'Erro no pagamento',
            message: 'Pagamento não aprovado. Por favor, revise seus dados.',
          });
        }
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.scrollModal}>
      <ModalNotice
        visibleExit={isVisibleModalNotice}
        titulo={titleModalNotice}
        conteudo={contentModalNotice}
        function={() => setIsVisibleModalNotice(false)}
        buttonFunctionText="OK"
      />
      <Modal isVisible={isVisibilityModalProcessing}>
        <View style={styles.modalProcessing}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: '10%',
            }}
          >
            <Animation
              source={loadCardJson}
              autoPlay
              loop
              style={{ width: '50%' }}
              resizeMode="cover"
            />
            <Text style={styles.titleModalProcessing}>Aguarde</Text>
            <Text style={styles.textModalProcessing}>
              Estamos processando seu pagamento
            </Text>
          </View>
        </View>
      </Modal>
      <Spinner visible={spinner} color="white" />
      {dataCardDeposit && installment && (
        <ScrollView keyboardShouldPersistTaps="handled">
          <CustomHeader
            title="Home"
            handleGoBack={() => {
              navigation.navigate('FormCardClient', {
                valor: value,
                installment,
              });
            }}
            navigation={navigation}
            buttonCancelled
          />
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
                <Text style={styles.textDescription}>Resumo</Text>
                <View style={styles.rowSimple}>
                  <Text style={styles.label}>Valor</Text>
                  <Text style={styles.labelValue}>{currencyFormat(value)}</Text>
                </View>
                <View style={styles.rowSimple}>
                  <Text style={styles.label}>Cartão de Crédito</Text>
                  <Text style={styles.labelValue}>
                    {`Final ${String(dataCardDeposit.numberCard).substr(
                      15,
                      String(dataCardDeposit.numberCard).length,
                    )}`}
                  </Text>
                </View>
                <View style={styles.rowSimple}>
                  <Text style={styles.label}>Parcelamento</Text>
                  <Text style={styles.labelValue}>
                    {`${installment.installmentQuantity}x`}
                  </Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Data</Text>
                  <Text style={styles.labelValue}>
                    {format(new Date(Date.now()), 'dd/MM/yyyy')}
                  </Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Custos</Text>
                  <Text style={styles.labelValue}>
                    {currencyFormat(installment.coastTotal - value)}
                  </Text>
                </View>
                <View style={styles.rowTotal}>
                  <Text style={styles.labelValue}>
                    {`Total: ${currencyFormat(installment.coastTotal)}`}
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.gpsButtonStyle}
                onPress={generateHash}
              >
                <Text style={styles.textGpsButtonStyle}>CONTINUAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ConfirmationDepositBankSplit;
