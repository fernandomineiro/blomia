import React from 'react';
import {Image, View, Text} from 'react-native';
import styles from './styles';
import registerComplete from '../../../assets/images/registerincomplete.png';

export default class RegisterComplete extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxLogo}>
          <Image
            style={styles.imgLogo}
            source={require('../../../assets/images/blomialogo.png')}
          />
        </View>
        <View style={styles.boxContent}>
          <Image style={styles.imgRegisterComplete} source={registerComplete} />

          <Text style={styles.informativeText}>
            Será necessário verificar alguns dados da empresa. Em breve
            entraremos em contato com você.
          </Text>
        </View>
      </View>
    );
  }
}
