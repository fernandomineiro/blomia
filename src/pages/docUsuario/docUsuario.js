import React from 'react';
import {Image, View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from './styles';
import BtnFoto from '../../components/BtnFoto/BtnFoto';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import api from '../../config/api';
import credenciasS3 from '../../config/credencias3';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

import {ButtonGroup} from 'react-native-elements';
import {RNS3} from 'react-native-s3-upload';
import {connect} from 'react-redux';

class SelectionDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedDocument: '',
      documentFront: ['Foto com RG (frente)', 'Foto com CNH (frente)'],
      documentBack: ['Foto com RG (verso)', 'Foto com CNH (verso)'],

      IcoRgFrenteOk: false,
      IcoRgFrenteErro: false,

      IcoRgVersoOk: false,
      IcoRgVersoErro: false,

      IcoCnhOk: false,
      IcoCnhErro: false,

      fotoRgFrente: null,
      fotoRgVerso: null,
      fotoCnh: null,

      //Array com msg de erro para o inputs
      MsgErro: [],
      exibirModal: false,

      identificadorImg: null,

      //Variavel para controla o LOADING da tela
      spinner: false,

      urlRgFrente: null,
      urlRgVerso: null,
      urlCnh: null,
      showModalNewCompany: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    var ano = new Date().getFullYear();
    var mes = new Date().getMonth() + 1;
    var diaMes = new Date().getDate();
    var hora = new Date().getUTCHours();
    var minuto = new Date().getUTCMinutes();
    var segundo = new Date().getUTCSeconds();
    var aleatorio = Math.floor(Math.random() * 100) + 1;

    var identificadorImg =
      '' + ano + mes + diaMes + hora + minuto + segundo + aleatorio;
    this.setState({identificadorImg: identificadorImg});
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});

    if (selectedIndex == 0) {
      this.setState({
        IcoCnhOk: false,
        IcoCnhErro: false,

        fotoCnh: null,
      });
    } else if (selectedIndex == 1) {
      this.setState({
        IcoRgFrenteOk: false,
        IcoRgFrenteErro: false,
        IcoRgVersoOk: false,
        IcoRgVersoErro: false,

        fotoRgFrente: null,
        fotoRgVerso: null,
      });
    }
  }

  limpaMsgs(newArr) {
    this.setState({
      MsgErro: newArr,
    });
  }

  checkDocs = async () => {
    //Limpa todos as msgs de erro
    await this.limpaMsgs([]);

    if (this.state.selectedIndex == 0) {
      if (this.state.fotoRgFrente == null) {
        this.setState({IcoRgFrenteOk: false});
        this.setState({IcoRgFrenteErro: true});

        let msg = this.state.MsgErro.concat(
          'Favor enviar a foto com a frente de seu RG.',
        );
        this.setState({MsgErro: msg});
      }

      if (this.state.fotoRgVerso == null) {
        this.setState({IcoRgVersoOk: false});
        this.setState({IcoRgVersoErro: true});
        let msg = this.state.MsgErro.concat(
          'Favor enviar a foto com o verso de seu RG.',
        );
        this.setState({MsgErro: msg});
      }

      if (this.state.fotoRgFrente == null || this.state.fotoRgVerso == null) {
        this.openModal();
      } else {
        this.registraDoc();
      }
    } else if (this.state.selectedIndex == 1) {
      if (this.state.fotoCnh == null) {
        this.setState({IcoCnhOk: false});
        this.setState({IcoCnhErro: true});

        let msg = this.state.MsgErro.concat('Favor enviar a foto de sua CNH.');
        this.setState({MsgErro: msg});

        this.openModal();
      } else {
        this.registraDoc();
      }
    }
  };

  async registraDoc() {
    if (this.state.selectedIndex == 0) {
      //Pega foto tirada pelo usuário
      const rgFrente = {
        uri: this.state.fotoRgFrente,
        name: 'rgFrente_' + this.state.identificadorImg + '.png',
        type: 'image/png',
      };

      const rgVerso = {
        uri: this.state.fotoRgVerso,
        name: 'rgVerso_' + this.state.identificadorImg + '.png',
        type: 'image/png',
      };

      //Enviar foto para servidor Amozon S3
      this.setState({spinner: true});
      await RNS3.put(rgFrente, credenciasS3)
        .then(response => {
          this.setState({urlRgFrente: response.body.postResponse.location});
        })
        .catch(error => {});

      //Enviar foto para servidor Amozon S3
      await RNS3.put(rgVerso, credenciasS3)
        .then(response => {
          this.setState({urlRgVerso: response.body.postResponse.location});
        })
        .catch(error => {});

      //Enviar URL da imagem para o endpoint
      await api
        .patch('/auth', {
          user: {
            personal_document_type: 'RG',
            self_front_side_document_url: this.state.urlRgFrente,
            self_back_side_document_url: this.state.urlRgVerso,
          },
        })
        .then(async response => {})
        .catch(async error => {});

      this.setState({spinner: false});
    } else if (this.state.selectedIndex == 1) {
      //Pega foto tirada pelo usuário
      const cnh = {
        uri: this.state.fotoCnh,
        name: 'cnh_' + this.state.identificadorImg + '.png',
        type: 'image/png',
      };

      //Enviar foto para servidor Amozon S3
      this.setState({spinner: true});
      await RNS3.put(cnh, credenciasS3)
        .then(response => {
          this.setState({urlCnh: response.body.postResponse.location});
        })
        .catch(error => {});

      //Enviar URL da imagem para o endpoint
      await api
        .patch('/auth', {
          user: {
            personal_document_type: 'CNH',
            self_front_side_document_url: this.state.urlCnh,
          },
        })
        .then(async response => {})
        .catch(async error => {});

      this.setState({spinner: false});
    }

    //Recuperar aariavel salva no asyncStorage para diferenciar o fluxo das telas seguintes | Definida na tela tipoEmpresa
    const tipoEmpresa = await AsyncStorage.getItem('tipoEmpresa');

    if (tipoEmpresa === 'formal' || tipoEmpresa === 'informal') {
      if (this.props.client.first_access === true) {
        this.props.navigation.navigate('Login');
      } else {
        this.setState({showModalNewCompany: true});
      }
    } else {
      this.props.navigation.navigate('sacarCliente');
    }
  }

  openModal = () => this.setState({exibirModal: true});

  closeModal = () => this.setState({exibirModal: false});

  setStatusFoto = (valor, idBtn) => {
    if (idBtn == 'RgFrente') {
      if (valor == 'cancelado') {
        // Controle icone indicador status foto
        this.setState({IcoRgFrenteErro: true});
        this.setState({IcoRgFrenteOk: false});

        //Romove imagem caso cancelado
        this.setState({fotoRgFrente: null});
      } else {
        // Controle icone indicador status foto
        this.setState({IcoRgFrenteErro: false});
        this.setState({IcoRgFrenteOk: true});

        // Adiciona BASE64 da foto da variavel
        this.setState({fotoRgFrente: valor});
      }
    }

    if (idBtn == 'RgVerso') {
      if (valor == 'cancelado') {
        // Controle icone indicador status foto
        this.setState({IcoRgVersoErro: true});
        this.setState({IcoRgVersoOk: false});

        // Adiciona BASE64 da foto da variavel
        this.setState({fotoRgVerso: null});
      } else {
        // Controle icone indicador status foto
        this.setState({IcoRgVersoErro: false});
        this.setState({IcoRgVersoOk: true});

        // Adiciona BASE64 da foto da variavel
        this.setState({fotoRgVerso: valor});
      }
    }

    if (idBtn == 'CNH') {
      if (valor == 'cancelado') {
        // Controle icone indicador status foto
        this.setState({IcoCnhErro: true});
        this.setState({IcoCnhOk: false});

        // Adiciona BASE64 da foto da variavel
        this.setState({fotoCnh: null});
      } else {
        // Controle icone indicador status foto
        this.setState({IcoCnhErro: false});
        this.setState({IcoCnhOk: true});

        // Adiciona BASE64 da foto da variavel
        this.setState({fotoCnh: valor});
      }
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const buttons = ['RG', 'CNH'];
    const {selectedIndex} = this.state;
    const selectedFront = this.state.documentFront[this.state.selectedIndex];
    const selectedBack = this.state.documentBack[this.state.selectedIndex];
    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.showModalNewCompany}>
          <View style={styles.modalNewCompany}>
            <Image
              style={styles.imgLogo}
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../../assets/images/blomialogo.png')}
            />
            <Text style={styles.titleModal}>
              Empresa cadastrada com sucesso!
            </Text>
            <Text style={styles.infoModal}>
              Agora você pode acessar o aplicativo pela conta pessoal ou pela
              empresa.
            </Text>
            <Image
              style={styles.imginfoModal}
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../../assets/images/infoNewCompany.png')}
            />
            <Text style={styles.infoModal}>
              Se deseja acessar agora clique em “ENTRAR COM EMPRESA”
            </Text>
            <View style={styles.containerButtonsModal}>
              <Ripple
                rippleCentered={true}
                style={styles.btnModal}
                onPress={async () => {
                  this.setState({showModalNewCompany: false});
                  this.props.navigation.navigate('SwiperScreensEmpresa');
                }}>
                <Text style={styles.textBtnCustom}>ENTRAR COM EMPRESA</Text>
              </Ripple>
              <Ripple
                rippleCentered={true}
                style={[
                  styles.btnModal,
                  {
                    backgroundColor: '#fff',
                    borderColor: '#707070',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}
                onPress={async () => {
                  await AsyncStorage.removeItem('blomia@idCompanyAutoLogin');
                  this.setState({showModalNewCompany: false});

                  this.props.navigation.navigate('HomeNavCliente');
                }}>
                <Text style={[styles.textBtnCustom, {color: '#707070'}]}>
                  INÍCIO
                </Text>
              </Ripple>
            </View>
          </View>
        </Modal>
        <Spinner
          visible={this.state.spinner}
          color="white"
          textStyle={styles.spinnerTextStyle}
        />
        <ModalDefault
          openModal={this.state.exibirModal}
          closeModal={this.closeModal}
          MsgErro={this.state.MsgErro}
          tipoModal={'erro'}
        />
        <View style={styles.boxLogo}>
          <Image
            style={styles.imgLogo}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../assets/images/blomialogo.png')}
          />
        </View>
        <View style={styles.boxRow1}>
          <Text style={styles.textDescription}>
            Selecione o documento que você, sócio/proprietário, deseja enviar
          </Text>
        </View>
        <View style={styles.boxRow2}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.btnsGroup}
            textStyle={styles.buttonsTextStyle}
            selectedButtonStyle={styles.btnSelected}
          />
        </View>
        <View style={styles.boxRow3}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 30,
            }}>
            <Text style={styles.insertButtonTextStyle}>
              Clique para inserir
            </Text>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            {this.state.selectedIndex == 0 && (
              <BtnFoto
                idButton={'RgFrente'}
                SetStatusFoto={this.setStatusFoto}
                textButton={'Foto com RG (frente)'}
              />
            )}
            <View style={{flex: 0.1}}>
              {this.state.IcoRgFrenteOk == true && (
                <Image
                  style={styles.icoCheck}
                  source={require('../../assets/images/tick.png')}
                />
              )}
              {this.state.IcoRgFrenteErro == true && (
                <Image
                  style={styles.icoCheck}
                  source={require('../../assets/images/cancel.png')}
                />
              )}
            </View>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            {this.state.selectedIndex == 0 && (
              <BtnFoto
                idButton={'RgVerso'}
                SetStatusFoto={this.setStatusFoto}
                textButton={'Foto com RG (verso)'}
              />
            )}
            <View style={{flex: 0.1}}>
              {this.state.IcoRgVersoOk == true && (
                <Image
                  style={styles.icoCheck}
                  source={require('../../assets/images/tick.png')}
                />
              )}
              {this.state.IcoRgVersoErro == true && (
                <Image
                  style={styles.icoCheck}
                  source={require('../../assets/images/cancel.png')}
                />
              )}
            </View>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            {this.state.selectedIndex == 1 && (
              <BtnFoto
                idButton={'CNH'}
                SetStatusFoto={this.setStatusFoto}
                textButton={'Foto com CNH aberta'}
              />
            )}
            <View style={{flex: 0.1}}>
              {this.state.IcoCnhOk == true && (
                <Image
                  style={styles.icoCheck}
                  source={require('../../assets/images/tick.png')}
                />
              )}
              {this.state.IcoCnhErro == true && (
                <Image
                  style={styles.icoCheck}
                  source={require('../../assets/images/cancel.png')}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.boxRow4}>
          <Ripple
            rippleCentered={true}
            style={styles.btnCustom}
            onPress={() => this.checkDocs()}>
            <Text style={styles.textBtnCustom}>CONTINUAR</Text>
          </Ripple>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(SelectionDocument);
