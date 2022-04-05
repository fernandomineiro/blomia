import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';

import styles from './styles';

function MyPasswords({ navigation, client }) {
  const [spinner, setSpinner] = useState(false);
  const [showModalHelp, setShowModalHelp] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={spinner} color="white" />
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
            Senha de acesso é a senha utilizada por você para acessar seu perfil
            pessoal e sua(s) empresa(s).
          </Text>
          <Text style={styles.textModalHelp}>
            <Text style={{ fontFamily: 'Montserrat-Bold' }}>Importante:</Text>
{' '}
            essa senha não deve ser fornecida a terceiros.
          </Text>
          <Text style={styles.titleModalHelp}>Senha de transações</Text>
          <Text style={styles.textModalHelp}>
            A senha de transações é a senha utilizada por você ou seus
            funcionários para liberação de saques e depósitos solicitados pelos
            clientes.
          </Text>
          <Text style={styles.textModalHelp}>
            <Text style={{ fontFamily: 'Montserrat-Bold' }}>Importante:</Text>{' '}
            por padrão a senha de transação é igual a senha de acesso, mas você
            pode alterar a qualquer momento.
          </Text>
        </View>
      </Modal>
      <Image
        style={styles.imgLogo}
        resizeMethod="resize"
        resizeMode="contain"
        source={require('../../assets/images/blomialogo.png')}
      />
      <View style={styles.containerBotoes}>
        <Text style={styles.tituloPagina}>
          Selecione qual senha você deseja alterar
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <View style={styles.botao}>
            <TouchableOpacity
              style={styles.touchableBox}
              onPress={() => {
                navigation.navigate('SenhaTransacaoCompany');
              }}
            >
              <Text style={styles.titleButton}>
                Alterar senha de transações
              </Text>
            </TouchableOpacity>
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
          style={styles.btnCustom}
          onPress={() =>
            navigation.navigate(client.company ? 'HomeCompany' : 'HomeClient')
          }
        >
          <Text style={styles.textBtnCustom}>FECHAR</Text>
        </Ripple>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ client }) => {
  return {
    client,
  };
};

export default connect(mapStateToProps)(MyPasswords);
