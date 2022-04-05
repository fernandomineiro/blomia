import React from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import {format, parseISO, isAfter, addDays} from 'date-fns';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather';

import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import api from '../../config/api';
import {currencyFormat} from '../../utils/funcoes';
import Toast from 'react-native-simple-toast';
import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';
import PencilImg from '../../assets/images/pencil.png';

import styles from './stylesResumoBoleto';
import {setMsgToast} from '../../store/actions/msgToast';
import starkBank from '../../config/starkBank';
import {Buffer} from 'buffer';
import PDFRender from '../PDFRender/PDFRender';

import Balance from '../../components/Balance';
import CustomHeader from '../../components/CustomHeader/CustomHeader';


class DepositoBoletoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nomeArquivo: '',
      isVisibleModalWelcome: true,
      showModal: false,
      requisicao: null,
      spinner: false,
      codigo: '',
      filePDF: null,
    };
  }

  diasVerficacao = 5;

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({
        nomeArquivo: '',
        isVisibleModalWelcome: true,
        msgToast: '',
        exibirToast: false,
        showModal: false,
        requisicao: null,
        spinner: false,
        codigo: '',
        filePDF: null,
      });
      await this.carregarDados();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.setState({isVisibleModalWelcome: false});
  }

  removeMascara(valor) {
    return Number(
      String(valor)
        .replace('.', '')
        .replace('R$', '')
        .replace(',', '.'),
    );
  }

  getBoletoPdf = async () => {
    // let idBoleto = "5839817900294144"
    this.setState({spinner: true});
    await starkBank
      .get('/v2/boleto/' + this.state.codigo + '/pdf', {
        responseType: 'arraybuffer',
      })
      .then(response => {
        this.setState({spinner: false});
        this.setState({
          filePDF: Buffer.from(response.data, 'binary').toString('base64'),
        });
      })
      .catch(error => {
        this.setState({spinner: false});
      });
  };

  cancelarDeposito = async () => {
    this.setState({spinner: true});

    await api
      .post(
        `/requisition/cash/cancelation?requisition_id=${
          this.state.requisicao.id
        }`,
      )
      .then(async response => {
        this.setState({spinner: false});
        //Atualiza tokens para proxima requisição

        this.props.setMessageToast('Boleto Cancelado com sucesso.');

        this.props.navigation.navigate('inicioEmpresa');
      })
      .catch(async error => {
        this.setState({spinner: false});
        //Atualiza tokens para proxima requisição
      });
  };

  verificaCadastro = () => {
    this.setState({isVisibleModalWelcome: false});
  };

  gerarBoleto = () => {
    this.props.navigation.navigate('ResumoBoletoEmpresa');
  };

  moverAreaTransferencia = cod => {
    Clipboard.setString(cod);
    this.exibirToast('Código do boleto copiado!');
  };

  carregarDados = async () => {

    await api
      .get(`/bank_split/status?company_id=${this.props.client.company.id}`)
      .then(async response => {
        //Atualiza tokens para proxima requisição

        this.setState({codigo: response.data.bank_split_uuid});

        this.setState({requisicao: response.data});
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  };

  async exibirToast(msg) {
    Toast.show(msg, Toast.SHORT);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <CustomHeader hiddenButton navigation={this.props.navigation} />
        <Spinner visible={this.state.spinner} color="white" />
        <ModalTriplo
          ConteudoTextoModal={
            'Tem certeza que deseja cancelar?\n\n' +
            'Nunca cancele boletos que já foram pagos, pois eles podem estar em processamento.'
          }
          TextoBotãoFechar={'FECHAR'}
          TextoBotãoFunção={'CANCELAR'}
          TamanhoDoTexto={18}
          CorBotãoFechar={'#333333'}
          CorBotãoFunção={'#333333'}
          isModalVisible={this.state.showModal}
          Fechar={() => this.setState({showModal: false})}
          Função={() => {
            this.setState({showModal: false});
            this.cancelarDeposito();
          }}
        />
        {this.state.requisicao ? (
          <View style={styles.conteinerTransferencia}>
            {!this.state.filePDF ? (
              <>
                <View style={styles.containerBtBack}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('inicioEmpresa')}>
                    <IconFeather name="arrow-left" size={30} color="#007f0b" />
                  </TouchableOpacity>
                </View>
                <View style={styles.header}>
                  <Balance />
                </View>
                <View style={styles.content}>
                  {isAfter(
                    new Date(Date.now()),
                    parseISO(this.state.requisicao.bank_split_expires_at),
                  ) ? (
                    isAfter(
                      new Date(Date.now()),
                      addDays(
                        parseISO(this.state.requisicao.bank_split_expires_at),
                        this.diasVerficacao,
                      ),
                    ) ? (
                      <Text style={styles.textAguardeVencido}>
                        Esse Boleto venceu em:{' '}
                        {format(
                          parseISO(this.state.requisicao.bank_split_expires_at),
                          'dd/MM/yyyy',
                        )}
                      </Text>
                    ) : (
                      <Text style={styles.textAguardeVerificando}>
                        Verificando pagamento do boleto
                      </Text>
                    )
                  ) : (
                    <Text style={styles.textAguarde}>
                      Aguardando pagamento até{' '}
                      {format(
                        parseISO(this.state.requisicao.bank_split_expires_at),
                        'dd/MM/yyyy',
                      )}
                    </Text>
                  )}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.inputValue}>
                      {currencyFormat(
                        Number(this.state.requisicao.value) +
                          Number(this.state.requisicao.cost),
                      )}
                    </Text>
                    {isAfter(
                      new Date(Date.now()),
                      addDays(
                        parseISO(this.state.requisicao.bank_split_expires_at),
                        this.diasVerficacao,
                      ),
                    ) && (
                      <TouchableOpacity style={{marginTop: 10}}>
                        <Image
                          source={PencilImg}
                          style={{height: 40, width: 45}}
                          resizeMode="stretch"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View>
                    <Text style={styles.labelCusto}>
                      Custo:{' '}
                      <Text style={styles.valorCusto}>
                        {currencyFormat(Number(this.state.requisicao.cost))}
                      </Text>
                    </Text>
                    <Text style={styles.labelCusto}>
                      Valor solicitado:{' '}
                      <Text style={styles.valorCusto}>
                        {currencyFormat(Number(this.state.requisicao.value))}
                      </Text>
                    </Text>
                  </View>
                  <Text style={styles.textLabel}>
                    Utilize o número do código de barras abaixo para efetuar o seu
                    depósito:
                  </Text>
                  {isAfter(
                    new Date(Date.now()),
                    parseISO(this.state.requisicao.bank_split_expires_at),
                  ) ? (
                    <View style={styles.containerCodDisable}>
                      <Text style={styles.textCodigoBoletoDisable}>
                        {this.state.requisicao.bank_split_line}
                      </Text>
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          this.moverAreaTransferencia(
                            this.state.requisicao.bank_split_line,
                          )
                        }
                        style={styles.btTouchable}>
                        <View style={styles.containerCod}>
                          <Text style={styles.textCodigoBoleto}>
                            {this.state.requisicao.bank_split_line}
                          </Text>
                        </View>
                        <Icon
                          name="clone"
                          type="font-awesome"
                          color="#000000"
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.getBoletoPdf}>
                        <Text style={styles.linkViewSplitBank}>
                          VER BOLETO
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={styles.footer}>
                  <ButtonCustom
                    rippleCentered={true}
                    ação={() => {
                      this.props.navigation.navigate('inicioEmpresa');
                    }}
                    textButton={'INÍCIO'}
                    btnColor={'#007F0B'}
                    textColor={'white'}
                    borderColor={'#007f0b'}
                  />
                  <ButtonCustom
                    rippleCentered={true}
                    navegar={() => this.setState({showModal: true})}
                    textButton={'CANCELAR BOLETO'}
                    btnColor={'white'}
                    textColor={'#4C4C4C'}
                    borderColor={'#4C4C4C'}
                    styleCustom={{marginBottom: 30}}
                  />
                </View>
              </>
            ) : (
              <>
                <PDFRender fileView={this.state.filePDF} />
                <TouchableOpacity style={styles.containerBtBack} onPress={() => this.setState({filePDF: null})}>
                  <IconFeather name="arrow-left" size={30} color="#007f0b" />
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

const mapDispatchToProps = dispatch => ({
  setMessageToast: msg => dispatch(setMsgToast(msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepositoBoletoScreen);
