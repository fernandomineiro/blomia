/* eslint-disable */
import React, { Component } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from './styles';
import BtnFoto from '../../components/BtnFoto/BtnFoto';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import Modal from 'react-native-modal';
import Button from 'apsl-react-native-button';
import api from '../../config/api';
import { RNS3 } from 'react-native-s3-upload';
import credenciasS3 from '../../config/credencias3';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import { ButtonGroup } from 'react-native-elements';

class SelectionDocument extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            ContratoSocial: null,
            OutrosDocs: null,

            IcoContratoOk: false,
            IcoContratoErro: false,

            IcoDocsOk: false,
            IcoDocsErro: false,

            //Array com msg de erro para o inputs
            MsgErro: [],
            exibirModal: false,

            identificadorImg: null,

            urlContrato: null,
            urlDocs: null,

            //Variavel para controla o LOADING da tela
            spinner: false,
            selectInfo: false,

        }

    }

    componentDidMount() {
        var ano = new Date().getFullYear();
        var mes = new Date().getMonth() + 1;
        var diaMes = new Date().getDate();
        var hora = new Date().getUTCHours();
        var minuto = new Date().getUTCMinutes();
        var segundo = new Date().getUTCSeconds();
        var aleatorio = Math.floor(Math.random() * 100) + 1;

        var identificadorImg = "" + ano + mes + diaMes + hora + minuto + segundo + aleatorio
        this.setState({ identificadorImg: identificadorImg })

    }


    limpaMsgs(newArr) {
        this.setState({
            MsgErro: newArr,
        });
    }


    checkDocs = async () => {

        //Limpa todos as msgs de erro
        await this.limpaMsgs([]);

        if (this.state.ContratoSocial == null) {
            this.setState({ IcoContratoOk: false })
            this.setState({ IcoContratoErro: true })


            let msg = this.state.MsgErro.concat('Favor enviar foto do contrato social.');
            this.setState({ MsgErro: msg })

        }

        if (this.state.OutrosDocs == null) {
            this.setState({ IcoDocsOk: false })
            this.setState({ IcoDocsErro: true })
            // let msg = this.state.MsgErro.concat('Favor enviar a foto com o verso de seu RG.');
            // this.setState({ MsgErro: msg })
        }

        if (this.state.ContratoSocial == null) {
            this.openModal();
        }
        else {
            this.registraDoc();
        }


    }

    async registraDoc() {

        const contratoSocial = {
            uri: this.state.ContratoSocial,
            name: "contratoSocial_" + this.state.identificadorImg + ".png",
            type: "image/png"
        }

        const outrosDocs = {
            uri: this.state.OutrosDocs,
            name: "outrosDocs_" + this.state.identificadorImg + ".png",
            type: "image/png"
        }

        //Enviar foto para servidor Amozon S3
        this.setState({ spinner: true });
        await RNS3.put(contratoSocial, credenciasS3).then(response => {
            this.setState({ urlContrato: response.body.postResponse.location })
        }).catch(error => {
        });

        if (this.state.OutrosDocs != null) {
            //Enviar foto para servidor Amozon S3
            await RNS3.put(outrosDocs, credenciasS3).then(response => {
                this.setState({ urlDocs: response.body.postResponse.location })
            }).catch(error => {
            });

        }
        const idEmpresa = await AsyncStorage.getItem('blomia@idCompanyAutoLogin')

        if(this.state.outrosDocs == null)
        {
            this.setState({outrosDocs: "" })
        }

        //Enviar URL da imagem para o endpoint
        await api.patch(`companies?company_id=${this.props.client.company.id}`, {
            company:
            {
                social_contract_document: this.state.urlContrato,
                other_business_document: this.state.urlDocs
            }
        });

        this.setState({ spinner: false });

        this.props.navigation.navigate('registroCompletoPg');


    }

    openModal = () => this.setState({ exibirModal: true })

    closeModal = () => this.setState({ exibirModal: false })


    setStatusFoto = (valor, idBtn) => {

        if (idBtn == 'Contrato') {

            if (valor == 'cancelado') {
                // Controle icone indicador status foto
                this.setState({ IcoContratoErro: true })
                this.setState({ IcoContratoOk: false })

                //Romove imagem caso cancelado
                this.setState({ ContratoSocial: null })
            }
            else {
                // Controle icone indicador status foto
                this.setState({ IcoContratoErro: false })
                this.setState({ IcoContratoOk: true })

                // Adiciona BASE64 da foto da variavel
                this.setState({ ContratoSocial: valor })
            }
        }

        if (idBtn == 'OutrosDoc') {

            if (valor == 'cancelado') {
                // Controle icone indicador status foto
                this.setState({ IcoDocsErro: true })
                this.setState({ IcoDocsOk: false })

                // Adiciona BASE64 da foto da variavel
                this.setState({ OutrosDocs: null })
            }
            else {
                // Controle icone indicador status foto
                this.setState({ IcoDocsErro: false })
                this.setState({ IcoDocsOk: true })

                // Adiciona BASE64 da foto da variavel
                this.setState({ OutrosDocs: valor })

            
            }
        }



    }


    render() {

        const { navigate } = this.props.navigation

        return (
            <View style={styles.container}>
                <Spinner visible={this.state.spinner} color="white" textStyle={styles.spinnerTextStyle} />
                <ModalDefault openModal={this.state.exibirModal} closeModal={this.closeModal} MsgErro={this.state.MsgErro} tipoModal={'erro'} />

                <Modal isVisible={!!this.state.selectInfo}>
                  <View style={styles.modalInfo}>
                    <View style={styles.containerModalInfo}>
                      <Text style={styles.titleModalInfo}></Text>
                      <Ripple
                        rippleCentered={true}
                        onPress={() => {
                          this.setState({selectInfo: false});
                        }}
                        style={[styles.btnCloseModal, {backgroundColor: 'grey'}]}>
                        <Text style={styles.textBtnMenu}>X</Text>
                      </Ripple>
                    </View>
                    <View style={styles.bodyModalInfo}>
                        <Text style={styles.titleModalImportant}>
                          Contrato social
                        </Text>
                        <Text style={styles.textModalInfo}>
                          Pode ser submetido o próprio contrato social que regulamenta a constituição da empresa, no caso de MEI pode ser enviado o comprovante de MEI.
                        </Text>
                        <Text style={styles.textModalInfo}>
                          <Text style={styles.textModalBold}>Importante:</Text> deve ser enviado apenas um arquivo.
                        </Text>
                        <Text style={styles.titleModalImportant}>
                          Outros documentos
                        </Text>
                        <Text style={styles.textModalInfo}>
                          Enviar apenas se houver documentos complementares ao contrato social. Como por exemplo procurações, aditivo, minuta, etc.
                        </Text>
                        <Text style={styles.textModalInfo}>
                          <Text style={styles.textModalBold}>Importante:</Text> deve ser enviado apenas um arquivo com esses documentos.
                        </Text>
                    </View>
                  </View>
                </Modal>
                <View style={styles.boxLogo} >
                    <Image style={styles.imgLogo}
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={require('../../assets/images/blomialogo.png')} />
                </View>
                <View style={styles.boxRow1} >
                    <Text style={styles.textDescription}>Clique para anexar cópia do contrato social e outros documentos</Text>
                </View>

                <View style={styles.boxRow3} >

                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30, }}>
                        <Text style={styles.insertButtonTextStyle}>Clique para inserir</Text>
                    </View>

                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {<BtnFoto idButton={'Contrato'} SetStatusFoto={this.setStatusFoto} textButton={"* Contrato Social"} />}

                        <View style={{ flex: 0.1 }}>
                            {this.state.IcoContratoOk == true && <Image style={styles.icoCheck} source={require('../../assets/images/tick.png')} />}
                            {this.state.IcoContratoErro == true && <Image style={styles.icoCheck} source={require('../../assets/images/cancel.png')} />}
                        </View>
                    </View>
                    <Text style={{ marginLeft: '20%', paddingTop: -10, marginTop: -10, fontSize: 11, }}>Formatos: pdf, jpg ou png</Text>

                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {<BtnFoto idButton={'OutrosDoc'} SetStatusFoto={this.setStatusFoto} textButton={"Outros documentos"} />}
                        <View style={{ flex: 0.1 }}>
                            {this.state.IcoDocsOk == true && <Image style={styles.icoCheck} source={require('../../assets/images/tick.png')} />}
                            {this.state.IcoDocsErro == true && <Image style={styles.icoCheck} source={require('../../assets/images/cancel.png')} />}
                        </View>
                    </View>
                    <Text style={{ marginLeft: '20%', paddingTop: -10, marginTop: -10, fontSize: 11, }}>Formatos: pdf, jpg ou png</Text>

                    {/* <Text style={{ marginTop: '5%', alignSelf: 'center' }}>Duvidas? CLIQUE AQUI</Text> */}
                    <TouchableOpacity onPress={() => {
                          this.setState({selectInfo: true});
                        }} style={{ marginTop: '5%', alignSelf: 'center' }}>
                        <Text style={styles.doubtsButtonText}>Dúvidas?
                                     <Text style={{ fontWeight: 'bold', color: '#707070' }}> CLIQUE AQUI</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.boxRow4} >

                    <Ripple rippleCentered={true} style={styles.btnCustom} onPress={() => this.checkDocs()}>
                        {/* <Ripple style={styles.btnCustom} onPress={() => navigate('cadastroOkPg')}> */}
                        <Text style={styles.textBtnCustom}>FINALIZAR</Text>
                    </Ripple>


                </View>


            </View >
        )
    }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(SelectionDocument);