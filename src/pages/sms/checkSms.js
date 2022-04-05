/* eslint-disable */
import React from 'react';
import {  widthPercentageToDP as wp,  heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import { Image, KeyboardAvoidingView, View, Text, TouchableOpacity, Animated, Easing, TextInput } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import styles from './styles';
import api from '../../config/api';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';

import TextInputMask from 'react-native-text-input-mask';

// import SmsRetriever from 'react-native-sms-retriever';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import ModalDefault from '../../components/ModalDefault/ModalDefault';



export default class CheckSms extends React.Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.executeAnimation = this.executeAnimation.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.state = {
      bdColorCel: '#707070',
      celErro: false,
      celAlterado: '',
      textSMS: '',
      placeholderState: 0,
      colorText: 'black',
      shouldAnimate: 0,
      numFormatado: null,
      isModalVisible: false,
      exibirModal: false,
      MsgErro: [],
      isFocusFieldTel: false,

      //Variavel controlada para definir se o cadastro é de empresa ou de pessoas fisica (PF ou PJ)
      tipoCad: '',

      BiometriaDevice: false,
      resetSenha: false
    }

  }

  componentDidMount() {
    this.setState({celAlterado: ''})
    if (this.props.navigation.state.params && this.props.navigation.state.params.tipoCad) {

      this.setState({ tipoCad: this.props.navigation.state.params.tipoCad })
    }

    //Condicional para o reset de senha
    if (this.props.navigation.state.params && this.props.navigation.state.params.resetSenha ) {
      this.setState({ resetSenha: true })
    }


    this.StartImageRotateFunction();

    // Verifica se componente está recebendo valor de telefone pelo PROPS
    if (this.props.navigation.state.params.telUsuario) {
      let celular = this.props.navigation.state.params.telUsuario
      let fimCelular = celular.substr(celular.length - 4);
      let dddCelular = celular.substr(0, 2);

      this.setState({ numFormatado: celular })
    }



    this.checkBiometriaDevice();            

  }

  alterarNumero = async (num_tel) => {
    if(num_tel < 9) {
      this.setState({celErro: true, bdColorCel: 'red'})
    } else { 
      this.setState({spinner: true});

      const num_tel_formated = this.removeMascara(num_tel);

      const params = {
        user: {
          phone_number: num_tel_formated,
        },
      };


      await api.patch('/auth', params)
        .then(async response => {
          

          
          this.setState({ numFormatado: num_tel_formated, isModalVisible: !this.state.isModalVisible})
          this.setState({spinner: false});
        })
        .catch(async error => {
          
          this.setState({spinner: false});
        })
    }
  }


  async checkBiometriaDevice() {

    await FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => {
        this.setState({ BiometriaDevice: true })
      });

  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  
  executeAnimation = () => {
    this.state.shouldAnimate = 2.0;
    setTimeout(() => {
      this.state.shouldAnimate = 0;
    }, 800);
  }

  novoSms = async () => {

    this.StartImageRotateFunction();
    var rota = null;
    if(this.state.resetSenha == true){
      rota = '/user/validation?phone_number='+this.props.navigation.state.params.telUsuario.replace(/[^0-9]/g, '');
    } else {
      rota = '/user/validation';
    }
   

    await api.get(rota)
      .then(async response => {

        



      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição                
        


        if (error.response.data.errors == "You need to sign in or sign up before continuing.") {
          this.setState({ MsgErro: ["Antes de continuar você precisa logar."] })
          this.openModal();
        }
      });

  }

  removeMascara(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  handleValue = async () => {
    if (this.state.textSMS.length === 4) {

      if (this.props.navigation.state.params && this.props.navigation.state.params.tipoCad) {
        this.setState({ spinner: true });
        await api.post('/user/validation', { validation_code: this.state.textSMS })
          .then(async response => {
            this.setState({ spinner: false });
            //Atualiza tokens para proxima requisição                
            


            if (response.data.errors) {

              if (response.data.errors[0].detail == "invalid code") {

                this.setState({ MsgErro: ['Código inválido'] })
                this.openModal();
              }

              if (response.data.errors[0].detail == "expired code, require a new code") {
                this.setState({ MsgErro: ["Código expirado, solicite um novo"] })
                this.openModal();
              }

            }

            if (this.state.tipoCad != '') { //Fluxo para cadasto de novo usuário
              if (response.data.is_validated == true && this.state.tipoCad == 'PJ') {
                  this.props.navigation.navigate('CadastroEmpresaNav')
                // this.props.navigation.navigate('SwiperScreensEmpresa');
              }

              if (response.data.is_validated == true && this.state.tipoCad == 'PF') {
                // if (this.state.BiometriaDevice == true) {
                //   this.props.navigation.navigate('configBiometriaPg');
                // }
               
                // else {
                  this.props.navigation.navigate('Login');
                // }

              }
            }

          })
          .catch(async error => {
            // this.setState({ spinner: false });
            //Atualiza tokens para proxima requisição                
            


            if (error.response.data.errors == "You need to sign in or sign up before continuing.") {
              this.setState({ MsgErro: ["Antes de continuar você precisa logar."] })
            }
            else {
              this.setState({ MsgErro: ["Erro inesperado, tente novamente!"] })
            }

            this.openModal();
          });

      }
      else { //CONDIÇÃO ALTERAÇÃO DE SENHA
        this.setState({ spinner: true });
        const celular = this.props.navigation.state.params.telUsuario.replace(/[^0-9]/g, '')

        await api.post('/user/reset_password/validation?phone_number=' + celular, { validation_code: this.state.textSMS })
          .then(async response => {
            //Atualiza tokens para proxima requisição                
            

            this.setState({ spinner: false });
            if (response.data.is_validated == true) {
              this.props.navigation.navigate('ConfirmaNovaSenhaPg');
            }

            if (response.data.errors[0].detail == "expired code, require a new code") {
              this.setState({ MsgErro: ["Código expirado, gere um novo!"] })
              this.openModal();
            }

            if (response.data.errors[0].detail == "invalid code") {
              this.setState({ MsgErro: ["Código inválido!"] })
              this.openModal();
            }

          })
          .catch(async error => {
            //Atualiza tokens para proxima requisição                
            
            this.setState({ spinner: false });

          })
      }

      //   this.props.navigation.navigate('SwiperScreens')
    }
  }



  modal() { this.setState({ exibirModal: true }) }

  openModal = () => this.setState({ exibirModal: true })

  closeModal = () => this.setState({ exibirModal: false })

  toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible, celAlterado: '', celErro: false})

  // // Get the SMS message (second gif)
  // _onSmsListenerPressed = async () => {
  //   try {
  //     const registered = await SmsRetriever.startSmsRetriever();
  //     if (registered) {
  //       SmsRetriever.addSmsListener(event => {
  //         SmsRetriever.removeSmsListener();
  //       });
  //     }
  //   } catch (error) {
  //   }
  // };

  render() {


    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="white" />


        <ModalDefault tipoModal={'erro'} openModal={this.state.exibirModal} closeModal={this.closeModal} MsgErro={this.state.MsgErro} />

        <Image
          fadeDuration={0}
          style={styles.imgLogo}
          resizeMode="contain"
          resizeMethod="resize"
          source={require('../../assets/images/logo-2.png')}
        />
        <View style={styles.containerContent}>

          <Text style={styles.textDescription}>
            Aguarde enquanto validamos {'\n'} seu número via{' '}
            <Text style={{ fontWeight: 'bold' }}>SMS</Text>
          </Text>
          <View style={{flexDirection: 'column'}}>
            <View>
              <Text style={styles.textDescription}>
                Código de 4 dígitos enviado {'\n'}
              </Text>
            </View>
            <View style={styles.containerTel}>
                <Text style={[styles.textDescriptionTel, { fontWeight: 'bold' }]}> {this.state.numFormatado}</Text>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Image 
                    style={styles.pencilSize}
                    resizeMode={'contain'} 
                    source={require('../../assets/images/pencil.png')}/>
                </TouchableOpacity>
            </View>
            </View>
          <View style={{ alignSelf: 'center', top: 20 }}>
            <SmoothPinCodeInput
              placeholder={"0"}
              ref="smsField"
              cellSize={55}
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: 'gray',
              }}
              cellSpacing={18}
              cellStyleFocused={{
                borderColor: 'black',
              }}
              value={this.state.textSMS}
              onTextChange={text => this.setState({ textSMS: text }, () => { this.handleValue() })}
              onChange={this.handleValue}
              keyboardType='numeric'
            />
          </View>

          <Animated.Image
            style={styles.img2}
            style={[styles.img2, { transform: [{ rotate: RotateData }] }]}

            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../assets/images/reload.png')}
          />
          <Text style={styles.textDescription2}>Não recebeu o código?</Text>


        </View>
        <Ripple rippleCentered={true} onPress={this.novoSms} style={styles.circularButton}>
          <Text style={styles.loginButtonTextStyle}>NOVO CÓDIGO</Text>
        </Ripple>
        <Modal useNativeDriver={true}  onModalHide={() => {this.setState({ isFocusFieldTel: false })}} isVisible={this.state.isModalVisible}>
              <KeyboardAvoidingView behavior={'height'} style={styles.containerModal}>
                <View style={styles.tituloModal}>
                  <Text style={styles.textoTituloModal}>Alterar Número</Text>
                </View>
                <View style={styles.containerLabel}>
                  <Text style={styles.labelCel}>Celular</Text>
                </View>
                <View style={styles.inputCelContainer}>
                  {this.state.celErro ?
                  <TextInputMask  
                    onFocus={() => this.setState({bdColorCel: '#707070', isFocusFieldTel: true, celErro: false})}
                    mask={'[00] [00000]-[0000]'} 
                    keyboardType='number-pad'
                    onBlur={() => { this.setState({ isFocusFieldTel: false })}}
                    onChangeText={(text) => 
                    this.setState({celAlterado: text})} 
                    style={[styles.inputCel, this.state.celErro ? {borderColor: this.state.bdColorCel} : this.state.isFocusFieldTel ? {borderColor: '#477E22'} : { borderColor: '#B3B3B3' } ]} 
                    placeholder={"(00) 99999-0000"}>  
                  </TextInputMask>
                  :
                  <TextInputMask  
                    mask={'[00] [00000]-[0000]'} 
                    onFocus={() => this.setState({ isFocusFieldTel: true })}
                    onBlur={() => { this.setState({ isFocusFieldTel: false })}}
                    onChangeText={(text) => 
                    this.setState({celAlterado: text})} 
                    style={[styles.inputCel, this.state.isFocusFieldTel ? {borderColor: '#477E22'} : { borderColor: '#B3B3B3' }, ]} 
                    placeholder={"(00) 99999-0000"}
                    keyboardType='number-pad'
                    >  
                  </TextInputMask>
                  }
                </View>
                <View>
                  {this.state.celErro &&
                  <Text style={{paddingHorizontal: hp(2), marginTop: -10, color: 'red', width: '100%', textAlign: 'center'}}>
                    Deve conter DDD + 9 dígitos.
                  </Text>
                  
                  }  
                  </View>
                <View style={[styles.botões, {paddingBottom: hp(4) }]}>
                  <TouchableOpacity onPress={() => this.toggleModal()}>
                    <Text style={styles.estiloTextoBotão1}>CANCELAR</Text>
                  </TouchableOpacity>
                  <View style={{paddingHorizontal: 20}}/>
                  <TouchableOpacity onPress={() => this.alterarNumero(this.state.celAlterado)}>
                    <Text style={styles.estiloTextoBotão2}>ALTERAR</Text>
                  </TouchableOpacity>

                </View>
                <View style={{paddingVertical: 8}}/>
              </KeyboardAvoidingView>
        </Modal>      

      </View>
    );
  }

}