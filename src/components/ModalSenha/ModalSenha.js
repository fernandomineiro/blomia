/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { IMAGES } from '../../constantes/images.js';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { responsiveFontSize as responsiveFont } from 'react-native-responsive-dimensions';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import FingerprintScanner from 'react-native-fingerprint-scanner';
// import * as Keychain from 'react-native-keychain';

//REDUX
import { connect } from 'react-redux';
import { setSenhaModal } from '../../store/actions/senhaModal';



function ModalSenha(props) {
  const [borderInptSenha, setBorderInptSenha] = useState('#B3B3B3');
  const [senha, setSenha] = useState(['']);
  const [biometria, setBiometria] = useState(false);
  const [type, setType] = useState(() => {
    return props.type ? String(props.type) : 'transações';
  });


  useEffect(() => {
    setSenha(['']);
  }, []);

  function returnSenha() {
    props.setSenhaModal(senha);
    props.validar(senha);
    setSenha(['']);
  }


  async function checkBiometira() {
    await FingerprintScanner
      .isSensorAvailable()
      .then(async biometryType => { //Se device possuir biometria entra na condição

        //Verifica se usuário e senha está armazenado do device para utlizar o recurso da biometria
        try {

          // Recupera credencias armazenadas 
          // const credentials = await Keychain.getGenericPassword();
          if (credentials) {

            //Abre modal da biometria
            FingerprintScanner
              .authenticate({ description: 'Confirme seu acesso', cancelButton: 'CANCELAR', onAttempt: this.handleAuthenticationAttempted })
              .then(async () => {
                //Recupera a senha armazenada no device       
                setSenha(credentials.password)

                await props.setSenhaModal([credentials.password]);
                await props.validar([credentials.password]); 
                
                FingerprintScanner.release()
                this.handleAuthenticationAttempted;




                setBiometria(true)
              })
              .catch(() => {
                FingerprintScanner.release()
                this.handleAuthenticationAttempted;
                setBiometria(false)

              });
          }
        } catch (error) {
          // para manter o catch
        }



      })
      .catch(error => {
        setBiometria(false)
      });

  }

  if (biometria == false) {
    return (
      <Modal
        useNativeDriver={true}
        animationType="fade"
        isVisible={props.isVisible}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <View style={styles.titulo}>
            <Text style={styles.textTitulo}>Digite sua senha de {type}</Text>
            </View>
            <View style={styles.userContainer}>
              <View style={[styles.secureBox, { borderColor: borderInptSenha }]}>
                <SmoothPinCodeInput
                  placeholder={<View style={styles.placeholderPinStyle} />}
                  mask={<View style={styles.pinMaskStyle} />}
                  // maskDelay={100000}
                  password={true}
                  cellStyle={null}
                  cellStyleFocused={'#B3B3B3'}
                  cellSize={responsiveFont(4)}
                  codeLength={6}
                  value={senha[0]}
                  onFocus={() => setBorderInptSenha('green')}
                  onBlur={() => setBorderInptSenha('#B3B3B3')}
                  onTextChange={text => setSenha([text])}
                />
              </View>
            </View>
            <View style={styles.boxActions}>
              <TouchableOpacity style={{ paddingBottom: 10 }}>
                <ButtonCustom
                  navegar={senha[0].length == 6 ? () => returnSenha() : null}
                  textButton={'VALIDAR'}
                  btnColor={senha[0].length == 6 ? '#007F0B' : '#B3B3B3'}
                  textColor={'#F3F3F3'}
                  borderColor={'#4d4d4d'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSenha(['']);
                  return props.fechar();
                }}
                style={{ paddingBottom: 10, alignSelf: 'center' }}>
                <Text style={styles.estiloTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  } else { //Transação com biometria
    return (
      <View>

      </View>);
  }

}

const mapDispatchToProps = dispatch => {
  //Define valor da senha digitado no REDUX
  return {
    setSenhaModal: senhaModal => dispatch(setSenhaModal(senhaModal)),
  };
};

const mapStateToProps = ({ senhaModal }) => {
  //Recupera valor da senha digitada do REDUX
  return {
    senhaModal: senhaModal.senhaModal,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalSenha);
