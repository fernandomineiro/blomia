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

import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';
import ModalSenha from '../../components/ModalSenha/ModalSenha';
import ModalDefault from '../../components/ModalDefault/ModalDefault';

import api from '../../config/api';

import { currencyFormat } from '../../utils/funcoes';

import styles from './styleConfirmationTransferClient';

function ConfirmationTransferClient({ navigation }) {
  const [spinner, setSpinner] = useState(false);
  const [coast, setCoast] = useState(0);
  const [value, setValue] = useState(0);
  const [nameFrom, setNameFrom] = useState('');
  const [phoneFrom, setPhoneFrom] = useState('');
  const [showModalSenha, setShowModalSenha] = useState(false);
  const [idFrom, setIdFrom] = useState('');
  const [mgsErrors, setMgsErrors] = useState([]);

  const refreshData = useCallback(() => {
    const {
      coastValue,
      requisitionValue,
      id,
      name,
      phone,
    } = navigation.state.params;

    setCoast(Number(coastValue));
    setValue(Number(requisitionValue));
    setIdFrom(id);
    setNameFrom(name);
    setPhoneFrom(phone);
  }, [navigation.state.params]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const requestPassword = useCallback(() => {
    setShowModalSenha(true);
  }, []);

  const handleTransfer = useCallback(
    password => {
      if (!password) {
        return;
      }

      setSpinner(true);
      setShowModalSenha(false);

      const params = {
        requisition: { password: password[0] },
      };
      api
        .post(
          `user/transfer?receiver_id=${idFrom}&value=${value}&requisition_type=6`,
          params,
        )
        .then(() => {
          setSpinner(false);

          navigation.navigate('TransferenciaConcluida');
        })
        .catch(error => {
          setSpinner(false);
          const dataError = error.response.data;

          if (dataError.errors && dataError.errors[0].detail) {
            const detailError = dataError.errors[0].detail;

            if (detailError === 'Wrong password') {
              setMgsErrors(['Senha inválida']);
              return;
            }

            if (detailError === 'User cannot be the receiver') {
              setMgsErrors(['Não é possivel transferir para você mesmo']);
              return;
            }
          }

          if (dataError.message && dataError.message[0].detail) {
            const detailError = dataError.message[0].detail;

            if (detailError === "User don't have enough money") {
              setMgsErrors(['Saldo insuficiente para transferência']);
            }
          }
        });
    },
    [idFrom, value, navigation],
  );

  return (
    <SafeAreaView style={styles.scrollModal}>
      <Spinner visible={spinner} color="white" />
      <ModalDefault
        openModal={mgsErrors.length > 0}
        closeModal={() => {
          setMgsErrors([]);
          navigation.goBack();
        }}
        MsgErro={mgsErrors}
        tipoModal="erro"
      />
      <ModalSenha
        useNativeDriver
        animationType="fade"
        isVisible={showModalSenha}
        fechar={() => setShowModalSenha(false)}
        validar={handleTransfer}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <CustomHeader
          title="Home"
          handleGoBack={() => navigation.navigate('TransferClient')}
          navigation={navigation}
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
              <View style={[styles.rowSimple, styles.rowBorderTop]}>
                <Text style={styles.label}>Para</Text>
                <Text style={styles.labelValue}>{nameFrom}</Text>
              </View>
              <View style={[styles.rowSimple, styles.rowBorderTop]}>
                <Text style={styles.label}>Telefone</Text>
                <Text style={styles.labelValue}>{phoneFrom}</Text>
              </View>
              <View style={[styles.rowSimple, styles.rowBorderTop]}>
                <Text style={styles.label}>Data</Text>
                <Text style={styles.labelValue}>
                  {format(new Date(Date.now()), 'dd/MM/yyyy')}
                </Text>
              </View>
              <View style={[styles.rowSimple, styles.rowBorderTop]}>
                <Text style={styles.label}>Custos</Text>
                <Text style={styles.labelValue}>{currencyFormat(coast)}</Text>
              </View>
              <View style={styles.rowTotal}>
                <Text style={styles.labelValue}>
                  {currencyFormat(value + coast)}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.gpsButtonStyle}
              onPress={requestPassword}
            >
              <Text style={styles.textGpsButtonStyle}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ConfirmationTransferClient;
