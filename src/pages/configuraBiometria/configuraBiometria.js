/* eslint-disable */
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { styles } from './styles'
import { IMAGES } from '../../constantes/images.js'
import { TAMANHOS } from '../../constantes/tamanhosDeFontes.js'
import LogoBlomia from '../../components/Logo/LogoBlomia.js'
import ImagemBiometria from '../../components/Biometria/ImagemBiometria.js'
import TextoPadrao from '../../components/TextoPadrao/TextoPadrao.js'
import TextoSemiNegrito from '../../components/SemiNegrito/SemiNegrito.js'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js'

import FingerprintScanner from 'react-native-fingerprint-scanner';
// import * as Keychain from 'react-native-keychain';





export default class ConfiguraBiometria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IdDevice: null,
            BiometriaDevice: false
        }
    }

    componentDidMount() {
        this.ModalBiometria;
    }

    ModalBiometria = async () => {



        await FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => this.setState({ BiometriaDevice: true }));


        if (this.state.BiometriaDevice == true) {
            //Abre modal da biometria
            FingerprintScanner
                .authenticate({ description: 'Cadastro de biometria', cancelButton: 'CANCELAR' })
                .then(() => {
                    // this.props.handlePopupDismissed();
                    this.registraBiometria()

                })
                .catch((error) => {
                    // this.props.handlePopupDismissed();
                    // Alert.alert(error.message);
                });
        }

    }

    //Desmonta componente da biometria
    componentWillUnmount = () => FingerprintScanner.release()

    //Se autenticação falhar exibe erro
    handleAuthenticationAttempted = (error) => this.setState({ errorMessage: error.message });

    async registraBiometria() {

        try {
            // Recupera credencias armazenadas
            // const credentials = await Keychain.getGenericPassword();

        } catch (error) {
          // so para manter o catch
        }

        //AQUI DEVE SER ADICIONAR O ENDPOINT QUE INFORMA QUE O USUÁRIO VAI UTILIZAR BIOMETRIA

        this.props.navigation.navigate('concluiBiometriaPg');
        // await DeviceInfo.getAndroidId().then(androidId => {

        //     this.setState({IdDevice: androidId });
        // });



    }

    removeCredenciais = async () => {
        // await Keychain.resetGenericPassword();
        this.props.navigation.navigate('SwiperScreens', {tipoSwiper: 'cadastroUser'});
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <LogoBlomia />
                </View>
                <View style={styles.content}>

                    <View style={{ flex: 0.5 }}>
                        <ImagemBiometria />
                    </View>


                    {/* <TextoSemiNegrito Tamanho={TAMANHOS.TAMANHO_MAIOR} Conteudo={'Quer usar a biometria?'}  /> */}
                   <Text style={styles.textTitulo}> Quer usar a biometria?</Text>

                    <View style={{ flex: 0.5, alignItems: 'center' }}>


                        <View style={{ flex: 0.7, paddingHorizontal: 20 }}>
                            <TextoPadrao
                                Alinhamento={'center'}
                                Tamanho={TAMANHOS.TAMANHO_PADRAO}
                                Conteudo={'Configure agora o uso da digital para deixar seu acesso ao Blomia ainda mais rápido. Você também está ativando a digital para algumas atividade no app.'}
                                EspaçamentoHorizontal={30}
                            />
                         </View>

                         <View style={{ flex: 0.7, paddingHorizontal: 20 }}>
                            <TextoPadrao
                                Alinhamento={'center'}
                                Tamanho={TAMANHOS.TAMANHO_PADRAO}
                                Conteudo={'Ao habilitar esse recurso todas as digitais cadastradas no seu telefone poderá acessar esta conta no aplicativo.'}
                                EspaçamentoHorizontal={30}
                            />
                        </View>
                    </View>

                </View>

                <View style={styles.footer}>
                    <ButtonCustom btnColor={'#007f0b'} borderColor={'#007f0b'} navegar={this.ModalBiometria} textButton={'CONTINUAR'} textColor={'#FFFFFF'} />

                    <ButtonCustom btnColor={'#FFFFFF'} navegar={this.removeCredenciais} textButton={'PULAR'} textColor={'#4d4d4d'} bdColor={'#4d4d4d'} />

                </View>
            </View>
        )
    }
}
