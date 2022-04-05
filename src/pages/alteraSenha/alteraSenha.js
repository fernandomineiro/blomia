import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles, stylesAlter} from './styles.js';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import Logo from '../../components/Logo/LogoBlomia.js';
class AlterPasswordUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textPwd1: '',
      textPwd2: '',
      x: '',
      color: '#808080',
      fontSizePassword1: responsiveFont(5),
      fontSizePassword2: responsiveFont(5),
      alterado: '',
    };
  }
  render() {
    // const { navigate } = this.props.navigation;
    if (this.state.alterado == 'sim') {
      return (
        <View style={stylesAlter.container}>
          {/* <CustomHeader title="AlterPasswordComplete" navigation={this.props.navigation}/> */}
          <View style={stylesAlter.header}>
            <Logo />
          </View>
          <View style={stylesAlter.content}>
            <Image
              style={stylesAlter.padlock}
              source={require('../../assets/images/padlock.png')}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <View style={stylesAlter.footer}>
            <Text style={stylesAlter.text}>Senha alterada com sucesso</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({alterado: 'nao'}),
                  this.props.navigation.navigate(
                    this.props.client.company ? 'HomeCompany' : 'HomeClient',
                  );
              }}
              style={stylesAlter.button}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveFont(2),
                }}>
                RETORNAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {/* <CustomHeader title="AlterPasswordUser" navigation={this.props.navigation}/>  */}
          <View style={styles.header}>
            <Logo />
          </View>
          <View style={{alignSelf: 'center', height: '50%'}}>
            <Text style={styles.pageDescription}>Alterar senha</Text>

            <Text style={styles.newPasswordtext}>Nova senha</Text>
            <View style={styles.secureBox}>
              <SmoothPinCodeInput
                placeholder={<View style={styles.placeholderPinStyle} />}
                mask={<View style={styles.pinMaskStyle} />}
                maskDelay={1000}
                password={true}
                cellStyle={null}
                cellStyleFocused={null}
                cellSize={36}
                codeLength={6}
                value={this.state.textPwd1}
                onTextChange={text => this.setState({textPwd1: text})}
              />
            </View>
            <View style={{paddingVertical: 6}} />
            <Text style={styles.newPasswordtext}>Confirmar nova senha</Text>
            <View style={styles.secureBox}>
              <SmoothPinCodeInput
                placeholder={<View style={styles.placeholderPinStyle} />}
                mask={<View style={styles.pinMaskStyle} />}
                maskDelay={1000}
                password={true}
                cellStyle={null}
                cellStyleFocused={null}
                cellSize={36}
                codeLength={6}
                value={this.state.textPwd2}
                onTextChange={text => this.setState({textPwd2: text})}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.setState({alterado: 'sim'})}
              style={styles.loginButtonStyle}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveFont(2),
                }}>
                FINALIZAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(AlterPasswordUser);
