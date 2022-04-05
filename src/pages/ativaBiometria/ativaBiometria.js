import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import {styles} from './styles.js';
import Logo from '../../components/Logo/LogoBlomia.js'
export default class AtivaBiometria extends Component {
    constructor(props) {
        super(props);
        this.state = {
          switchOn1: false,
          switchOn2: false,
        };
      }
      onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
      };
      onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
      };
      
    render() { 
        return( 
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Logo/>            
                </View>
              </View>
              <View style={{alignItems: 'center', width: '100%'}}>
                  <Text style={styles.textHeader}>Configuração de digital</Text>
              </View>
              
              <View style={styles.contentFirstRow}>
                <View style={{flex: 0.8}}>
                  <Text style={styles.textFirstRowContent1}>Usar digital para entrar</Text>
                  <Text style={styles.textFirstRowContent2}>Você pode usar sua digital para entrar com segurança.</Text>
                </View>

                <View style={{flex: 0.2, backgroundColor: 'transparent', height: '50%'}}>
                  <SwitchToggle
                    containerStyle={{
                      marginTop: 3,
                      width: 48,
                      height: 17,
                      borderRadius: 25,
                      padding: 0
                    }}
                    circleStyle={{
                      width: 25,
                      height: 25,
                      borderRadius: 19,
                    }}
                    switchOn={this.state.switchOn1}
                    onPress={this.onPress1}
                    circleColorOff="#b3b3b3"
                    circleColorOn="#007f0b"
                    duration={500}
                  />
                </View>
              </View>

              <View style={styles.contentSecondRow}>
                <View style={{flex: 0.8, backgroundColor: 'transparent'}}>
                  <Text style={styles.textSecondRowContent1}>Usar digital para saques e depósitos</Text>
                  <Text style={styles.textSecondRowContent2}>Você pode usar sua digital para validar seus saques e depósitos.</Text>
                </View>
                <View style={{flex: 0.2, backgroundColor: 'transparent', height: '50%'}}>
                  <SwitchToggle
                    containerStyle={{
                      marginTop: 3,
                      width: 48,
                      height: 17,
                      borderRadius: 25,
                      padding: 0
                    }}
                    circleStyle={{
                      width: 25,
                      height: 25,
                      borderRadius: 19,
                      backgroundColor: '#b3b3b3' // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn2}
                    onPress={this.onPress2}
                    circleColorOff="#b3b3b3"
                    circleColorOn="#007f0b"
                    duration={500}
                  />
                </View>
              </View>
              <View style={{height: '30%', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'transparent'}}>
                <TouchableOpacity  style={styles.closeButtonStyle}>
                  <Text style={styles.closeButtonTextStyle}>
                    FECHAR
                  </Text>
                </TouchableOpacity>    
              </View>     
          </View>
        )
    }

}
