import React, { Component } from "react";
import { Keyboard, Text, View, TouchableOpacity, Dimensions, Picker, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import Logo from '../../components/Logo/LogoBlomia.js';
import Button from '../../components/ButtonCustom/ButtonCustom.js';
import {styles} from './styles.js'
export default class TransferenciaEmpresa extends Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            selectedValue: 'java',
            avoid: false
        }
    }





    render () {
        const responsiveWidth = Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 97.2);
        const responsiveHeight = Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 99);


        return ( 
            <KeyboardAvoidingView behavior='position' style={styles.container} enabled={this.state.avoid}>
                <View style={styles.header}>
                    <Logo/>
                </View>
                <View style={styles.content}>
                    <View style={{height: '5%', width: '100%', backgroundColor: 'transparent', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 18}}>Transferência empresa</Text>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: '80%', width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 0.7, borderColor: 'black'}}>
                            <Picker 
                                mode='dropdown'
                                selectedValue={this.state.selectedValue}
                                style={{height: '100%', width: '100%', borderRadius: 18, backgroundColor: 'transparent'}}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                                    <Picker.Item label="Selecione seu banco" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: '80%', width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 0.7, borderColor: 'black'}}>
                            <Picker 
                                mode='dropdown'
                                selectedValue={this.state.selectedValue}
                                style={{height: '100%', width: '100%', borderRadius: 18, backgroundColor: 'transparent'}}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                                    <Picker.Item label="Tipo de conta" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput onFocus={() => this.setState({avoid: false})} placeholderTextColor='black' placeholder="Agência" style={{borderRadius: 18, borderWidth: 0.7, borderColor: 'black', backgroundColor: 'white', width: '80%', height: '79%', color: 'black', textAlign: 'center', fontFamily: 'Montserrat-Medium'}}></TextInput>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{width: '30%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center'}}>
                            <TextInput placeholderTextColor='black' placeholder='Conta' style={{backgroundColor: 'white', borderRadius: 18, borderWidth: 0.7, borderColor: 'black', height: '79%', width: '100%', textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>

                            </TextInput>
                        </View>
                        <View style={{width: '20%'}}/>
                        <View style={{width: '30%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center'}}>
                            <TextInput placeholderTextColor='black' placeholder='Dígito' style={{backgroundColor: 'white', borderRadius: 18, borderWidth: 0.7, borderColor: 'black', height: '79%', width: '100%', textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>

                            </TextInput>
                        </View>
                    </View>
                    <View style={{height: '7%', width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 18}}>Para quem deseja transferir?</Text>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput onFocus={() => this.setState({avoid: true})} placeholderTextColor='black' placeholder='Nome' style={{backgroundColor: 'white', borderRadius: 18, borderWidth: 0.7, borderColor: 'black', height: '79%', width: '80%', textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>

                        </TextInput>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput onFocus={() => this.setState({avoid: true})} placeholderTextColor='black' placeholder='CPF' style={{backgroundColor: 'white', borderRadius: 18, borderWidth: 0.7, borderColor: 'black', height: '79%', width: '80%', textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>

                        </TextInput>
                    </View>
                    <View style={{height: '4%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 17}}>ou</Text>
                    </View>
                    <View style={{height: '12%', width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput placeholderTextColor='black' placeholder='CNPJ' style={{backgroundColor: 'white', borderRadius: 18, borderWidth: 0.7, borderColor: 'black', height: '79%', width: '80%', textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>

                        </TextInput>
                    </View>

                </View>
                <View style={styles.footer}>
                    <Button btnColor='#007F0B' textColor='white' textButton='SALVAR' />
                </View>
            </KeyboardAvoidingView>
        )
    }
}
