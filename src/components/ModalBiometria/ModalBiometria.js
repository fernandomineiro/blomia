import React from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import Modal from 'react-native-modal'
import {styles} from './styles'
import {IMAGES} from '../../constantes/images.js'

function ModalBiometria(props) { 
    return ( 
        <Modal useNativeDriver={true} animationType='fade' isVisible={props.openModal2}>
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.containerLeft}>
                        <View style={styles.containerImagem}>
                            <Image style={styles.fotoBiometria} source={IMAGES.BIOMETRIA}/>
                        </View>
                        <View style={styles.cancelar}>
                            <TouchableOpacity onPress={props.closeModal2} style={{paddingBottom: 10}}>
                                <Text style={styles.estiloTexto}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerRight}> 
                        <View style={styles.inserirParaAlterar}>
                            <Text style={styles.textoInstrucao}>Inserir digital para alterar</Text>
                        </View>
                        <View style={styles.validarComSenha}>
                            <TouchableOpacity style={{paddingBottom: 10}}>
                                <Text style={[styles.estiloTexto, {color: 'green'}]}>Validar com senha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </Modal>
            
    )
}

export default ModalBiometria