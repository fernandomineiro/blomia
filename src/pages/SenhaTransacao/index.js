import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { responsiveFontSize as responsiveFont } from 'react-native-responsive-dimensions';

import { connect } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';

import ModalSenha from '../../components/ModalSenha/ModalSenha';
import styles from './styles';
import api from '../../config/api';
import ModalDefault from '../../components/ModalDefault/ModalDefault';

function PasswordTransaction({ navigation, client }) {
  const [spinner, setSpinner] = useState(false);
  const [showModalHelp, setShowModalHelp] = useState(false);
  const [borderInptPassword, setBorderInptPassword] = useState('#B3B3B3');
  const [
    borderInptPasswordConfirmation,
    setBorderInptPasswordConfirmation,
  ] = useState('#B3B3B3');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [showRequestPasswordAccess, setShowRequestPasswordAccess] = useState(
    false,
  );
  const [showModalErrors, setShowModalErrors] = useState(false);
  const [listErrors, setListErrors] = useState([]);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', async () => {
      setShowModalHelp(false);
      setNewPassword('');
      setNewPasswordConfirmation('');
      setShowRequestPasswordAccess(false);
      setShowModalErrors(false);
      setListErrors([]);
      setShowFinish(false);
    });

    return () => {
      focusListener.remove();
    };
  }, [navigation]);
  const handleUpdate = useCallback(
    async ([senha]) => {
      setSpinner(true);
      setShowRequestPasswordAccess(false);
      const params = {
        company: {
          password: senha,
          requisition_password: newPassword,
        },
      };
      api
        .patch(`companies/${client.company.id}`, params)
        .then(response => {
          setSpinner(false);
          setShowFinish(true);
        })
        .catch(error => {
          setSpinner(false);
          if (error.response.data.errors[0].detail === 'Wrong password') {
            setListErrors(['Senha de acesso inválida']);
            setShowModalErrors(true);
          }
        });
    },
    [client.company.id, newPassword],
  );

  const handleRequestPasswordAccess = useCallback(async () => {
    if (newPassword.length !== 6 || newPasswordConfirmation.length !== 6) {
      setListErrors(['A senha deve conter 6 digitos']);
      setShowModalErrors(true);
      return;
    }
    if (newPassword === newPasswordConfirmation) {
      setShowRequestPasswordAccess(true);
    } else {
      setListErrors(['A senha e a confirmação da senha estão diferentes']);
      setShowModalErrors(true);
    }
  }, [newPassword, newPasswordConfirmation]);

  return (
    <ScrollView>
      <KeyboardAvoidingView enabled={false} style={styles.container}>
        <Spinner visible={spinner} color="white" />
        <ModalDefault
          openModal={showModalErrors}
          closeModal={() => setShowModalErrors(false)}
          MsgErro={listErrors}
          tipoModal="erro"
          loginPgLoad={() => setShowModalErrors(false)}
        />
        <ModalSenha
          useNativeDriver
          animationType="fade"
          type="acesso"
          isVisible={showRequestPasswordAccess}
          fechar={() => setShowRequestPasswordAccess(false)}
          validar={handleUpdate}
        />
        <Modal isVisible={showModalHelp}>
          <View style={styles.containerModalHelper}>
            <View style={{ width: '100%', alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={styles.btCloseModalHelp}
                onPress={() => {
                  setShowModalHelp(false);
                }}
              >
                <Text style={styles.textBtCloseModalHelp}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleModalHelp}>Senha de acesso</Text>
            <Text style={styles.textModalHelp}>
              Senha de acesso é a senha utilizada por você para acessar seu
              perfil pessoal e sua(s) empresa(s).
            </Text>
            <Text style={styles.textModalHelp}>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}>Importante:</Text>
{' '}
              essa senha não deve ser fornecida a terceiros.
            </Text>
            <Text style={styles.titleModalHelp}>Senha de transações</Text>
            <Text style={styles.textModalHelp}>
              A senha de transações é a senha utilizada por você ou seus
              funcionários para liberação de saques e depósitos solicitados
              pelos clientes.
            </Text>
            <Text style={styles.textModalHelp}>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}>Importante:</Text>
{' '}
              por padrão a senha de transação é igual a senha de acesso, mas
              você pode alterar a qualquer momento.
            </Text>
          </View>
        </Modal>
        {!showFinish ? (
          <View style={styles.containerBotoes}>
            <Image
              style={styles.imgLogo}
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../../assets/images/blomialogo.png')}
            />
            <Text style={styles.tituloPagina}>
              Crie uma senha específica para liberação de saques e depósitos
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text style={styles.fieldText}>Nova Senha</Text>

              <View
                style={[styles.secureBox, { borderColor: borderInptPassword }]}
              >
                <SmoothPinCodeInput
                  placeholder={<View style={styles.placeholderPinStyle} />}
                  mask={<View style={styles.pinMaskStyle} />}
                  // maskDelay={100000}
                  password
                  cellStyle={null}
                  cellStyleFocused="#B3B3B3"
                  cellSize={responsiveFont(4)}
                  codeLength={6}
                  value={newPassword}
                  onFocus={() => setBorderInptPassword('green')}
                  onBlur={() => setBorderInptPassword('#B3B3B3')}
                  onTextChange={text => setNewPassword(text)}
                />
              </View>

              <Text style={styles.fieldText}>Confirmar Nova Senha</Text>

              <View
                style={[
                  styles.secureBox,
                  { borderColor: borderInptPasswordConfirmation },
                ]}
              >
                <SmoothPinCodeInput
                  placeholder={<View style={styles.placeholderPinStyle} />}
                  mask={<View style={styles.pinMaskStyle} />}
                  // maskDelay={100000}
                  password
                  cellStyle={null}
                  cellStyleFocused="#B3B3B3"
                  cellSize={responsiveFont(4)}
                  codeLength={6}
                  value={newPasswordConfirmation}
                  onFocus={() => setBorderInptPasswordConfirmation('green')}
                  onBlur={() => setBorderInptPasswordConfirmation('#B3B3B3')}
                  onTextChange={text => setNewPasswordConfirmation(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModalHelp(true);
                }}
              >
                <Text style={styles.msgPassword}>
                  Dúvidas?
{' '}
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    CLIQUE AQUI
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Ripple
              rippleCentered
              style={styles.btnCustomFinish}
              onPress={handleRequestPasswordAccess}
            >
              <Text style={styles.textBtnCustom}>ALTERAR</Text>
            </Ripple>
            <Ripple
              rippleCentered
              style={styles.btnCustom}
              onPress={() =>
                navigation.navigate(
                  client.company ? 'HomeCompany' : 'HomeClient',
                )
              }
            >
              <Text style={styles.textBtnCustom}>FECHAR</Text>
            </Ripple>
          </View>
        ) : (
          <View style={styles.containerBotoes}>
            <Image
              style={styles.imgLogo}
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../../assets/images/blomialogo.png')}
            />
            <Image
              style={styles.imgPadLock}
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../../assets/images/padlock.png')}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.textFinish}>
                Senha cadastrada com sucesso!
              </Text>
            </View>
            <View style={styles.containerButtonFinish}>
              <Ripple
                rippleCentered
                style={styles.btnFinish}
                onPress={() =>
                  navigation.navigate(
                    client.company ? 'HomeCompany' : 'HomeClient',
                  )
                }
              >
                <Text style={styles.textBtnCustom}>INÍCIO</Text>
              </Ripple>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const mapStateToProps = ({ client }) => {
  return {
    client,
  };
};

export default connect(mapStateToProps)(PasswordTransaction);
