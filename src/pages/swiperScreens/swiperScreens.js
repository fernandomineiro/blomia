import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../config/api';

import Swiper from 'react-native-swiper';
import SwiperScreen1 from './swiperScreen1.js';
import SwiperScreen2 from './swiperScreen2.js';

import {styles} from './stylesSwiper3and4.js';

const logo = require('../../assets/images/logo-2.png');
const roadImage = require('../../assets/images/roadImage.png');

import {connect} from 'react-redux';

class SwiperScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPagination: true,
    };
  }

  goToHome = async () => {
    await api.post('users/registrations/first_access');
    this.props.navigation.navigate(
      this.props.client.company ? 'HomeCompany' : 'HomeClient',
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons
        dotColor="gray"
        showsPagination={this.state.showPagination}
        activeDotColor="#007f0b"
        nextButton={
          <Text>
            <Icon name="chevron-right" size={30} color="#007f0b" />
          </Text>
        }
        prevButton={
          <Text>
            <Icon name="chevron-left" size={30} color="#007f0b" />
          </Text>
        }
        onIndexChanged={numberIndex => {
          if (numberIndex === 3) {
            this.setState({showPagination: false});
          } else {
            this.setState({showPagination: true});
          }
        }}
        loop={false}>
        <SwiperScreen1 />
        <SwiperScreen2 />
        <View style={styles.containerSwipe}>
          <View style={styles.headerSwipe}>
            <Image
              resizeMode="contain"
              resizeMethod="resize"
              style={styles.imageLogoRoad}
              source={logo}
            />
          </View>
          <View style={styles.contentSwipe}>
            <Text style={styles.instruction}>
              Após avaliar as opções disponíveis, e gerar o código da
              solicitação encaminhe-se ao local de sua preferência.
            </Text>
            <View style={styles.imgContentSwipe}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.roadImage}
                source={roadImage}
              />
            </View>
            <Text style={styles.instruction}>
              No estabelecimento onde deseja sacar ou depositar o dinheiro você
              será perguntado e deve informar ao responsável o código gerado no
              aplicativo.
            </Text>
          </View>
        </View>
        <View style={styles.containerSwipe}>
          <Image
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.imageLogoOrientation}
            source={logo}
          />
          <View style={styles.contentSwipe}>
            <Text style={styles.instructionsOrientation1}>
              Estamos quase lá
            </Text>

            <Text style={styles.instructionsOrientation}>DEPÓSITO</Text>

            <Text style={styles.instruction}>
              Imediatamente o estabelecimento valida o código informado, recebe
              de você o valor do depósito em dinheiro e então libera o valor no
              seu Blomia.
            </Text>

            <Text style={styles.instructionsOrientation4}>
              Você também pode depositar por boleto!
            </Text>

            <Text style={styles.instructionsOrientation}>SAQUE</Text>

            <Text style={styles.instruction}>
              O estabelecimento valida seu código, te entrega o valor do saque
              em dinheiro e seu saldo Blomia é atualizado.
            </Text>
          </View>
          {this.state.tipoSwiper ? (
            <TouchableOpacity
              onPress={() =>
                navigate(
                  this.props.client.company ? 'HomeCompany' : 'HomeClient',
                )
              }
              style={styles.closeButtonStyle}>
              <Text style={styles.loginButtonTextStyle}>VOLTAR</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.goToHome()}
              style={styles.startButtonStyle}>
              <Text style={styles.loginButtonTextStyle}>COMEÇAR A USAR</Text>
            </TouchableOpacity>
          )}
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

const mapDispatchToProps = dispatch => {
  return {};
};

// export default HomeScreen;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwiperScreens);
