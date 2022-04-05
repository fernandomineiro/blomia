import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import api from '../../config/api';

import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

export default class preAcesso extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleModalPolicy: false,
      isVisibleModalTerms: false,
      terms: '',
      privacyPolicy: '',
    };
  }
  navegarCadastroPg = () => {
    this.props.navigation.navigate('tipoCadastro');
  };

  getPolicy = async () => {
    this.setState({
      privacyPolicy: '',
      isVisibleModalPolicy: true,
    });
    await api
      .get('/privacy')
      .then(response => {
        this.setState({
          privacyPolicy: response.data.content,
        });
      })
      .catch(error => {});
  };

  getTerms = async () => {
    this.setState({
      terms: '',
      isVisibleModalTerms: true,
    });
    await api
      .get('/terms_and_conditions')
      .then(response => {
        this.setState({
          terms: response.data.content,
        });
      })
      .catch(error => {});
  };

  navegarLoginPg = () => {
    this.props.navigation.navigate('AcessoNav');
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            fadeDuration={0}
            style={styles.img}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../assets/images/blomialogo.png')}
          />
        </View>
        <Modal isVisible={this.state.isVisibleModalPolicy}>
          <View style={styles.containerModalPolicy}>
            <ScrollView
              style={{
                flex: 1,
                marginVertical: 20,
              }}>
              <View style={styles.contentModalPolicy}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 15,
                      marginBottom: 20,
                    }}>
                    Política de privacidade
                  </Text>
                </View>
                {this.state.privacyPolicy !== '' ? (
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 14,
                    }}>
                    {this.state.privacyPolicy}
                  </Text>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size="small" color="#007f0b" />
                  </View>
                )}
              </View>
            </ScrollView>

            <View style={styles.footerModalPolicy}>
              <ButtonCustom
                rippleCentered={true}
                navegar={() => this.setState({isVisibleModalPolicy: false})}
                textButton={'FECHAR'}
                btnColor={'#007f0b'}
                textColor={'white'}
                borderColor={'#007f0b'}
              />
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isVisibleModalTerms}>
          <View style={styles.containerModalPolicy}>
            <ScrollView
              style={{
                flex: 1,
                marginVertical: 20,
              }}>
              <View style={styles.contentModalPolicy}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 15,
                      marginBottom: 20,
                    }}>
                    Política de privacidade
                  </Text>
                </View>
                {this.state.terms !== '' ? (
                  <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14}}>
                    {this.state.terms}
                  </Text>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size="small" color="#007f0b" />
                  </View>
                )}
              </View>
            </ScrollView>
            <View style={styles.footerModalPolicy}>
              <ButtonCustom
                rippleCentered={true}
                navegar={() => this.setState({isVisibleModalTerms: false})}
                textButton={'FECHAR'}
                btnColor={'#007f0b'}
                textColor={'white'}
                borderColor={'#007f0b'}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.box}>
          <View>
            <ButtonCustom
              rippleCentered={true}
              navegar={this.navegarCadastroPg}
              textButton={'CADASTRAR'}
              btnColor={'#007f0b'}
              textColor={'white'}
              borderColor={'#007f0b'}
            />

            <ButtonCustom
              navegar={this.navegarLoginPg}
              textButton={'ENTRAR'}
              btnColor={'#ffffff'}
              textColor={'#4d4d4d'}
              borderColor={'#4d4d4d'}
            />
          </View>

          <View style={styles.containerPoliticas}>
            <Text style={styles.textoPoliticas}>
              Ao utilizar este aplicativo você concorda com a nossa Politica de
              Privacidade e os Termos de Uso, Leia em:
            </Text>
            <TouchableOpacity onPress={this.getPolicy}>
              <Text style={styles.textoBtnPoliticas}>
                Politica de Privacidade
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.getTerms}>
              <Text style={styles.textoBtnPoliticas}>Termo de Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
