import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import FlipCard from 'react-native-flip-card';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather';
import IconOctions from 'react-native-vector-icons/Octicons';

import InputText from '../../components/InputText';

import templateCardFrontImg from '../../assets/images/template_card_front.png';
import templateCardBackImg from '../../assets/images/template_card_back.png';
import CadastroEndereco from '../cadastroEndereco/cadastroEndereco';

// REDUX
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';

import styles from './styles';
import { limitadorString, getNumber, isValidEmail } from '../../utils/funcoes';
import api from '../../config/api';
import updateClient from '../../store/actions/updateClient';
import getUpdatedClient from '../../utils/getUpdatedClient';

function DepositCard({ navigation, client, updateDataClient }) {
  const [spinner, setSpinner] = useState(true);
  const [numberCard, setNumberCard] = useState('');
  const [nameOwnerCard, setNameOwnerCard] = useState('');
  const [dueDateCard, setDueDateCard] = useState('');
  const [codeCard, setCodeCard] = useState('');
  const [permissionNextInput, setPermissionNextInput] = useState(false);
  const [phaseInput, setPhageInput] = useState(0);
  const [valueDeposit, setValueDeposit] = useState(0);
  const [installmentDeposit, setInstallmentDeposit] = useState(0);
  const [cpfOwnerCard, setCpfOwnerCard] = useState(client.cpf);
  const [dateBirthOwnerCard, setDateBirthOwnerCard] = useState(
    client.dateBirth,
  );
  const [phoneOwnerCard, setPhoneOwnerCard] = useState(client.phone_number);
  const [validateDataUser, setValidateDataUser] = useState(true);
  const [emailClient, setEmailClient] = useState('');
  const [dateBirthClient, setDateBirthClient] = useState('');
  const [isRequestAddress, setIsRequestAddress] = useState(false);

  const validatePermissionNextInput = useCallback(() => {
    switch (phaseInput) {
      case 0: {
        if (numberCard.length <= 18) {
          setPermissionNextInput(false);
        } else {
          setPermissionNextInput(true);
        }
        break;
      }
      case 1: {
        if (nameOwnerCard.length <= 2) {
          setPermissionNextInput(false);
        } else {
          setPermissionNextInput(true);
        }
        break;
      }
      case 2: {
        if (dueDateCard.length <= 4) {
          setPermissionNextInput(false);
        } else {
          setPermissionNextInput(true);
        }
        break;
      }
      case 3: {
        if (codeCard.length <= 2) {
          setPermissionNextInput(false);
        } else {
          setPermissionNextInput(true);
        }
        break;
      }
      case 5: {
        if (
          cpfOwnerCard.length <= 13 ||
          cpfOwnerCard === client.cpf ||
          dateBirthOwnerCard.length <= 9 ||
          phoneOwnerCard.length <= 13
        ) {
          setPermissionNextInput(false);
        } else {
          setPermissionNextInput(true);
        }
        break;
      }
      default: {
        setPermissionNextInput(false);
        break;
      }
    }
  }, [
    numberCard,
    setPermissionNextInput,
    phoneOwnerCard,
    phaseInput,
    nameOwnerCard,
    dueDateCard,
    codeCard,
    client,
    cpfOwnerCard,
    dateBirthOwnerCard,
  ]);

  const handleNavigationToConfirmation = useCallback(() => {
    navigation.navigate('ConfirmationDepositCard', {
      valueDeposit,
      installmentDeposit,
      dataCard: {
        numberCard,
        nameOwnerCard,
        dueDateCard,
        codeCard,
        cpfOwnerCard: getNumber(cpfOwnerCard),
        dateBirthOwnerCard,
        phoneOwnerCard: getNumber(phoneOwnerCard),
      },
    });
  }, [
    cpfOwnerCard,
    dateBirthOwnerCard,
    phoneOwnerCard,
    codeCard,
    dueDateCard,
    installmentDeposit,
    nameOwnerCard,
    navigation,
    numberCard,
    valueDeposit,
  ]);

  useEffect(() => {
    setSpinner(false);
    setNumberCard('');
    setNameOwnerCard('');
    setDueDateCard('');
    setCodeCard('');
    setPhageInput(0);
    setPermissionNextInput(false);
    setIsRequestAddress(false);
    const { valor, installment } = navigation.state.params;

    setValueDeposit(valor);
    setInstallmentDeposit(installment);
    setCpfOwnerCard(client.cpf);
    setDateBirthOwnerCard(client.dateBirth);
    setPhoneOwnerCard(client.phone_number);

    if (!client.email || !client.dateBirth) {
      setValidateDataUser(true);
    } else {
      setValidateDataUser(false);

      if (!client.address) {
        setIsRequestAddress(true);
      } else {
        setIsRequestAddress(false);
      }
    }
    setEmailClient('');
    setDateBirthClient('');
  }, [navigation.state.params, client]);

  useEffect(() => {
    validatePermissionNextInput();
  }, [validatePermissionNextInput]);

  const handleSaveDataUser = useCallback(async () => {
    setSpinner(true);
    const param = {
      user: {
        email: !client.email ? emailClient : client.email,
        birth_date: !client.dateBirth ? dateBirthClient : client.dateBirth,
      },
    };
    await api.patch('/auth', param);

    const clientUpdated = await getUpdatedClient();
    updateDataClient(clientUpdated);

    if (!client.address) {
      setIsRequestAddress(true);
    } else {
      setIsRequestAddress(false);
    }
    setValidateDataUser(false);
    setSpinner(false);
  }, [client, dateBirthClient, emailClient, updateDataClient]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Spinner visible={spinner} color="white" />
        <CustomHeader
          title="Setting"
          isHome={false}
          navigation={navigation}
          handleGoBack={() => {
            navigation.navigate('DepositoCartaoCliente');
          }}
          buttonCancelled
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
            {validateDataUser ? (
              <View style={styles.content}>
                <Text style={styles.textTitlePage}>
                  Depósito com Cartão de Crédito
                </Text>
                <Text style={styles.textDescription}>
                  Para efetuar o depósito, precisamos que você informe alguns
                  dados:
                </Text>
                {!client.email && (
                  <View style={styles.input}>
                    <InputText
                      label="E-mail"
                      placeHolder="email@email.com"
                      valueInput={emailClient}
                      onChangeText={text => setEmailClient(text)}
                      keyboardType="email-address"
                    />
                  </View>
                )}
                {!client.dateBirth && (
                  <View style={styles.input}>
                    <InputText
                      label="Data de Nascimento"
                      placeHolder="DD/MM/AAAA"
                      valueInput={dateBirthClient}
                      onChangeText={text => setDateBirthClient(text)}
                      keyboardType="number-pad"
                      maskType="date"
                    />
                  </View>
                )}
                <View style={styles.containerButtonsFooter}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          ((!client.dateBirth &&
                            dateBirthClient.length >= 10) ||
                            client.dateBirth) &&
                          ((!client.email && isValidEmail(emailClient)) ||
                            client.email)
                        ) {
                          handleSaveDataUser();
                        }
                      }}
                      style={[
                        styles.buttonFooter,
                        {
                          backgroundColor:
                            ((!client.dateBirth &&
                              dateBirthClient.length >= 10) ||
                              client.dateBirth) &&
                            ((!client.email && isValidEmail(emailClient)) ||
                              client.email)
                              ? '#007f0b'
                              : '#D8D8D8',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textButtonsFooter,
                          {
                            color: '#fff',
                          },
                        ]}
                      >
                        CONTINUAR
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.content}>
                {isRequestAddress ? (
                  <CadastroEndereco
                    type="usuário"
                    success={() => setIsRequestAddress(false)}
                    title="Depósito com Cartão de Crédito"
                  />
                ) : (
                  <>
                    <Text style={styles.textTitlePage}>
                      Depósito com Cartão de Crédito
                    </Text>
                    {phaseInput <= 3 ? (
                      <>
                        <Text style={styles.textDescription}>
                          Agora, insira os dados do seu cartão de crédito:
                        </Text>
                        <FlipCard
                          style={styles.card}
                          friction={6}
                          perspective={1000}
                          flipHorizontal
                          flipVertical={false}
                          flip={phaseInput === 3}
                          clickable={false}
                        >
                          <View style={styles.templateCard}>
                            <Image
                              source={templateCardFrontImg}
                              style={{ flex: 1, width: '100%' }}
                            />
                            <Text style={styles.numberCardText}>
                              {numberCard === ''
                                ? '0000 0000 0000 0000'
                                : numberCard}
                            </Text>
                            <Text style={styles.nameCardText}>
                              {nameOwnerCard === ''
                                ? 'Nome do titular'
                                : limitadorString(nameOwnerCard, 20)}
                            </Text>
                            <Text style={styles.validCardText}>
                              {dueDateCard === '' ? 'mm/AA' : dueDateCard}
                            </Text>
                          </View>
                          <View style={styles.templateCard}>
                            <Image
                              source={templateCardBackImg}
                              style={{ flex: 1, width: '100%' }}
                            />
                            <Text style={styles.codeCardText}>
                              {codeCard === '' ? '000' : codeCard}
                            </Text>
                          </View>
                        </FlipCard>
                        <View style={styles.input}>
                          {phaseInput === 0 && (
                            <InputText
                              label="Número do cartão"
                              placeHolder="**** **** **** ****"
                              valueInput={numberCard}
                              onChangeText={text => {
                                setNumberCard(text);
                              }}
                              keyboardType="number-pad"
                              maskType="cardCredit"
                            />
                          )}
                          {phaseInput === 1 && (
                            <InputText
                              label="Nome do titular do cartão"
                              placeHolder="Nome do titular"
                              valueInput={nameOwnerCard}
                              onChangeText={text => setNameOwnerCard(text)}
                            />
                          )}
                          {phaseInput === 2 && (
                            <InputText
                              label="Vencimento"
                              placeHolder="MM/AA"
                              valueInput={dueDateCard}
                              keyboardType="number-pad"
                              onChangeText={text => setDueDateCard(text)}
                              maskType="validateCard"
                            />
                          )}
                          {phaseInput === 3 && (
                            <InputText
                              label="CVV"
                              placeHolder="000"
                              valueInput={codeCard}
                              keyboardType="number-pad"
                              onChangeText={text => setCodeCard(text)}
                              maskType="codeCard"
                            />
                          )}
                        </View>
                      </>
                    ) : (
                      <>
                        {phaseInput === 4 ? (
                          <>
                            <Text style={styles.textDescription}>
                              Você é o titular do cartão?
                            </Text>
                            <View style={styles.containerBotoes}>
                              <View style={styles.botao}>
                                <RectButton
                                  style={styles.touchableBox}
                                  onPress={handleNavigationToConfirmation}
                                >
                                  <IconOctions
                                    name="primitive-dot"
                                    color="#007f0b"
                                    size={24}
                                  />
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Text style={styles.titleButton}>
                                      Sim, sou o titular do cartão
                                    </Text>
                                  </View>
                                  <IconFeather
                                    name="chevron-right"
                                    color="#B3B3B3"
                                    size={24}
                                  />
                                </RectButton>
                              </View>
                              <View style={styles.botao}>
                                <RectButton
                                  style={styles.touchableBox}
                                  onPress={() => {
                                    setPhageInput(phaseInput + 1);
                                    setCpfOwnerCard('');
                                    setDateBirthOwnerCard('');
                                    setPhoneOwnerCard('');
                                  }}
                                >
                                  <IconOctions
                                    name="primitive-dot"
                                    color="#007f0b"
                                    size={24}
                                  />
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Text style={styles.titleButton}>
                                      Não, esse cartão é de outra pessoa
                                    </Text>
                                  </View>
                                  <IconFeather
                                    name="chevron-right"
                                    color="#B3B3B3"
                                    size={24}
                                  />
                                </RectButton>
                              </View>
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.textDescription}>
                              Agora, insira os dados pessoais do titular do
                              cartão de crédito:
                            </Text>
                            <View style={styles.input}>
                              <InputText
                                label="CPF"
                                placeHolder="000.000.000.00"
                                valueInput={cpfOwnerCard}
                                onChangeText={text => setCpfOwnerCard(text)}
                                keyboardType="number-pad"
                                maskType="cpf"
                              />
                            </View>
                            <View style={styles.input}>
                              <InputText
                                label="Data de Nascimento"
                                placeHolder="DD/MM/AAAA"
                                valueInput={dateBirthOwnerCard}
                                onChangeText={text =>
                                  setDateBirthOwnerCard(text)
                                }
                                keyboardType="number-pad"
                                maskType="date"
                              />
                            </View>
                            <View style={styles.input}>
                              <InputText
                                label="Telefone do titular"
                                placeHolder="(31)99999-0000"
                                valueInput={phoneOwnerCard}
                                onChangeText={text => setPhoneOwnerCard(text)}
                                keyboardType="number-pad"
                                maskType="phone"
                              />
                            </View>
                          </>
                        )}
                      </>
                    )}
                    <View style={styles.containerButtonsFooter}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        {phaseInput !== 0 && (
                          <TouchableOpacity
                            onPress={() => setPhageInput(phaseInput - 1)}
                            style={[
                              styles.buttonFooter,
                              {
                                backgroundColor: '#fff',
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.textButtonsFooter,
                                {
                                  color: '#007f0b',
                                },
                              ]}
                            >
                              Anterior
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {phaseInput !== 4 && (
                          <TouchableOpacity
                            onPress={() => {
                              if (permissionNextInput) {
                                if (phaseInput <= 4) {
                                  setPhageInput(phaseInput + 1);
                                } else {
                                  handleNavigationToConfirmation();
                                }
                              }
                            }}
                            style={[
                              styles.buttonFooter,
                              {
                                backgroundColor: permissionNextInput
                                  ? '#007f0b'
                                  : '#D8D8D8',
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.textButtonsFooter,
                                {
                                  color: '#fff',
                                },
                              ]}
                            >
                              CONTINUAR
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ client }) => {
  return {
    client,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataClient: clientUpdated => dispatch(updateClient(clientUpdated)),
  };
};

// export default DepositCard
export default connect(mapStateToProps, mapDispatchToProps)(DepositCard);
