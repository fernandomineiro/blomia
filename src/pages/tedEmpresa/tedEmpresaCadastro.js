import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import api from '../../config/api';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import InputText from '../../components/InputText';

import styles from './styleCadastro';
import Balance from '../../components/Balance';
import Select from '../../components/Select';

function TedEmpresaCadastro({ navigation, client }) {
  const [textCode, setTextCode] = useState('');
  const [textAgencia, setTextAgencia] = useState('');
  const [textConta, setTextConta] = useState('');
  const [textFavorecido, setTextFavorecido] = useState('');
  const [textCPF, setTextCPF] = useState('');
  const [textCNPJ, setTextCNPJ] = useState('');
  const [filtroTipoConta, setFiltroTipoConta] = useState(null);
  const [filtroTipoPessoa, setFiltroTipoPessoa] = useState(null);
  const [modalEscolhaSalvar, setModalEscolhaSalvar] = useState(false);
  const [errorFieldEmpty, setErrorFieldEmpty] = useState(false);
  const [banco, setBanco] = useState(null);
  const [msgErroBanco, setMsgErroBanco] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [valueTransfer, setValueTransfer] = useState(0);
  const [coastTransfer, setCoastTransfer] = useState(0);

  useEffect(() => {
    const { requisitionValue, coastValue } = navigation.state.params;
    setTextCode('');
    setTextAgencia('');
    setTextConta('');
    setTextFavorecido('');
    setTextCPF('');
    setTextCNPJ('');
    setFiltroTipoConta(null);
    setFiltroTipoPessoa(null);
    setModalEscolhaSalvar(false);
    setErrorFieldEmpty(false);
    setBanco(null);
    setMsgErroBanco('');
    setSpinner(false);
    setValueTransfer(requisitionValue);
    setCoastTransfer(coastValue);
  }, [navigation.state.params]);

  const buscarBanco = useCallback(async codBank => {
    setSpinner(true);
    await api
      .get(`/transfer/bank_code?bank_code=${codBank}`)
      .then(async response => {
        setSpinner(false);
        setBanco(response.data);
        setMsgErroBanco('');
      })
      .catch(async () => {
        setSpinner(false);
        setBanco(null);
        setMsgErroBanco('O código não é valido.');
      });
  }, []);

  const limparBanco = useCallback(() => {
    setBanco(null);
    setMsgErroBanco('');
  }, []);

  const autorizarTransferencia = useCallback(
    async salvarConta => {
      if (textCode === '' || !banco) {
        setErrorFieldEmpty(true);
        setTextCode('');
        return;
      }

      const agency = textAgencia;
      if (agency === '') {
        setErrorFieldEmpty(true);
        return;
      }

      if (textConta === '' || textConta.length < 5) {
        setErrorFieldEmpty(true);
        return;
      }

      const accountNumber = textConta.split('-')[0];
      const accountDigit = textConta.split('-')[1];

      const accountType = filtroTipoConta ? filtroTipoConta.value : null;
      if (!accountType) {
        setErrorFieldEmpty(true);
        return;
      }

      if (textFavorecido === '') {
        setErrorFieldEmpty(true);
        return;
      }

      const cpf = textCPF;
      const cnpj = textCNPJ;
      if (cpf === '' && cnpj === '') {
        setErrorFieldEmpty(true);
        return;
      }

      const data = {
        bank_code: textCode,
        agency,
        account_number: accountNumber,
        account_digit: accountDigit,
        account_type: accountType,
        owner_name: textFavorecido,
        cpf,
        cnpj,
      };

      const urlSalvarConta = salvarConta
        ? 'bank_accounts'
        : 'bank_account_temps';

      api
        .post(`${urlSalvarConta}?company_id=${client.company.id}`, {
          bank_account: { ...data },
        })
        .then(response => {
          // Atualiza tokens para proxima requisição

          navigation.navigate('confirmationTransferenciaCompany', {
            data,
            urlSalvarConta,
            requisitionValue: valueTransfer,
            coastValue: coastTransfer,
            nameBank: banco.reduzed_name,
            descriptionAccountType: filtroTipoConta.label,
            accountId: response.data.id,
          });
        })
        .catch(() => {});
    },
    [
      banco,
      filtroTipoConta,
      textAgencia,
      textCNPJ,
      textCPF,
      textCode,
      textConta,
      textFavorecido,
      valueTransfer,
      coastTransfer,
      navigation,
      client.company.id,
    ],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Setting" navigation={navigation} />
      <Spinner visible={spinner} color="white" />
      <ModalTriplo
        ConteudoTextoModal="Deseja SALVAR essa conta bancária para futuras transações?"
        TextoBotãoFechar="NÃO"
        TextoBotãoFunção="SIM"
        TamanhoDoTexto={18}
        CorBotãoFechar="#707070"
        CorBotãoFunção="#007F0B"
        isModalVisible={modalEscolhaSalvar}
        Fechar={() => {
          setModalEscolhaSalvar(false);
          autorizarTransferencia(false);
        }}
        Função={() => {
          setModalEscolhaSalvar(false);
          autorizarTransferencia(true);
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Balance />
            </View>
            <View style={styles.content}>
              <Text style={styles.textDescription}>
                Para efetuar a movimentação bancária, precisamos que informe
                alguns dados:
              </Text>
              <View style={styles.input}>
                <InputText
                  label="Código do banco"
                  valueInput={textCode}
                  errorField={errorFieldEmpty && textCode === ''}
                  onChangeText={text => {
                    setTextCode(text);
                    if (text.length === 3) {
                      buscarBanco(text);
                    } else {
                      limparBanco();
                    }
                  }}
                  placeHolder="Cód. banco"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.input}>
                <InputText
                  label="Nome do banco"
                  valueInput={banco ? banco.reduzed_name : ''}
                  onChangeText={() => {}}
                  placeHolder="Digite o cód. banco"
                  reading
                />
              </View>
              <View style={styles.input}>
                <Select
                  label="Tipo de conta"
                  valueInput={filtroTipoConta}
                  errorField={errorFieldEmpty && !filtroTipoConta}
                  placeHolder="Corrente ou poupança"
                  changeValue={optionFiltroTipoConta =>
                    setFiltroTipoConta(optionFiltroTipoConta)
                  }
                  options={[
                    {
                      value: '1',
                      label: 'Corrente',
                    },
                    {
                      value: '2',
                      label: 'Poupança',
                    },
                  ]}
                />
              </View>
              <View style={styles.input}>
                <InputText
                  label="Agencia sem digito"
                  valueInput={textAgencia}
                  onChangeText={text => setTextAgencia(text)}
                  errorField={errorFieldEmpty && textAgencia === ''}
                  placeHolder="Número da agencia"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.input}>
                <InputText
                  label="Conta com digito"
                  valueInput={textConta}
                  errorField={errorFieldEmpty && textConta.length < 5}
                  onChangeText={text => setTextConta(text)}
                  placeHolder="Número da conta com dígito"
                  maskType="account"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.input}>
                <Select
                  label="PF ou PJ"
                  valueInput={filtroTipoPessoa}
                  errorField={errorFieldEmpty && !filtroTipoPessoa}
                  placeHolder="PF ou PJ"
                  changeValue={optionFiltroTipoPessoa => {
                    setFiltroTipoPessoa(optionFiltroTipoPessoa);
                    setTextCPF('');
                    setTextCNPJ('');
                  }}
                  options={[
                    {
                      value: '1',
                      label: 'Pessoa Física',
                    },
                    {
                      value: '2',
                      label: 'Pessoa Jurídica',
                    },
                  ]}
                />
              </View>
              {filtroTipoPessoa && (
                <>
                  <View style={styles.input}>
                    <InputText
                      label="Nome do favorecido"
                      valueInput={textFavorecido}
                      errorField={errorFieldEmpty && textFavorecido === ''}
                      onChangeText={text => setTextFavorecido(text)}
                      placeHolder="Nome do favorecido"
                    />
                  </View>
                  <View style={styles.input}>
                    <InputText
                      label={filtroTipoPessoa.value === '1' ? 'CPF' : 'CNPJ'}
                      valueInput={
                        filtroTipoPessoa.value === '1' ? textCPF : textCNPJ
                      }
                      errorField={
                        errorFieldEmpty && textCPF === '' && textCNPJ === ''
                      }
                      onChangeText={text => {
                        if (filtroTipoPessoa.value === '1') {
                          setTextCPF(text);
                        } else {
                          setTextCNPJ(text);
                        }
                      }}
                      placeHolder={
                        filtroTipoPessoa.value === '1'
                          ? '000.000.000-99'
                          : '00.000.000/0001-99'
                      }
                      maskType={filtroTipoPessoa.value === '1' ? 'cpf' : 'cnpj'}
                      keyboardType="numeric"
                    />
                  </View>
                </>
              )}
            </View>
          </View>
          <ButtonCustom
            rippleCentered
            navegar={() => {
              setModalEscolhaSalvar(true);
            }}
            textButton="CONTINUAR"
            btnColor="#007F0B"
            textColor="white"
            borderColor="#007f0b"
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ client }) => {
  return { client };
};

export default connect(mapStateToProps)(TedEmpresaCadastro);
