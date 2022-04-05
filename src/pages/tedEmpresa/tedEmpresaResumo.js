import React from 'react';
import {ActivityIndicator, View, Text, SafeAreaView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import api from '../../config/api';
import {currencyFormat} from '../../utils/funcoes';

import {connect} from 'react-redux';
import {setMsgToast} from '../../store/actions/msgToast';

import styles from './stylesResumo';
import Balance from '../../components/Balance';

class TedEmpresaResumo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transferencia: null,
      value: 'R$0,00',
      showModalSenha: false,
      spinner: true,
    };
  }

  buscarTransferencia = async () => {
    await api
      .get(`requisition/transfer?company_id=${this.props.client.company.id}`)
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({transferencia: response.data});
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({spinner: true});
      await this.buscarTransferencia();
      this.setState({spinner: false});
    });
  }

  removeMascara(valor) {
    return Number(
      String(valor)
        .replace('.', '')
        .replace('R$', '')
        .replace(',', '.'),
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  cancelarTransferencia = async () => {
    this.setState({spinner: true});

    await api
      .post(
        `requisition/cash/cancelation?requisition_id=${
          this.state.transferencia.company_transfer.id
        }`,
      )
      .then(async response => {
        this.setState({spinner: false});
        //Atualiza tokens para proxima requisição

        this.props.setMessage('A solicitação de TED foi cancelada');

        this.props.navigation.navigate('inicioEmpresa');
      })
      .catch(async error => {
        this.setState({spinner: false});
        //Atualiza tokens para proxima requisição
      });
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <Spinner visible={this.state.spinner} color="white" />
        <CustomHeader title="TED" hiddenButton navigation={navigation} />
        {!this.state.spinner && (
          <>
            <View style={styles.container}>
              <View style={styles.header}>
                <Balance />
              </View>
              <View style={styles.containerResume}>
                <Text style={styles.titleResume}>Para</Text>
                <Text style={styles.contentResume}>
                  {this.state.transferencia?.bank_account_details.owner_name}
                </Text>
                <Text style={styles.contentResume}>
                  {this.state.transferencia?.bank_account_details.cpf}
                  {this.state.transferencia?.bank_account_details.cnpj}
                </Text>
                <Text style={styles.contentResume}>
                  {this.state.transferencia.bank_account_details.bank_name}
                </Text>
                <Text style={styles.contentResume}>
                  {this.state.transferencia?.bank_account_details.account_type}
                </Text>
                <Text style={styles.contentResume}>
                  Agência{' '}
                  {this.state.transferencia?.bank_account_details.agency} conta{' '}
                  {
                    this.state.transferencia?.bank_account_details
                      .account_number
                  }
                  -
                  {this.state.transferencia?.bank_account_details.account_digit}
                </Text>
              </View>
              <Text style={styles.textValidade}>
                Data prevista transferência:{' '}
                <Text style={styles.textDataValidade}>
                  {
                    this.state.transferencia.company_transfer
                      .compensation_forecasting
                  }
                </Text>
              </Text>
              <Text style={styles.textStatus}>
                Transferência {this.state.transferencia.company_transfer.status}
              </Text>
              <View>
                <Text style={styles.textLabelValor}>Valor</Text>
                <Text style={styles.textValor}>
                  {this.state.transferencia.company_transfer.value}
                </Text>
                <View style={styles.containerValorCusto}>
                  <Text style={styles.labelCusto}>
                    Custo:{' '}
                    <Text style={styles.valorCusto}>
                      {currencyFormat(
                        this.removeMascara(
                          this.state.transferencia.company_transfer.cost,
                        ),
                      )}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <ButtonCustom
              rippleCentered={true}
              navegar={() => navigation.navigate('inicioEmpresa')}
              textButton={'INÍCIO'}
              btnColor={'#007f0b'}
              textColor={'#fff'}
              borderColor={'#007f0b'}
              styleCustom={{marginBottom: 15}}
            />

            <ButtonCustom
              rippleCentered={true}
              navegar={this.cancelarTransferencia}
              textButton={'CANCELAR'}
              btnColor={'#fff'}
              textColor={'#4D4D4D'}
              borderColor={'#4D4D4D'}
              styleCustom={{marginBottom: 30}}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

const mapDispatchToProps = dispatch => ({
  setMessage: msg => dispatch(setMsgToast(msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TedEmpresaResumo);
