import React from 'react';
import {View, Text, Image, KeyboardAvoidingView} from 'react-native';

import {connect} from 'react-redux';
import Ripple from 'react-native-material-ripple';
import styles from './styles';

function PasswordTransaction({navigation, client}) {
  return (
    <KeyboardAvoidingView enabled={false} style={styles.container}>
      <View style={styles.containerBotoes}>
        <Image
          style={styles.imgLogo}
          resizeMethod="resize"
          resizeMode="contain"
          source={require('../../assets/images/blomialogo.png')}
        />

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.textFinish}>
            Você pode alterar sua senha de acesso a qualquer momento, para isso
            basta seguir as orientações abaixo:
          </Text>
          <Image
            style={styles.imgPadLock}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../assets/images/infoSenhaUser.png')}
          />
        </View>

        <View style={styles.containerButtonFinish}>
          <Ripple
            rippleCentered={true}
            style={styles.btnCustom}
            onPress={() => navigation.navigate('HomeClient')}>
            <Text style={styles.textBtnCustom}>FECHAR</Text>
          </Ripple>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = ({client}) => {
  return {
    client,
  };
};

export default connect(mapStateToProps)(PasswordTransaction);
