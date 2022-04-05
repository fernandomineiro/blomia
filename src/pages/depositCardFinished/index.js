import React, {Component} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import Animation from 'lottie-react-native';

import LogoBlomia from '../../components/Logo/LogoBlomia.js';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js';
import ModalDrawerInferior from '../../components/ModalDrawerInferior/ModalDrawerInferior.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../config/api';

import loadCardJson from  '../../assets/images/loadCard.json';

import styles from './styles.js';
import CustomHeader from '../../components/CustomHeader/CustomHeader.js';

export default class DepositCardFinished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      saldoDisponivel: null,
      loadCard: true,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount() {
    this.buscaSaldo();
  }

  async buscaSaldo() {
    await api
      .get('/simple_balance')
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({saldoDisponivel: response.data.balance});
        await AsyncStorage.setItem(
          'saldo',
          response.data.balance.replace('R$', ''),
        );
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Home"
          navigation={this.props.navigation}
          hiddenButton
        />
        {this.state.loadCard ? (
          <View style={styles.content}>
            <Text style={styles.textTitlePage}>
              Depósito com Cartão de Crédito
            </Text>
            <Animation
              source={loadCardJson}
              autoPlay
              loop
              style={{ width: '50%' }}
              resizeMode="cover"
            />
            <Text style={styles.textWithDrawComplete2}>Aguarde...</Text>

          </View>
        ) : (
          <>
            <View style={styles.content}>
              <Image
                resizeMethod={'resize'}
                resizeMode={'contain'}
                source={require('../../assets/images/smartphonephoto.png')}
                style={{width: wp(40), height: hp(40)}}
              />
              <Text style={styles.textWithDrawComplete}>
                Depósito recebido com sucesso!
              </Text>
              <Text style={styles.textWithDrawComplete2}>Saldo atualizado</Text>
              <Text style={styles.textWithDrawComplete3}>
                {this.state.saldoDisponivel}
              </Text>
            </View>
            <View>
              <ButtonCustom
                ação={() => this.props.navigation.navigate('inicioCliente')}
                btnColor={'#007f0b'}
                textColor={'#ffffff'}
                textButton={'INÍCIO'}
              />
            </View>
            <View>
              <ModalDrawerInferior
                isModalVisible={this.state.isModalVisible}
                Fechar={() => this.toggleModal()}
              />
            </View>
          </>
        )}

      </View>
    );
  }
}
