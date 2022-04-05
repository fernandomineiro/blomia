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

import api from '../../config/api';

import { currencyFormat } from '../../utils/funcoes';

import styles from './styleConfirmationDepositBankSplit';

function ConfirmationDepositBankSplit({ navigation, client }) {
  const [spinner, setSpinner] = useState(false);
  const [coast, setCoast] = useState(0);
  const [value, setValue] = useState(0);
  const [bankSplitFast, setBankSplitFast] = useState(false);

  const refreshData = useCallback(() => {
    const { coastValue, requisitionValue, fast } = navigation.state.params;

    if (fast) {
      setBankSplitFast(true);
    }
    setCoast(coastValue);
    setValue(requisitionValue);
  }, [navigation.state.params]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const gerarBoleto = async valueNumber => {
    setSpinner(true);
    const valuePointless = valueNumber.toFixed(2).replace('.', '');

    await api
      .post(
        `/company/bank_split/create?company_id=${client.company.id}${
          bankSplitFast ? '&requisition_type=19' : ''
        }`,
        {
          value: valuePointless,
        },
      )
      .then(async response => {
        setSpinner(false);
        // Atualiza tokens para proxima requisição

        if (response.data.id) {
          navigation.navigate('resumoBoletoEmpresa');
        }
      })
      .catch(() => {
        setSpinner(false);
        // Atualiza tokens para proxima requisição
      });
  };

  return (
    <SafeAreaView style={styles.scrollModal}>
      <Spinner visible={spinner} color="white" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <CustomHeader
          title="Home"
          handleGoBack={() => navigation.navigate('DepositoBoletoCliente')}
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
                <Text style={styles.label}>Data</Text>
                <Text style={styles.labelValue}>
                  {format(new Date(Date.now()), 'dd/MM/yyyy')}
                </Text>
              </View>
              <View style={[styles.rowSimple, styles.rowBorderTop]}>
                <Text style={styles.label}>Data limite para pagamento</Text>
                <Text style={styles.labelValue}>
                  {format(addDays(new Date(Date.now()), 7), 'dd/MM/yyyy')}
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
              onPress={() => gerarBoleto(value)}
            >
              <Text style={styles.textGpsButtonStyle}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ client }) => {
  return { client };
};

export default connect(mapStateToProps)(ConfirmationDepositBankSplit);
