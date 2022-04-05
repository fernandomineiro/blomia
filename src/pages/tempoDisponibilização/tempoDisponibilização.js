import React,{Component} from 'react'
import {View, Image, Text} from 'react-native'
import {
    responsiveFontSize as responsiveFont
} from "react-native-responsive-dimensions";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { styles } from './styles.js'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.js'
const logo = require('../../assets/images/logo-2.png'); 

export default class TempoDisponibilização extends Component { 
    render () { 
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.imageLogo} 
                        resizeMethod={'resize'}
                        resizeMode={'contain'}
                        source={logo}
                    />
                </View>
                <View style={{alignItems: 'center', height: '20%'}}>
                    <Text style={{fontFamily: 'Montserrat-Bold', fontSize: responsiveFont(2.5)}}>Até 3 dias úteis</Text>
                    <Image 
                        source={require('../../assets/images/timeline.png')}
                        resizeMethod={'resize'}
                        resizeMode={'contain'}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '80%'}}>
                        <Text style={{fontFamily: 'Montserrat-Medium', fontSize: responsiveFont(2)}}>
                            Pagamento
                        </Text>
                        <Text style={{fontFamily: 'Montserrat-Medium', fontSize: responsiveFont(2)}}>
                            Dinheiro disponível
                        </Text>
                    </View>
                </View>
                <View style={{height: '40%', alignItems: 'center'}}>
                    <Text style={{flex: 0.5, textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: responsiveFont(2.5), paddingHorizontal: wp(10)}}>
                        Devido ao tempo de processamento de boletos a disponibilização pode levar até 3 dias úteis.
                    </Text>
                    <Text style={{flex: 0.5, textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: responsiveFont(2.2), paddingHorizontal: wp(14)}}>
                        Este é o tempo médio que os bancos levam para nos enviar as informações do seu pagamento.
                    </Text>
                </View>
                <View style={{height: '24%', alignItems: 'center', justifyContent: 'center'}}>
                    <ButtonCustom 
                        btnColor={'#007f0b'} 
                        textColor={'#ffffff'} 
                        textButton={'CONTINUAR'}
                    />
                </View>

            </View>
        )
    }
}