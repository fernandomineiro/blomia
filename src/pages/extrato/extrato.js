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
  KeyboardAvoidingView,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {format, subDays, isAfter, parseISO} from 'date-fns';
import Spinner from 'react-native-loading-spinner-overlay';

import DatePicker from '@react-native-community/datetimepicker';
import Balance from '../../components/Balance';

//
import api from '../../config/api';
import {limitadorString} from '../../utils/funcoes';

// Componentes customizados
import CustomHeader from '../../components/CustomHeader/CustomHeader';

// Imagens da página
import CalendarImg from '../../assets/images/calendar.png';
import CalendarAtivoImg from '../../assets/images/calendar-ativo.png';
import SearchImg from '../../assets/images/search.png';

import getIconStatement from '../../utils/getIconStatement';

// Estilizações
import styles from './styles';

export default class Extrato extends React.Component {
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
      mensagemEmpty: '',
      spinner: true,
      carregamentoPagina: false,
    };
  }

  versolicitacao = async (idSaque, tipo) => {
    if (tipo === 1 || tipo === 2) {
      await AsyncStorage.setItem('idSaque', JSON.stringify(idSaque));
      this.props.navigation.navigate('CodigoSaque');
    } else if (tipo === 4 || tipo === 19) {
      this.props.navigation.navigate('ResumoBoletoCliente');
    }
  };

  buscarExtrato = async (pagina = this.state.pagina) => {
    if (this.state.totalPaginas && pagina > this.state.totalPaginas) {
      return;
    }

    if (!this.state.spinner) {
      this.setState({spinner: true});
    }

    let filtro = '';

    if (this.state.filtroTipo) {
      filtro = filtro + `&requisition_type=${this.state.filtroTipo}`;
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

    try {
      if (this.state.mensagemEmpty !== '') {
        this.setState({mensagemEmpty: ''});
      }
      const response = await api.get(`/user/statement?page=${pagina}${filtro}`);

      // Setando dados do header para próxima requisição

      // Salvando resultados no estado
      const itensExtrato = response.data;

      await this.setState({
        spinner: false,
        itensExtrato: [...this.state.itensExtrato, ...itensExtrato],
        pagina: pagina + 1,
        totalPaginas: Math.ceil(
          Number(response.headers.total) / Number(response.headers['per-page']),
        ),
      });
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
      this.buscarExtrato(1);
    }
  };

  timePesquisa = null;

  deboucerPesquisa = text => {
    this.setState({textoBusca: text.replace(',', '.')});

    clearTimeout(this.timePesquisa);

    this.timePesquisa = setTimeout(() => {
      this.setState({itensExtrato: []});
      this.buscarExtrato(1);
    }, 1000);
  };

  codigoExpirado = dateExpired => {
    const dataExpiracao = parseISO(dateExpired);
    return isAfter(new Date(Date.now()), dataExpiracao);
  };

  filtrarPorData = async valor => {
    this.setState({ativarFiltroData: valor});
    await this.setState({itensExtrato: []});
    this.buscarExtrato(1);
  };

  resetPage = async () => {
    await this.setState({
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
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.resetPage();
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
              isHome={true}
              navigation={this.props.navigation}
            />
            <Modal isVisible={!!this.state.selectDate}>
              <View style={styles.modalDate}>
                <View style={styles.containerModalDate}>
                  <Text style={styles.titleModalDate}>Período</Text>
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
                  style={styles.btnCalendar}
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
                      ? 'Pesquise empresa, status, tipo ou valor'
                      : 'Pesquise status ou valor'
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
                <TouchableOpacity onPress={this.buscarExtrato}>
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
            </View>
            <View style={styles.content}>
              {this.state.mensagemEmpty === '' ? (
                <FlatList
                  ref={ref => (this.flatlist = ref)}
                  data={this.state.itensExtrato}
                  showsVerticalScrollIndicator={false}
                  onEndReached={() => this.buscarExtrato()}
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
                  keyExtractor={itemExtrato => String(itemExtrato.id)}
                  renderItem={({item}) => (
                    <View key={item.id} style={styles.itemContainer}>
                      <Image
                        source={getIconStatement(item.requisition_setting_id)}
                        style={{width: 40, height: 40, margin: 10}}
                      />
                      <View style={styles.itemContainerText}>
                        <Text style={styles.itemTextTitulo}>
                          {item.type}
                          {item.sent_to && ' enviada'}
                          {item.received_from && ' recebida'}
                        </Text>
                        <Text style={styles.itemTextValor}>{item.value}</Text>
                        <Text style={styles.itemInfoCost}>
                          Custo: {item.cost}
                        </Text>
                        {item.company_name && (
                          <Text style={styles.itemTextLocal}>
                            {limitadorString(item.company_name, 20)}
                          </Text>
                        )}
                        {item.received_from && (
                          <Text style={styles.itemTextLocal}>
                            {`De: ${limitadorString(item.received_from, 20)}`}
                          </Text>
                        )}
                        {item.sent_to && (
                          <Text style={styles.itemTextLocal}>
                            {`Para: ${limitadorString(item.sent_to, 20)}`}
                          </Text>
                        )}
                        <Text style={styles.itemTextStatus}>{item.status}</Text>
                      </View>
                      <View style={styles.itemInfoContainer}>
                        <View style={styles.itemInfoDia}>
                          <Text style={styles.textInfoDia}>
                            {item.formated_created_at} - {item.created_time}
                          </Text>
                        </View>
                        {item.status === 'Em andamento' ? (
                          <TouchableOpacity
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={() => {
                              this.versolicitacao(
                                item.id,
                                item.requisition_setting_id,
                              );
                            }}>
                            {(item.requisition_setting_id === 1 ||
                              item.requisition_setting_id === 2 ||
                              item.requisition_setting_id === 4 ||
                              item.requisition_setting_id === 19) && (
                              <>
                                <Text
                                  style={[
                                    styles.itemInfoLink,
                                    this.codigoExpirado(
                                      item.requisition_code_expires_at,
                                    )
                                      ? {color: '#ed3832'}
                                      : {color: '#35791F'},
                                  ]}>
                                  VER RESUMO
                                </Text>
                                {this.codigoExpirado(
                                  item.requisition_code_expires_at,
                                ) && (
                                  <Text style={styles.textoExpiracao}>
                                    Expirado
                                  </Text>
                                )}
                              </>
                            )}
                          </TouchableOpacity>
                        ) : null}
                      </View>
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
