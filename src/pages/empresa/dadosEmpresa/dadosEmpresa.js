import React, {Component} from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styles.js';
import Logo from '../../../components/Logo/LogoBlomia.js';
import Button from '../../../components/ButtonCustom/ButtonCustom.js';
import { TextInputMask} from 'react-native-masked-text';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

export default class DadosEmpresa extends Component { 
    constructor(props) {
        super(props);
        this.state = { 
            cnpj: '21.333.777/0001-20',
            nomeEmpresa: 'Pão Brasil',
            nome: 'Carlos Eduardo',
            celular: '(31)99111-0883',
            email: 'padariapaobrasil@gmail.com',
            shouldAvoid: false,
            mask:[
                '[00] [00000]-[0000]', 
                '[00].[000].[000]/[0000]-[00]'    
            ],
        }
    }

    render() { 
        const handleName = (value) => { 
            let upperFirst = value.split(" ").map(v=>(v[0]??"").toUpperCase() + v.slice(1).toLowerCase()).join(" ")
            this.setState({nome: upperFirst})
        }

        const handleNameEmpresa = (value) => { 
            let upperFirst = value.split(" ").map(v=>(v[0]??"").toUpperCase() + v.slice(1).toLowerCase()).join(" ")
            this.setState({nomeEmpresa: upperFirst})
        }
        return (
            <ScrollView enabled={false} style={styles.container}>
                <View style={styles.header}>
                    <Logo/>
                </View>
                <View style={styles.content}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Cadastro da empresa</Text>
                        <TextInputMask
                            placeholderTextColor='black'
                            style={styles.cnpj}
                            type='cnpj'
                            value={this.state.cnpj}
                            editable={false}
                            mask={this.state.mask[1]}
                        >
                            
                        </TextInputMask>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>* Nome da empresa no Blomia</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <View style={[styles.input, {flexDirection: 'row', backgroundColor: 'transparent'}]}>
                                <View style={{width: '80%', backgroundColor: 'transparent', alignItems: 'flex-start'}}>
                                    
                                    <TextInput
                                        ref={input => { 
                                            this.inputNomeEmpresa = input;
                                        }}
                                        onSubmitEditing={() => { 
                                            this.inputNome.focus();
                                        }}
                                        returnKeyType='next'
                                        style={{backgroundColor: 'transparent', width: '100%'}} 
                                        value={this.state.nomeEmpresa}
                                        onChangeText={text => handleNameEmpresa(text)}
                                    >                                    
                                    </TextInput>
                                </View>
                                <View style={{width: '20%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.setState({nomeEmpresa: ''})}>
                                        {this.state.nomeEmpresa.length > 0 && <Text>✕</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Nome do proprietário/sócio</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <View style={[styles.input, {flexDirection: 'row', backgroundColor: 'transparent'}]}>
                                <View style={{width: '80%', backgroundColor: 'transparent', alignItems: 'flex-end'}}>
                                    
                                    <TextInput
                                        ref={input => {
                                            this.inputNome = input;
                                        }}
                                        onSubmitEditing={() => {
                                            this.inputCelular.focus()
                                        }}
                                        returnKeyType='next'
                                        style={{backgroundColor: 'transparent', width: '100%'}} 
                                        value={this.state.nome}
                                        onChangeText={text => handleName(text)}
                                    >                                    
                                    </TextInput>
                                </View>
                                <View style={{width: '20%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.setState({nome: ''})}>
                                        {this.state.nome.length > 0 && <Text>✕</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.labelRow}>
                            <Text style={[styles.label, {paddingRight: wp(43)}]}>* Celular</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <View style={[styles.input, {flexDirection: 'row', backgroundColor: 'transparent'}]}>
                                <View style={{width: '80%', backgroundColor: 'transparent', alignItems: 'flex-end'}}>
                                    <TextInputMask
                                        style={{backgroundColor: 'transparent', width: '100%'}}
                                        refInput={input => {
                                        this.inputCelular = input;
                                        }}
                                        type='cel-phone'
                                        blurOnSubmit={false}
                                        value={this.state.celular}
                                        keyboardType="next"
                                        onSubmitEditing={() => { 
                                            this.inputEmail.focus();
                                        }}
                                        mask={this.state.mask[0]}
                                        placeholder={'Celular'}
                                        value={this.state.celular}
                                        onChangeText={(text) => this.setState({celular: text})}

                                    />
                                </View>
                                <View style={{width: '20%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.setState({celular: ''})}>
                                        {this.state.celular.length > 0 && <Text>✕</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={[styles.label, {paddingRight: wp(43)}]}>E-mail</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <View style={[styles.input, {flexDirection: 'row', backgroundColor: 'transparent'}]}>
                                <View style={{width: '80%', backgroundColor: 'transparent', alignItems: 'flex-end'}}>
                                <TextInput
                                        ref={input => { 
                                            this.inputEmail = input;
                                        }}
                                        returnKeyType='next'
                                        style={{backgroundColor: 'transparent', width: '100%'}} 
                                        value={this.state.email}
                                        onChangeText={text => this.setState({email: text})}
                                    >                                    
                                    </TextInput>
                                </View>
                                <View style={{width: '20%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.setState({email: ''})}>
                                        {this.state.email.length > 0 && <Text>✕</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.labelRow, {alignItems: 'flex-start', paddingLeft: wp(20)}]}>
                            <Text style={styles.note}>* Campos obrigatórios.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.noteCNPJView}>
                        <Text style={styles.noteCNPJtext}>O CNPJ não pode ser alterado</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Button textButton={"SALVAR"} textColor="white" btnColor="#007F0B"></Button>
                    </View>
                </View>
            </ScrollView>
        )
    }
}