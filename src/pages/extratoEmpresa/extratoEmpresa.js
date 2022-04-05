// Importações do Projeto de Terceiros
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {format, subDays, isAfter, parseISO} from 'date-fns';
import {connect} from 'react-redux';

import DatePicker from '@react-native-community/datetimepicker';

import Spinner from 'react-native-loading-spinner-overlay';

//
import api from '../../config/api';

// Componentes customizados
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';
// Imagens da página
import CalendarImg from '../../assets/images/calendar.png';
import CalendarAtivoImg from '../../assets/images/calendar-ativo.png';
import SearchImg from '../../assets/images/search.png';

import {currencyFormat} from '../../utils/funcoes';

// Estilizações
import styles from './styles';

class Extrato extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textoBusca: '',
      filtroTipo: null,
      itensExtrato: [],
      pagina: 1,
      totalPaginas: 1,
      loading: false,
      flatlist: null,
      selectDate: false,
      dataInicialFiltro: subDays(new Date(Date.now()), 1),
      dataFinalFiltro: new Date(Date.now()),
      inputBuscaFoco: false,
      mostraModalDataInicio: false,
      mostraModalDataFim: false,
      ativarFiltroData: false,
      valorTotal: null,
      spinner: true,
      mensagemEmpty: '',
      carregamentoPagina: false,
    };
  }

  buscarExtrato = async (pagina = this.state.pagina) => {
    if (this.state.totalPaginas && pagina > this.state.totalPaginas) {
      return;
    }
    if (!this.state.spinner) {
      this.setState({spinner: true});
    }
    let filtro = '';
    var pegarValor = null;

    if (this.state.filtroTipo) {
      filtro = filtro + `&requisition_type=${this.state.filtroTipo}`;
      if (this.state.filtroTipo === 1) {
        pegarValor = 'withdrawal_value';
      } else {
        pegarValor = 'deposit_value';
      }
    }
    if (this.state.textoBusca) {
      filtro = filtro + `&search=${this.state.textoBusca}`;
    }

    if (this.state.ativarFiltroData) {
      filtro = `${filtro}&start_date=${format(
        this.state.dataInicialFiltro,
        'yyyy-MM-dd',
      )}&finish_date=${format(this.state.dataFinalFiltro, 'yyyy-MM-dd')}`;
    }

    this.setState({mensagemEmpty: ''});
    try {
      const response = await api.get(
        `/company/statement?page=${pagina}${filtro}&company_id=${
          this.props.client.company.id
        }`,
      );

      // Setando dados do header para próxima requisição

      // Salvando resultados no estado

      let valorTotal = 0;
      const itensExtrato = response.data.map(dayItem => {
        // if (pegarValor) {
        //   valorTotal = Number(dayItem[pegarValor]) + valorTotal;
        // }

        const data = {
          title: dayItem.date,
          total: pegarValor ? dayItem[pegarValor] : null,
          data: dayItem.requisitions,
        };

        return data;
      });

      const itensAntigos = this.state.itensExtrato;

      if (this.state.itensExtrato.length > 0) {
        const utimoItemAntigo = this.state.itensExtrato[
          this.state.itensExtrato.length - 1
        ];

        if (itensExtrato[0].title === utimoItemAntigo.title) {
          itensExtrato[0].data = [
            ...utimoItemAntigo.data,
            ...itensExtrato[0].data,
          ];
          itensAntigos.splice(this.state.itensExtrato.length - 1, 1);
        }
      }

      await this.setState({
        spinner: false,
        itensExtrato: [...itensAntigos, ...itensExtrato],
        pagina: pagina + 1,
        totalPaginas: Math.ceil(
          Number(response.headers.total) / Number(response.headers['per-page']),
        ),
        valorTotal,
      });

      this.filtroTipo(this.state.filtroTipo);
    } catch (error) {
      this.setState({spinner: false});

      if (
        error.response.data.message[0].detail ===
        "You don't have any requisition yet"
      ) {
        this.setState({
          mensagemEmpty:
            filtro !== ''
              ? 'Nenhuma solicitação encontrada para esse filtro'
              : 'Você  ainda não tem solicitação!',
        });
      }
    }
  };

  escolherDataInicial = (event, dataSelecionada) => {
    const dataEscolhida = dataSelecionada || this.state.dataInicialFiltro;
    this.setState({mostraModalDataInicio: Platform.OS === 'ios'});
    this.setState({dataInicialFiltro: dataEscolhida});

    if (dataEscolhida > this.state.dataFinalFiltro) {
      this.setState({dataFinalFiltro: dataEscolhida});
    }
  };

  escolherDataFinal = (event, dataSelecionada) => {
    const dataEscolhida = dataSelecionada || this.state.dataFinalFiltro;
    this.setState({mostraModalDataFim: Platform.OS === 'ios'});
    this.setState({dataFinalFiltro: dataEscolhida});

    if (dataEscolhida < this.state.dataInicialFiltro) {
      this.setState({dataInicialFiltro: dataEscolhida});
    }
  };

  filtroTipo = async tipo => {
    if (tipo !== this.state.filtroTipo) {
      await this.setState({filtroTipo: tipo});
      await this.setState({itensExtrato: []});
      await this.buscarExtrato(1);
    }
  };

  timePesquisa = null;
  diaExtrato = '';

  verificaNovoDia = dia => {
    const novoDia = this.diaExtrato !== dia;

    if (novoDia) {
      this.diaExtrato = dia;
    }

    return novoDia;
  };

  deboucerPesquisa = async text => {
    this.setState({textoBusca: text.replace(',', '.')});

    clearTimeout(this.timePesquisa);

    this.timePesquisa = setTimeout(async () => {
      this.setState({itensExtrato: []});
      await this.buscarExtrato(1);
    }, 1000);
  };

  codigoExpirado = async dateExpired => {
    const dataExpiracao = parseISO(dateExpired);

    return isAfter(new Date(Date.now()), dataExpiracao);
  };

  versolicitacao = async (idSaque, tipo) => {
    if (tipo === 4 || tipo === 19) {
      this.props.navigation.navigate('resumoBoletoEmpresa');
    }
  };

  filtrarPorData = async valor => {
    this.setState({ativarFiltroData: valor});
    await this.setState({itensExtrato: []});
    await this.buscarExtrato(1);
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({
        textoBusca: '',
        filtroTipo: null,
        itensExtrato: [],
        pagina: 1,
        totalPaginas: 1,
        loading: false,
        flatlist: null,
        selectDate: false,
        dataInicialFiltro: subDays(new Date(Date.now()), 1),
        dataFinalFiltro: new Date(Date.now()),
        inputBuscaFoco: false,
        mostraModalDataInicio: false,
        mostraModalDataFim: false,
        ativarFiltroData: false,
      });
      await this.buscarExtrato();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={this.state.spinner} color="white" />
        {!this.state.carregamentoPagina && (
          <>
            <CustomHeader
              title="Home"
              navigation={this.props.navigation}
            />
            <Modal isVisible={!!this.state.selectDate}>
              <View style={styles.modalDate}>
                <View style={styles.containerModalDate}>
                  <Text style={styles.titleModalDate}>Periodo</Text>
                  <Ripple
                    rippleCentered={true}
                    onPress={() => {
                      this.setState({selectDate: false});
                    }}
                    style={[styles.btnCloseModal, {backgroundColor: 'grey'}]}>
                    <Text style={styles.textBtnMenu}>X</Text>
                  </Ripple>
                </View>
                <View style={styles.bodyModalDate}>
                  <Text style={styles.cabecalhoDate}>Apartir de:</Text>
                  <TouchableOpacity
                    style={styles.btCalendar}
                    onPress={() => {
                      this.setState({mostraModalDataInicio: true});
                    }}>
                    <Text style={styles.txtData}>
                      {format(this.state.dataInicialFiltro, 'dd/MM/yyyy')}
                    </Text>
                    <Image
                      source={CalendarImg}
                      style={{width: 15, height: 15, marginLeft: 10}}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cabecalhoDate}>Até:</Text>
                  <TouchableOpacity
                    style={styles.btCalendar}
                    onPress={() => {
                      this.setState({mostraModalDataFim: true});
                    }}>
                    <Text style={styles.txtData}>
                      {format(this.state.dataFinalFiltro, 'dd/MM/yyyy')}
                    </Text>
                    <Image
                      source={CalendarImg}
                      style={{width: 15, height: 15, marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <Ripple
                  rippleCentered={true}
                  onPress={() => {
                    this.setState({selectDate: false});
                    this.state.ativarFiltroData
                      ? this.filtrarPorData(false)
                      : this.filtrarPorData(true);
                  }}
                  style={[styles.btnFiltrarModal]}>
                  <Text style={styles.textBtnMenu}>
                    {this.state.ativarFiltroData ? 'Retirar filtro' : 'Filtrar'}
                  </Text>
                </Ripple>
              </View>
              {this.state.mostraModalDataInicio && (
                <DatePicker
                  value={this.state.dataInicialFiltro}
                  mode="date"
                  display="default"
                  onChange={this.escolherDataInicial}
                  maximumDate={new Date(Date.now())}
                />
              )}
              {this.state.mostraModalDataFim && (
                <DatePicker
                  value={this.state.dataFinalFiltro}
                  mode="date"
                  display="default"
                  onChange={this.escolherDataFinal}
                  minimumDate={this.state.dataInicialFiltro}
                  maximumDate={new Date(Date.now())}
                />
              )}
            </Modal>
            <View style={styles.header}>
              <View style={styles.headerBalance}>
                <Balance />
              </View>

              <View style={styles.viewImg}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({selectDate: true});
                  }}>
                  <Image
                    source={
                      this.state.ativarFiltroData
                        ? CalendarAtivoImg
                        : CalendarImg
                    }
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Extrato</Text>
              <View
                style={[
                  styles.searchContainer,
                  {
                    borderColor: this.state.inputBuscaFoco
                      ? '#35791F'
                      : '#dfdfdf',
                  },
                ]}>
                <TextInputMask
                  onChangeText={this.deboucerPesquisa}
                  placeholder={
                    !this.state.ativarFiltroData
                      ? 'Pesquise código, status, solicitação, empresa ou valor'
                      : 'Pesquise código, status ou valor'
                  }
                  style={styles.searchTextStyle}
                  onFocus={() => {
                    this.setState({inputBuscaFoco: true});
                  }}
                  onblur={() => {
                    this.setState({inputBuscaFoco: false});
                  }}
                  onEndEditing={() => {
                    this.setState({inputBuscaFoco: false});
                  }}
                  value={this.state.textInput}
                />
                <TouchableOpacity
                  onPress={async () => await this.buscarExtrato}>
                  <Image
                    source={SearchImg}
                    style={{width: 15, height: 15, marginRight: 15}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.btMenus}>
                <Ripple
                  rippleCentered={true}
                  onPress={() => {
                    this.filtroTipo(null);
                  }}
                  style={[
                    styles.btnMenu,
                    this.state.filtroTipo === null
                      ? {backgroundColor: '#007f0b'}
                      : {backgroundColor: 'grey'},
                  ]}>
                  <Text style={styles.textBtnMenu}>Tudo</Text>
                </Ripple>
                <Ripple
                  rippleCentered={true}
                  onPress={() => {
                    this.filtroTipo(1);
                  }}
                  style={[
                    styles.btnMenu,
                    this.state.filtroTipo === 1
                      ? {backgroundColor: '#007f0b'}
                      : {backgroundColor: 'grey'},
                  ]}>
                  <Text style={styles.textBtnMenu}>Saques</Text>
                </Ripple>
                <Ripple
                  rippleCentered={true}
                  onPress={() => {
                    this.filtroTipo(2);
                  }}
                  style={[
                    styles.btnMenu,
                    this.state.filtroTipo === 2
                      ? {backgroundColor: '#007f0b'}
                      : {backgroundColor: 'grey'},
                  ]}>
                  <Text style={styles.textBtnMenu}>Depósitos</Text>
                </Ripple>
              </View>
              {this.state.ativarFiltroData && (
                <Text style={styles.msgFiltroData}>
                  Período: {format(this.state.dataInicialFiltro, 'dd/MM/yyyy')}{' '}
                  a {format(this.state.dataFinalFiltro, 'dd/MM/yyyy')}
                </Text>
              )}
              {/* {!!this.state.valorTotal && (
            <Text style={styles.msgTotal}>Total {this.state.valorTotal}</Text>
          )} */}
            </View>
            <View style={{flex: 1}}>
              {this.state.mensagemEmpty === '' ? (
                <FlatList
                  ref={ref => (this.flatlist = ref)}
                  data={this.state.itensExtrato}
                  showsVerticalScrollIndicator={false}
                  onEndReached={async () => await this.buscarExtrato()}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={
                    this.state.loading && (
                      <ActivityIndicator
                        size="small"
                        color="#999"
                        style={{marginVertical: 30}}
                      />
                    )
                  }
                  keyExtractor={itemExtrato => String(itemExtrato.title)}
                  renderItem={({item}) => (
                    <View key={item.title} style={styles.itemContainer}>
                      <View style={styles.containerTitle}>
                        <Text style={styles.itemInfoDay}>
                          {item.title.toUpperCase()}
                        </Text>
                        {item.total && (
                          <Text style={styles.itemTotalDay}>
                            Total: {currencyFormat(Number(item.total))}
                          </Text>
                        )}
                      </View>

                      {item.data.map(requesition => (
                        <View key={requesition.id} style={styles.itemInfoContainer}>
                          <View style={styles.itemInfo}>
                            <Text style={styles.itemInfoHeader}>
                              {requesition.created_time} -{' '}
                              {requesition.requisition_setting_id <= 2
                                ? requesition.requisition_code
                                : requesition.status}
                            </Text>
                            <Text style={styles.itemInfoType}>
                              {requesition.type}
                            </Text>
                            {requesition.requisition_setting_id > 2 && (
                              <Text style={styles.itemInfoCost}>
                                Custo: {requesition.cost}
                              </Text>
                            )}
                          </View>
                          <View style={styles.containerInfoValue}>
                            <Text style={styles.itemInfoValue}>
                              {requesition.value}
                            </Text>
                            {requesition.status === 'Em andamento' && (
                              <TouchableOpacity
                                style={{flex: 1, alignItems: 'center'}}
                                onPress={() => {
                                  this.versolicitacao(
                                    requesition.id,
                                    requesition.requisition_setting_id,
                                  );
                                }}>
                                {(requesition.requisition_setting_id === 4 ||
                                  requesition.requisition_setting_id === 19) && (
                                  <>
                                    <Text
                                      style={[
                                        styles.itemInfoLink,
                                        {color: '#35791F'},
                                      ]}>
                                      VER RESUMO
                                    </Text>
                                  </>
                                )}
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                />
              ) : (
                <View style={styles.messageEmpty}>
                  <Text style={styles.textMessageEmpty}>
                    {this.state.mensagemEmpty}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(Extrato);
