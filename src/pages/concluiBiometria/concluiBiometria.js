import React from 'react'
import { View, Image } from 'react-native'
import { styles }  from './styles.js'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { IMAGES } from '../../constantes/images.js'
import ButtonCustom  from '../../components/ButtonCustom/ButtonCustom.js'
import LogoBlomia from '../../components/Logo/LogoBlomia.js'
import ImagemConfirmação from '../../components/Confirmação/ImagemConfirmação.js'
import TextoPadrao from '../../components/TextoPadrao/TextoPadrao.js'
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo.js'
export default class ConcluiBiometria extends React.Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            isModalVisible: false
        }
    }
    proximaPg = async () => {
       
        this.props.navigation.navigate('SwiperScreens');        
    }
    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible})
    }
    render () { 

        return ( 
            <View style={styles.container}>
                <View style={styles.header}>
                    <LogoBlomia/>
                </View>

                <View style={styles.content}>
                    <View style={{flex: 0.6}}>
                        <ImagemConfirmação/>
                    </View>
                    
                    <View style={{flex: 0.3}}>
                        <TextoPadrao 
                            Tamanho={responsiveFontSize(3)} 
                            Conteudo={'Biometria configurada com sucesso!'}
                            Alinhamento={'center'}
                            EspaçamentoHorizontal={30}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <ButtonCustom 
                        btnColor={'#007f0b'} 
                        borderColor={'#007f0b'}
                        textButton={'CONTINUAR'} 
                        textColor='#FFFFFF'
                        navegar={() => this.proximaPg()}
                    />
                </View>
            </View>
        )
    }
}
