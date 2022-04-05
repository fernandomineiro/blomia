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
import { format, addDays } from 'date-fns';
import { connect } from 'react-redux';

import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';
import ModalSenha from '../../components/ModalSenha/ModalSenha';

import api from '../../config/api';

import { currencyFormat } from '../../utils/funcoes';

import styles from './styleConfirmationTransferencia';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import { setSenhaModal } from '../../store/actions/senhaModal';

function ConfirmationTransferencia({ navigation, client, balance }) {
  const [spinner, setSpinner] = useState(false);
  const [coast, setCoast] = useState(0);
  const [value, setValue] = useState(0);
  const [dataTransfer, setDataTransfer] = useState(null);
  const [urlTransfer, setUrlTransfer] = useState('');
  const [nameBankTransfer, setNameBankTransfer] = useState('');
  const [msgErro, setMsgErro] = useState([]);
  const [idAccount, setIdAccount] = useState(null);
  const [visibilityModalPassword, setVisibilityModalPassword] = useState(false);
  const [
    descriptionAccountTypeTransfer,
    setDescriptionAccountTypeTransfer,
  ] = useState('');

  const refreshData = useCallback(() => {
    const {
      coastValue,
      requisitionValue,
      data,
      urlSalvarConta,
      nameBank,
      descriptionAccountType,
      accountId,
    } = navigation.state.params;

    setCoast(coastValue);
    setValue(requisitionValue);
    setDataTransfer(data);
    setUrlTransfer(urlSalvarConta);
    setNameBankTransfer(nameBank);
    setDescriptionAccountTypeTransfer(descriptionAccountType);
    setIdAccount(accountId);
    setMsgErro([]);
  }, [navigation.state.params]);

  const realizarTransferencia = async senha => {
    setVisibilityModalPassword(false);

    if (value > balance.value) {
      return;
    }

    setSpinner(true);

    const filtroQuery = `${urlTransfer.substring(
      0,
      urlTransfer.length - 1,
    )}=${idAccount}&value=${value}`;

    const params = {
      requisition: {
        password: senha,
      },
    };
    api
      .post(
        `requisition/transfer?requisition_setting_id=5&${filtroQuery}&company_id=${client.company.id}`,
        params,
      )
      .then(() => {
        setSpinner(false);
        navigation.navigate('tedEmpresaResumo');
      })
      .catch(error => {
        setSpinner(false);

        if (error.response.data.errors[0].detail === 'Wrong password') {
          setMsgErro(['Senha Inválida.']);
        } else if (
          error.response.data.errors[0].detail ===
          "Your company don't have enough money availabe"
        ) {
          setMsgErro(['Saldo insuficiente para essa transação.']);
        } else {
          setMsgErro(['Erro inesperado, se persistir contate o suporte.']);
        }
      });
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <SafeAreaView style={styles.scrollModal}>
      <Spinner visible={spinner || !dataTransfer} color="white" />
      <ModalSenha
        useNativeDriver
        animationType="fade"
        isVisible={visibilityModalPassword}
        fechar={() => setVisibilityModalPassword(false)}
        validar={arrayPassword => realizarTransferencia(arrayPassword[0])}
      />
      <ModalDefault
        openModal={msgErro.length > 0}
        closeModal={() => setMsgErro([])}
        MsgErro={msgErro}
        tipoModal="erro"
      />
      {dataTransfer && (
        <ScrollView keyboardShouldPersistTaps="handled">
          <CustomHeader
            title="Home"
            handleGoBack={() => navigation.navigate('tedEmpresaTransferencia')}
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
                <Text style={styles.textTitlePage}>Movimentação bancária</Text>
                <Text style={styles.textDescription}>Resumo</Text>
                <View style={styles.rowSimple}>
                  <Text style={styles.label}>Valor</Text>
                  <Text style={styles.labelValue}>{currencyFormat(value)}</Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Favorecido</Text>
                  <Text style={styles.labelValue}>
                    {dataTransfer.owner_name}
                  </Text>
                </View>
                {dataTransfer.cpf !== '' && (
                  <View style={[styles.rowSimple, styles.rowBorderTop]}>
                    <Text style={styles.label}>CPF</Text>
                    <Text style={styles.labelValue}>{dataTransfer.cpf}</Text>
                  </View>
                )}
                {dataTransfer.cnpj !== '' && (
                  <View style={[styles.rowSimple, styles.rowBorderTop]}>
                    <Text style={styles.label}>CNPJ</Text>
                    <Text style={styles.labelValue}>{dataTransfer.cnpj}</Text>
                  </View>
                )}
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Banco</Text>
                  <Text style={styles.labelValue}>
                    {`${dataTransfer.bank_code}-${nameBankTransfer}`}
                  </Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Tipo Conta</Text>
                  <Text style={styles.labelValue}>
                    {descriptionAccountTypeTransfer}
                  </Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Agência</Text>
                  <Text style={styles.labelValue}>{dataTransfer.agency}</Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Conta</Text>
                  <Text style={styles.labelValue}>
                    {`${dataTransfer.account_number}-${dataTransfer.account_digit}`}
                  </Text>
                </View>
                <View style={[styles.rowSimple, styles.rowBorderTop]}>
                  <Text style={styles.label}>Custos</Text>
                  <Text style={styles.labelValue}>{currencyFormat(coast)}</Text>
                </View>
                <View style={styles.rowTotal}>
                  <Text style={styles.labelValue}>
                    {`Total: ${currencyFormat(value + coast)}`}
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.gpsButtonStyle}
                onPress={() => setVisibilityModalPassword(true)}
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

const mapStateToProps = ({ client, balance }) => {
  return { client, balance };
};

export default connect(mapStateToProps)(ConfirmationTransferencia);
