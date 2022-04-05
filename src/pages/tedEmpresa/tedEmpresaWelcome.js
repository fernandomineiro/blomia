import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import arrowLeft from '../../assets/images/arrow-left.png';
import logoImg from '../../assets/images/blomialogo.png';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import api from '../../config/api';

import styles from './styleWelcome';

class TedEmpresa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
    };
  }

  verificaContasSalvas = async () => {
    // this.setState({spinner: true});

    // this.props.navigation.navigate('tedEmpresaCadastro');
    this.props.navigation.navigate('tedEmpresaTransferencia');

    // await api
    //   .get(`/bank_accounts?company_id=${this.props.client.company.id}`)
    //   .then(async response => {
    //     this.setState({spinner: false});

    //     if (!Array.isArray(response.data)) {
    //       this.props.navigation.navigate('tedEmpresaCadastro');
    //     } else {
    //       this.props.navigation.navigate('tedEmpresaListaContas');
    //     }
    //   })
    //   .catch(async error => {
    //     this.setState({spinner: false});
    //     this.props.navigation.navigate('tedEmpresaCadastro');

    //     //Grava chave para a proxima autenticação na API
    //   });
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Spinner visible={this.state.spinner} color="white" />
        <ScrollView style={{flex: 1, paddingHorizontal: '5%'}}>
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Image
                  style={styles.imgBack}
                  source={arrowLeft}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.imgLogo}
              source={logoImg}
              resizeMode="stretch"
            />
            <Text style={styles.titlePage}>Transferência Empresa</Text>
            <Text style={styles.messageMain}>
              A transferência de saldo empresa é a retirada de dinheiro do
              Blomia. Após informar a conta bancária de destino e realizar sua
              solicitação a transferência acontecerá conforme prazos:
            </Text>
            <Text style={styles.titleObs}>Dias úteis</Text>
            <View style={styles.containerItem}>
              <View style={styles.imgItem}>
                <Icon
                  name="circle"
                  type="font-awesome"
                  color="#007F0B"
                  size={10}
                />
              </View>
              <Text style={styles.itemText}>
                Solicitações criadas{' '}
                <Text style={styles.itemTextBold}>até</Text> 12:00 serão
                concluídas no mesmo dia até as 17:00
              </Text>
            </View>
            <View style={styles.containerItem}>
              <View style={styles.imgItem}>
                <Icon
                  name="circle"
                  type="font-awesome"
                  color="#007F0B"
                  size={10}
                />
              </View>
              <Text style={styles.itemText}>
                Solicitações criadas{' '}
                <Text style={styles.itemTextBold}>após</Text> 12:00 serão
                concluídas em até 24 horas úteis
              </Text>
            </View>
            <Text style={styles.titleObs}>Fins de semana e feriados</Text>
            <View style={styles.containerItem}>
              <View style={styles.imgItem}>
                <Icon
                  name="circle"
                  type="font-awesome"
                  color="#007F0B"
                  size={10}
                />
              </View>
              <Text style={styles.itemText}>
                Serão concluídas no próximo dia útil
              </Text>
            </View>
          </View>
          <ButtonCustom
            rippleCentered={true}
            navegar={this.verificaContasSalvas}
            textButton={'CONTINUAR'}
            btnColor={'#007F0B'}
            textColor={'white'}
            borderColor={'#007f0b'}
            styleCustom={{marginBottom: 30}}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(TedEmpresa);
