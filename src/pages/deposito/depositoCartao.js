import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { responsiveFontSize } from 'react-native-responsive-dimensions';
import IconFeather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import ModalCoast from '../../components/ModalCoast';

import api from '../../config/api';
import InputCurrency from '../../components/InputCurrency';

// REDUX
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';

import styles from './stylesCartao';
import Select from '../../components/Select';
import { currencyFormat } from '../../utils/funcoes';

function DepositCard({ navigation }) {
  const [value, setValue] = useState('0,00');
  const [valorCustoDeposito, setValorCustoDeposito] = useState([]);
  const [carregamentoTela, setCarregamentoTela] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [modalCoastVisibility, setModalCoastVisibility] = useState(false);
  const [installment, setInstallment] = useState(null);
  const [installmentsOptions, setInstallmentsOptions] = useState([]);

  const exibiErro = useCallback(msg => {
    Toast.show(msg, Toast.SHORT);
  }, []);

  const removeMascara = useCallback(textValue => {
    return Number(
      String(textValue).replace('R$', '').replace('.', '').replace(',', '.'),
    );
  }, []);

  const insertDataCard = useCallback(() => {
    navigation.navigate('FormCardClient', {
      valor: removeMascara(value),
      installment,
    });
  }, [navigation, value, installment, removeMascara]);

  const calcularValorDeposito = useCallback(() => {
    api
      .get('/requisition_settings/user/expenses?requisition_type=3')
      .then(response => {
        setValorCustoDeposito(response.data);
      });
  }, []);

  const resetTela = useCallback(async () => {
    setValue('0,00');
    setValorCustoDeposito([]);
    setModalCoastVisibility(false);
    setCarregamentoTela(true);
    setSpinner(true);
    setInstallment(null);
    setInstallmentsOptions([]);

    await calcularValorDeposito();

    setCarregamentoTela(false);
    setSpinner(false);
  }, [calcularValorDeposito]);

  const handleChangeValue = useCallback(
    text => {
      setValue(text);

      const installments = valorCustoDeposito.map(coastIntallment => {
        const coast =
          (removeMascara(text) +
            Number(coastIntallment.fee) +
            Number(coastIntallment.external_fee)) *
          (1 + Number(coastIntallment.fee_percentage) / 100);

        return {
          value: coastIntallment.id,
          label: `${coastIntallment.installment_count}x ${currencyFormat(
            coast / Number(coastIntallment.installment_count),
          )}`,
          coastTotal: coast,
          installmentQuantity: coastIntallment.installment_count,
        };
      });
      setInstallment(null);
      setInstallmentsOptions(installments);
    },
    [removeMascara, valorCustoDeposito],
  );

  useEffect(() => {
    resetTela();
  }, [resetTela, navigation.state.params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Spinner visible={spinner} color="white" />
      <ScrollView keyboardShouldPersistTaps="handled">
        {!carregamentoTela && (
          <>
            <CustomHeader
              title="Setting"
              isHome={false}
              navigation={navigation}
              buttonCancelled
            />

            <ModalCoast
              isVisible={modalCoastVisibility}
              handleClose={() => setModalCoastVisibility(false)}
              coastValue={
                installment
                  ? Number(installment.coastTotal) -
                    Number(removeMascara(value))
                  : 0
              }
              requisitionValue={Number(removeMascara(value))}
            />

            <View style={styles.container}>
              <View style={styles.header}>
                <Balance />
              </View>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
              >
                <View style={styles.content}>
                  <Text style={styles.textTitlePage}>
                    Depósito com Cartão de Crédito
                  </Text>
                  <Text style={styles.textDescription}>
                    Informe o valor que deseja depositar:
                  </Text>
                  <View style={styles.input}>
                    <InputCurrency
                      valueInput={value}
                      label="Valor"
                      onChangeText={handleChangeValue}
                    />
                  </View>
                  <View style={styles.input}>
                    <Select
                      label="Parcelamento"
                      placeHolder="Selecione"
                      valueInput={installment}
                      changeValue={optionSelect => setInstallment(optionSelect)}
                      options={installmentsOptions}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.containerValorCusto}
                    onPress={() => setModalCoastVisibility(true)}
                  >
                    <Text style={styles.labelCusto}>
                      Valor total:
                      <Text style={styles.valorCusto}>
                        {installment
                          ? currencyFormat(installment.coastTotal)
                          : '-'}
                      </Text>
                    </Text>
                    <IconFeather name="info" size={20} color="#007f0b" />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={
                    value === '0,00' || !installment
                      ? [styles.gpsButtonStyle, { backgroundColor: 'gray' }]
                      : styles.gpsButtonStyle
                  }
                  onPress={
                    value === '0,00' || !installment
                      ? () =>
                          exibiErro('Favor informa o valor e o parcelamento.')
                      : () => insertDataCard()
                  }
                >
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(2),
                    }}
                  >
                    CONTINUAR
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ client }) => {
  return {
    client,
  };
};

// export default DepositCard
export default connect(mapStateToProps, null)(DepositCard);
