/* eslint-disable */
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Swiper from 'react-native-swiper';
import SwiperScreen1 from './swiperScreen1.js';
import SwiperScreen2 from './swiperScreen2.js';
import SwiperScreen3 from './swiperScreen3.js';
import SwiperScreen4 from './swiperScreen4.js';
import { styles } from './stylesSwiper4.js';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js'
import api from '../../config/api.js'


const logo = require('../../assets/images/logo-2.png');
const roadImage = require('../../assets/images/roadImage.png');
export default class SwiperScreensEmpresa extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldNavigate: false,
            showPagination: true,
        }
    }
    handleNavigation() {
        this.setState({ shouldNavigate: true })
        if (this.state.shouldNavigate == true) {
            this.props.navigation.navigate('HomeCompany')
        }
    }
    componentWillUnmount() {
        this.setState({ shouldNavigate: false });
        
    }


    componentDidMount(){
        this.removePrimeiroAcesso();
    }
    removePrimeiroAcesso() {
        
        api.post('users/registrations/first_access')
            .then(async response => {
                //Grava chave para a proxima autenticação na API
         
            })
            .catch(async error => {
                //Grava chave para a proxima autenticação na API    
                
            })
    }

    render() {


        return (
            <Swiper 
              style={styles.wrapper} 
              showsButtons
              showsPagination={this.state.showPagination}
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
                if (numberIndex === 4) {
                  this.setState({showPagination: false});
                } else {
                  this.setState({showPagination: true});
                }
              }}
              dotColor="gray" 
              activeDotColor="#007f0b" 
              loop={false}>
                <SwiperScreen1 />
                <SwiperScreen2 />
                <SwiperScreen3 />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            resizeMode="contain"
                            resizeMethod="resize"
                            style={styles.imageLogo}
                            source={logo}
                        />
                    </View>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

                        <Text style={styles.instructions}>O solicitante irá chegar no estabelecimento e informar que pediu um saque ou depósito Blomia.</Text>
                        <Text style={styles.instructions}>Solicite a pessoa o código gerado e digite-o no seu aplicativo Blomia.</Text>
                        <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                          <View style={{ justifyContent: 'center', height: '15%' }}>
                              <Text style={styles.instructions}>SAQUE</Text>
                          </View>
                          <Text style={[styles.instructions]}>Somente entregue o dinheiro quando concluir no Blomia.</Text>
                          <View style={{ justifyContent: 'center', height: '15%' }}>
                              <Text style={styles.instructions}>DEPÓSITO</Text>
                          </View>
                          <Text style={styles.instructions}>Só finalize no Blomia após receber o dinheiro do depósito em mãos.</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', height: '25%' }}></View>
                </View>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            resizeMode="contain"
                            resizeMethod="resize"
                            style={styles.imageLogo}
                            source={logo}
                        />
                    </View>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

                        <Text style={styles.instructions}>Senha de solicitação</Text>
                        <Text style={styles.instructions}>
                          A qualquer momento você pode acessar o Perfil da empresa e
                          ir em Minhas senhas para cadastrar uma senha especifica para liberação saque/depósitos.</Text>
                        <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                          <Image
                              style={styles.imgPadLock}
                              resizeMethod="resize"
                              resizeMode="contain"
                              source={require('../../assets/images/padlock.png')}
                          />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', height: '25%' }}>
                            <ButtonCustom navegar={() => this.props.navigation.navigate("Login", {
                              redirect: "SenhaTransacaoCompany"
                            })}
                                btnColor={'#007f0b'}
                                textColor={'#ffffff'}
                                textButton={'DEFINIR SENHA AGORA'}
                            />
                            <ButtonCustom navegar={() => this.props.navigation.navigate("Login")}
                                btnColor={'#ffffff'}
                                textColor={'#707070'}
                                textButton={'COMEÇAR A USAR'}
                            />
                        </View>
                </View>
            </Swiper>
        );
    }
}