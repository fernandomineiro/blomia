import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  Linking,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { TextInputMask } from 'react-native-masked-text';
import TextInput from 'react-native-text-input-mask';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { selectContactPhone } from 'react-native-select-contact';
import Spinner from 'react-native-loading-spinner-overlay';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { connect } from 'react-redux';

import api from '../../config/api';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

import ModalDefault from '../../components/ModalDefault/ModalDefault';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import Balance from '../../components/Balance';

import styles from './styles';
import InputCurrency from '../../components/InputCurrency';
import ModalCoast from '../../components/ModalCoast';

const pencilImg = require('../../assets/images/pencil.png');

const TransferClient = ({ navigation, client }) => {
  const [contactVerify, setContactVerify] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [mgsErrors, setMgsErrors] = useState([]);
  const [value, setValue] = useState('0,00');
  const [inputColor, setInputColor] = useState('gray');
  const [showWhatsappShared, setShowWhatsappShared] = useState(false);
  const [numberEntered, setNumberEntered] = useState('');
  const [isFocusFieldNumberPhone, setIsFocusFieldNumberPhone] = useState(false);
  const [selectContact, setSelectContact] = useState(false);
  const [modalCoastVisibility, setModalCoastVisibility] = useState(false);
  const [coastTransfer, setCoastTransfer] = useState(0);

  const handleCreateContact = useCallback(() => {
    const newPerson = {
      emailAddresses: [
        {
          label: 'mobile',
          email: '',
        },
      ],
      displayName: '',
    };

    Contacts.openContactForm(newPerson)
      .then(contact => {
        if (contact) {
          const numberSelected = contact.phoneNumbers[0].number;
          setContactVerify({
            name: contact.displayName,
            number: numberSelected,
          });
          verifyNumberAccount(numberSelected);
        }
      })
      .catch(() => {});
  }, [verifyNumberAccount]);

  const verifyNumberAccount = useCallback(
    async number => {
      setSpinner(true);
      api
        .get(`users/registration/find_user?phone_number=${removeMask(number)}`)
        .then(response => {
          setSpinner(false);

          navigation.navigate('ConfirmationTransferClient', {
            coastValue: coastTransfer,
            requisitionValue: removeMascara(value),
            id: response.data.id,
            name: response.data.full_name,
            phone: response.data.phone_number,
          });
        })
        .catch(error => {
          setSpinner(false);

          const dataError = error.response.data;

          if (dataError.errors && dataError.errors[0].detail) {
            const detailError = dataError.errors[0].detail;

            if (detailError === 'User dont exist') {
              setShowWhatsappShared(true);
              return;
            }
          }

          if (dataError.errors === 'Invalid Phone Number.') {
            setMgsErrors(['Telefone inválido']);
          }
        });
    },
    [removeMask, removeMascara, value, coastTransfer, navigation],
  );

  const getPhoneNumber = useCallback(() => {
    selectContactPhone().then(selection => {
      if (!selection) {
        return null;
      }

      const { selectedPhone, contact } = selection;
      const numberSelected = selectedPhone.number;
      setContactVerify({ name: contact.name, number: numberSelected });
      verifyNumberAccount(numberSelected);
      return null;
    });
  }, [verifyNumberAccount]);

  const handleBackPage = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const requestContactsPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Acesso aos contatos',
          message: 'Blomia precisa de sua permissão para acessar aos contatos',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Permitir',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }, []);

  const removeMask = useCallback(valor => {
    return valor.replace(/[^0-9]/g, '');
  }, []);

  const handleNumberTransfer = useCallback(() => {
    const number = numberEntered;
    setContactVerify({ name: 'Telefone', number });
    verifyNumberAccount(number);
  }, [numberEntered]);

  const handleSelectContact = useCallback(() => {
    if (value === '0,00') {
      setMgsErrors(['Digite o valor para transferir']);
      return;
    }

    setSelectContact(true);
  }, [value]);

  const removeMascara = useCallback(valor => {
    return valor.replace('R$', '').replace('.', '').replace(',', '.');
  }, []);

  const startPage = useCallback(async () => {
    setSpinner(false);
    setValue('0,00');
    setInputColor('gray');
    setMgsErrors([]);
    setShowWhatsappShared(false);
    setContactVerify(false);
    setNumberEntered('');
    setIsFocusFieldNumberPhone(false);
    setSelectContact(false);
    setModalCoastVisibility(false);
    setCoastTransfer(0);

    if (Platform.OS === 'android') {
      const permission = await requestContactsPermission();
      if (!permission) {
        handleBackPage();
      }
    }
    setSpinner(true);
    setSpinner(false);
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', startPage);

    startPage();

    return () => {
      focusListener.remove();
    };
  }, [navigation, startPage]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <CustomHeader
          title="Home"
          navigation={navigation}
          handleGoBack={
            selectContact
              ? () => {
                  setSelectContact(false);
                }
              : null
          }
        />
        <View style={styles.container}>
          <ModalTriplo
            ConteudoTextoModal="O telefone ainda não está cadastrado no Blomia. Deseja compartilhar pelo Whatsapp?"
            TextoBotãoFechar="FECHAR"
            TextoBotãoFunção="WHATSAPP"
            TamanhoDoTexto={18}
            CorBotãoFechar="#707070"
            CorBotãoFunção="#007F0B"
            isModalVisible={showWhatsappShared}
            Fechar={() => {
              setShowWhatsappShared(false);
              handleBackPage();
            }}
            Função={() => {
              const firstName = String(client.name).split(' ')[0];
              const textShared = `${firstName} quer te transferir uma grana no Blomia. Acesse o link para baixar o app. https://blomia.com.br/`;
              Linking.openURL(`whatsapp://send?text=${textShared}`);
              setShowWhatsappShared(false);
              handleBackPage();
            }}
          />
          <ModalDefault
            openModal={mgsErrors.length > 0}
            closeModal={() => setMgsErrors([])}
            MsgErro={mgsErrors}
            tipoModal="erro"
          />
          <View style={styles.header}>
            <Balance />
          </View>

          <Spinner visible={spinner} color="white" />
          {!selectContact ? (
            <>
              <ModalCoast
                isVisible={modalCoastVisibility}
                handleClose={() => setModalCoastVisibility(false)}
                coastValue={Number(removeMascara(String(coastTransfer)))}
                requisitionValue={Number(removeMascara(String(value)))}
              />
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
              >
                <View style={styles.content}>
                  <Text style={styles.textTitlePage}>Transfêrencia</Text>
                  <Text style={styles.textDescription}>
                    Informe o valor que deseja transferir:
                  </Text>
                  <View style={styles.input}>
                    <InputCurrency
                      valueInput={value}
                      label="Valor"
                      onChangeText={text => setValue(text)}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.containerValorCusto}
                    onPress={() => setModalCoastVisibility(true)}
                  >
                    <Text style={styles.labelCusto}>
                      Valor total:
                      <Text style={styles.valorCusto}>
                        {` R$${(
                          coastTransfer + Number(removeMascara(value))
                        ).toFixed(2)}`}
                      </Text>
                    </Text>
                    <Icon name="info" size={20} color="#007f0b" />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={
                    value === '000' || value === '0,00'
                      ? [styles.gpsButtonStyle, { backgroundColor: 'gray' }]
                      : styles.gpsButtonStyle
                  }
                  onPress={handleSelectContact}
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
            </>
          ) : (
            <>
              <View style={styles.itemHeader}>
                <Text style={styles.textHeader}>
                  Selecione o contato para transferir
                </Text>
              </View>
              {Platform.OS === 'android' && (
                <View style={styles.itemAddContact}>
                  <TouchableOpacity onPress={handleCreateContact}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="plus-circle"
                        size={24}
                        style={styles.iconAddContact}
                        color="#707070"
                      />
                      <Text style={styles.textAddContact}>Novo contato</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.itemAddContact}>
                <TouchableOpacity onPress={getPhoneNumber}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="user"
                      size={24}
                      style={styles.iconAddContact}
                      color="#707070"
                    />
                    <Text style={styles.textAddContact}>
                      Selecionar contato existente
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.itemComplement}>
                <Text style={styles.textComplement}>Ou então</Text>
                <Text style={styles.textComplementRegular}>
                  Digite o número para transferir
                </Text>
              </View>
              <TextInput
                onChangeText={text => setNumberEntered(text)}
                value={numberEntered}
                keyboardType="numeric"
                placeholder="(31) 99999-9000"
                mask="[00] [00000]-[0000]"
                onFocus={() => setIsFocusFieldNumberPhone(true)}
                onBlur={() => {
                  setIsFocusFieldNumberPhone(false);
                }}
                style={[
                  styles.inputUserStyle,
                  isFocusFieldNumberPhone
                    ? { borderColor: '#477E22' }
                    : { borderColor: '#B3B3B3' },
                ]}
              />
              <TouchableOpacity
                style={
                  numberEntered.length <= 12
                    ? [styles.gpsButtonStyle, { backgroundColor: 'gray' }]
                    : styles.gpsButtonStyle
                }
                onPress={() => {
                  if (numberEntered.length > 12) {
                    handleNumberTransfer();
                  }
                }}
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
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ client }) => {
  return { client };
};

export default connect(mapStateToProps)(TransferClient);
