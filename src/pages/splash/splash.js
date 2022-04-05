import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Image} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
// import {resetAction} from '../routes';
// import testeWs from '../teste/teste';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends React.Component {
  async componentDidMount() {
    //LOGIN AUTOMÁTICO CASO A CREDENCIAIS ESTJAM SALVAS
    setTimeout(async () => {
      var tipoAutoLogin = await AsyncStorage.getItem('blomia@tipoAutoLogin');
      if (tipoAutoLogin !== '' && tipoAutoLogin !== null) {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('PreAcessoNav');
      }
    }, 3000);
  }

  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#477e22', '#2a410f']}
        style={styles.linearGradient}>
        <View style={styles.container}>
          <Image
            style={styles.img}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../assets/images/blomia_logo_hdpi.png')}
          />
          <AnimatedEllipsis
            numberOfDots={3}
            minOpacity={0.4}
            animationDelay={200}
            style={styles.animatedEllipsis}
          />
        </View>
      </LinearGradient>
    );
  }
}
