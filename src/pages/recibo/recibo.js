import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Modal from 'react-native-modal';

import {styles} from './styles.js';
export default class Recibo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '000',
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Setting"
          isHome={true}
          navigation={this.props.navigation}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Dinheiro disponível R${this.props.saldo}
            </Text>
          </View>
          <Text style={styles.question}>
            Valido até:{' '}
            <Text style={[styles.question, {color: 'black'}]}>13/04/2020</Text>
          </Text>
          <View style={styles.valueView}>
            <Text style={styles.inputValue}>R$50,00</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textOrientation}>
              Utilize o número do código de barras abaixo para efetuar o seu
              depósito
            </Text>
            <Text style={styles.textBarCode}>
              23793.381128 60018.316244 93000.063300 4 81620000005000
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            {/* <TextInputMask
                            style={this.state.value == '000' || this.state.value == 'R$0,00' ? [styles.inputValue, { color: 'gray' }]
                            : [styles.inputValue, { color: '#007f0b' }]}
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                            }}
                            onFocus={() => this.setState({ inputColor: '#007f0b' })}
                            onBlur={() => this.setState({ inputColor: 'gray' })}
                            onChangeText={text => {
                                this.setState({
                                    value: text,
                                }),
                            }}
                            placeholder={this.state.value}
                            value={this.state.value}

                            /> */}
          </View>
        </View>
        <View style={styles.footer}>
          {/* empresaTranscaoClientPg */}
          {/* <TouchableOpacity style={styles.gpsButtonStyle} onPress={() =>  this.toggleModal()}> */}
          <TouchableOpacity
            style={
              this.state.value == '000' || this.state.value == 'R$0,00'
                ? [styles.gpsButtonStyle, {backgroundColor: '#007f0b'}]
                : styles.gpsButtonStyle
            }
            onPress={() => this.props.navigation.navigate('ReciboPg')}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveFontSize(2),
              }}>
              COPIAR CÓDIGO
            </Text>
          </TouchableOpacity>
          <View style={{paddingVertical: heightPercentageToDP(1)}} />
          <TouchableOpacity
            style={
              this.state.value == '000' || this.state.value == 'R$0,00'
                ? [
                    styles.gpsButtonStyle,
                    {
                      backgroundColor: '#ffffff',
                      borderColor: '#4c4c4c',
                      borderWidth: 0.85,
                    },
                  ]
                : styles.gpsButtonStyle
            }
            onPress={() => this.toggleModal()}>
            <Text
              style={{
                color: '#4c4c4c',
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveFontSize(2),
              }}>
              CANCELAR BOLETO
            </Text>
          </TouchableOpacity>
        </View>
        <Modal useNativeDriver={true} isVisible={this.state.isModalVisible}>
          <View>
            <View style={styles.contentModal}>
              <View style={{height: '60%'}}>
                <Text style={styles.textContentModal0}>
                  Solicitação cancelada
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  top: 20,
                  width: '100%',
                  height: '30%',
                  justifyContent: 'flex-end',
                }}>
                <View style={{paddingRight: widthPercentageToDP(10)}}>
                  <TouchableOpacity onPress={() => this.toggleModal()}>
                    <Text style={styles.textContentModal2}>FECHAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
