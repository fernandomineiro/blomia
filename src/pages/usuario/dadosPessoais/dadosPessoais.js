import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../../config/api';

import Logo from '../../../components/Logo/LogoBlomia.js';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import styles from './styles.js';

import {isValidEmail} from '../../../utils/funcoes';

class UserDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAvoid: false,
      full_name: '',
      phone_number: '',
      email: '',
      birth_date: '',
      cpf: '',
      placeholdermask: ['(31) 99999-0000', '19.100.100/0001-10'],
      mask: [
        '[00] [00000]-[0000]',
        '[00].[000].[000]/[0000]-[00]',
        '[00]/[00]/[0000]',
      ],
      spinner: false,

      isFocusFieldName: false,
      isFocusFieldPhone: false,
      isFocusFieldEmail: false,
      isFocusFieldDateBirth: false,

      errorsDisplay: [],
    };
  }

  removeMascara(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  atualizarDados = async () => {
    const full_name = this.state.full_name;
    const phone_number = String(this.removeMascara(this.state.phone_number));
    const email = this.state.email;
    const birth_date = this.state.birth_date;

    const errors = [];

    if (full_name.length <= 2) {
      errors.concat('Nome muito curto.');
    }

    if (full_name.split(' ').length < 2) {
      errors.concat('Informe nome e sobrenome.');
    }

    if (phone_number.length !== 11) {
      errors.concat('Telefone incompleto.');
    }

    if (email.length > 0 && !isValidEmail(email)) {
      errors.concat('Informe um e-mail válido.');
    }

    if (errors.length > 0) {
      this.setState({errorsDisplay: errors});
      return;
    }

    const params = {
      user: {
        full_name,
        phone_number,
        email,
        birth_date,
      },
    };

    api.patch('auth', params).then(response => {
      // this.props.navigation.goBack();
      this.props.navigation.navigate(
        this.props.client.company ? 'HomeCompany' : 'HomeClient',
      );
    });
  };

  carregarDados = async () => {
    this.setState({spinner: true});
    api
      .get('users/registrations/show')
      .then(response => {
        this.setState({
          full_name: response.data.full_name,
          phone_number: response.data.phone_number,
          cpf: response.data.cpf,
          email: response.data.email ? String(response.data.email) : '',
          birth_date: response.data.birth_date
            ? String(response.data.birth_date)
            : '',
          spinner: false,
        });
      })
      .catch(error => {
        this.setState({spinner: false});
      });
  };

  async componentDidMount() {
    await this.carregarDados();
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="white" />
        <ModalDefault
          openModal={this.state.errorsDisplay.length > 0}
          closeModal={() => this.setState({errorsDisplay: []})}
          MsgErro={this.state.errorsDisplay}
          tipoModal={'erro'}
        />
        <View style={styles.header}>
          <Logo />
        </View>
        <View>
          <Text style={styles.titleStyle}>Dados de cadastro</Text>
          <Text style={styles.CNPJStyle}>{this.state.cpf}</Text>
        </View>
        <KeyboardAvoidingView style={styles.form}>
          <View style={styles.lineForm}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>
              <Text style={styles.label}>* Nome</Text>
            </View>
            <View style={styles.userContainer}>
              <TextInput
                onChangeText={text => this.setState({full_name: text})}
                value={this.state.full_name}
                placeholder={'Catarina Dias'}
                style={[
                  styles.inputNameStyle,
                  this.state.isFocusFieldName && {borderColor: '#007f0b'},
                ]}
                onFocus={() => this.setState({isFocusFieldName: true})}
                onBlur={() => this.setState({isFocusFieldName: false})}
              />
            </View>
          </View>
          <View style={styles.lineForm}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>
              <Text style={styles.labelcel}>* Celular</Text>
            </View>
            <View>
              <View style={styles.userContainer}>
                <TextInputMask
                  onFocus={() => this.setState({isFocusFieldPhone: true})}
                  onBlur={() => this.setState({isFocusFieldPhone: false})}
                  onChangeText={text => this.setState({phone_number: text})}
                  value={this.state.phone_number}
                  mask={this.state.mask[0]}
                  placeholder={this.state.placeholdermask[0]}
                  style={[
                    styles.inputNameStyle,
                    this.state.isFocusFieldPhone && {borderColor: '#007f0b'},
                  ]}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
          <View style={styles.lineForm}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>
              <Text style={styles.labelemail}>E-mail</Text>
            </View>
            <View>
              <TextInput
                onFocus={() => this.setState({isFocusFieldEmail: true})}
                onBlur={() => this.setState({isFocusFieldEmail: false})}
                placeholder={'cacadias@gmail.com'}
                style={[
                  styles.inputNameStyle,
                  this.state.isFocusFieldEmail && {borderColor: '#007f0b'},
                ]}
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
              />
            </View>
          </View>
          <View style={styles.lineForm}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>
              <Text style={styles.labelborndate}>Data de nascimento</Text>
            </View>
            <View>
              <TextInputMask
                onFocus={() => this.setState({isFocusFieldDateBirth: true})}
                onBlur={() => this.setState({isFocusFieldDateBirth: false})}
                mask={this.state.mask[2]}
                placeholder={'07/05/1990'}
                style={[
                  styles.inputNameStyle,
                  this.state.isFocusFieldDateBirth && {borderColor: '#007f0b'},
                ]}
                keyboardType="number-pad"
                onChangeText={text => this.setState({birth_date: text})}
                value={this.state.birth_date}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              marginTop: 10,
            }}>
            <Text style={styles.inputWarning}>* Campos obrigatórios.</Text>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'transparent',
            }}
          />
          <TouchableOpacity
            onPress={this.atualizarDados}
            style={styles.saveButtonStyle}>
            <Text style={styles.saveButtonTextStyle}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

const mapDispatchToPropss = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToPropss,
)(UserDataScreen);
