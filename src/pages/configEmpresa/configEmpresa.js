import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Switch,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {CheckBox} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

import trashImg from '../../assets/images/trash.png';
import pencilImg from '../../assets/images/pencil.png';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import arrowLeft from '../../assets/images/arrow-left.png';
import logoImg from '../../assets/images/blomialogo.png';
import welcomeConfigEmpresaImg from '../../assets/images/imgWelcomeConfigEmpresa.png';
import Balance from '../../components/Balance';

import api from '../../config/api';

import styles from './stylesConfig';

class ConfigEmpresa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carregamentoTela: true,
      isVisibleModalWelcome: false,
      isVisibleModalCreate: false,
      isVisibleModalApagar: false,
      configuracoesSalvas: [],
      checkedFeriado: false,
      spinner: false,
    };
  }

  abrirModalCriarConfig = () => {
    this.setState({isVisibleModalWelcome: false, isVisibleModalCreate: true});
  };

  navegarTelaCriarConfig = configuration_type => {
    this.setState({isVisibleModalCreate: false});

    this.props.navigation.navigate('cadastroConfigEmpresa', {
      configuration_type,
    });
  };

  navegarTelaEditarConfig = ({configuration_type, configuration_id}) => {
    this.props.navigation.navigate('cadastroConfigEmpresa', {
      configuration_type,
      configuration_id,
    });
  };

  ativarModalApagar = idApagar => {
    this.idApagarConfig = idApagar;
    this.setState({isVisibleModalApagar: true});
  };

  deletarConfig = async () => {
    this.setState({spinner: true});
    const id = this.idApagarConfig;
    await api
      .delete(`/company_configurations/${id}`)
      .then(async response => {
        this.setState({spinner: false});

        this.setState({
          configuracoesSalvas: this.state.configuracoesSalvas.filter(
            config => config.id !== id,
          ),
        });
      })
      .catch(async error => {
        this.setState({spinner: false});
      });
    this.setState({isVisibleModalApagar: false});
  };

  buscarConfiguracoes = async () => {
    await api
      .get(
        `/list_company_configuration_with_roles?company_id=${
          this.props.client.company.id
        }`,
      )
      .then(async response => {

        if (response.data.company_configurations) {
          this.setState({
            configuracoesSalvas: response.data.company_configurations,
            checkedFeriado: response.data.open_holiday,
          });
        } else {
          this.setState({isVisibleModalWelcome: true});
        }
      })
      .catch(async error => {

      });
  };

  marcaFeriado = async () => {
    this.setState({spinner: true});
    const params = {
      company: {
        open_holiday: this.state.checkedFeriado ? 'false' : 'true',
      },
    };
    await api
      .patch(`/companies?company_id=${this.props.client.company.id}`, params)
      .then(async response => {
        this.setState({spinner: false});
        this.setState({checkedFeriado: !this.state.checkedFeriado});
      })
      .catch(async error => {
        this.setState({spinner: false});
      });
  };

  alterarStatus = async (id, statusNovo) => {
    this.setState({spinner: true});
    const params = {
      company_configuration: {
        status: statusNovo,
      },
    };
    await api
      .patch(`/company_configurations/${id}`, params)
      .then(async response => {
        this.setState({spinner: false});

        this.setState({
          configuracoesSalvas: this.state.configuracoesSalvas.map(config => {
            if (config.id === id) {
              config.status = response.data.company_configuration.status;
            }
            return config;
          }),
        });
      })
      .catch(async error => {
        this.setState({spinner: false});
      });
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({
        carregamentoTela: true,
        isVisibleModalWelcome: false,
        isVisibleModalCreate: false,
        isVisibleModalApagar: false,
        configuracoesSalvas: [],
        checkedFeriado: false,
        spinner: false,
      });
      this.setState({spinner: true});
      await this.buscarConfiguracoes();
      this.setState({spinner: false, carregamentoTela: false});

    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.setState({isVisibleModalWelcome: false, isVisibleModalCreate: false});
  }

  descricaoTipo = idType => {
    switch (idType) {
      case 1:
        return 'Saque';
      case 2:
        return 'Depósito';
      default:
        return 'Saque + Depósito';
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={this.state.spinner} color="white" />
        <Modal
          isVisible={this.state.isVisibleModalWelcome}
          style={styles.modalInitial}
          animationIn="slideInRight"
          animationOut="slideOutLeft"
          transparent={false}>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.containerModal}>
              <View
                style={{
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isVisibleModalWelcome: false});
                    navigation.navigate('inicioEmpresa');
                  }}>
                  <Image
                    style={styles.imgBackModal}
                    source={arrowLeft}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <Image
                style={styles.imgLogoModal}
                source={logoImg}
                resizeMode="stretch"
              />
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginHorizontal: 20}}>
                  <Text style={styles.titleModal}>
                    Como funciona a configuração?
                  </Text>
                  <Text style={styles.textModal}>
                    Após ser criada a configuração ficará ativa de forma
                    recorrente. Uma vez ativa você aparecerá para saques e/ou
                    depósitos compatíveis com sua configuração.
                  </Text>
                  <Text style={styles.textModal}>
                    Você poderá criar uma ou mais configurações. Isso é útil
                    caso seu estabelecimento funcione em horários diferentes ao
                    longo da semana.
                  </Text>
                  <Text style={styles.textModal}>
                    Além disso você será capaz de inativar, ativar, excluir ou
                    editar configurações.
                  </Text>
                </View>
                <Text style={styles.titleImgModal}>Veja o exemplo abaixo:</Text>
                <Image
                  source={welcomeConfigEmpresaImg}
                  style={styles.imgModal}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.containerBottom}>
                <ButtonCustom
                  rippleCentered={true}
                  navegar={this.abrirModalCriarConfig}
                  textButton={'CONFIGURAR'}
                  btnColor={'#007F0B'}
                  textColor={'white'}
                  borderColor={'#007f0b'}
                  styleCustom={{marginBottom: 30}}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
        <Modal
          useNativeDriver={true}
          isVisible={this.state.isVisibleModalCreate}
          style={{
            marginHorizontal: 0,
            paddingHorizonte: 0,
            marginBottom: 0,
            paddingBottom: 0,
          }}
          onSwipeComplete={() => {
            this.setState({isVisibleModalCreate: false});
          }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          transparent={true}
          onBackButtonPress={() => {
            this.setState({isVisibleModalCreate: false});
          }}
          onBackdropPress={() => {
            this.setState({isVisibleModalCreate: false});
          }}>
          <View style={{flex: 1}} />
          <View style={styles.container}>
            <View style={styles.containerModalCreateConfig}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.navegarTelaCriarConfig(3);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.containerBtSaqueDepositoModal}>
                    <Text style={styles.textBtSaqueDepositoModal}>
                      SAQUE + DEPÓSITO
                    </Text>
                  </View>

                  <View style={styles.imgBtSaqueDepositoModal}>
                    <Image
                      style={{height: '37%'}}
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                      source={require('../../assets/images/next.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.containerBtSaqueModal}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.navegarTelaCriarConfig(1);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.containerTextBtSaqueModal}>
                    <Text style={styles.textBtSaqueModal}>SAQUE</Text>
                  </View>
                  <View style={styles.imgBtSaqueModal}>
                    <Image
                      style={{height: '37%'}}
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                      source={require('../../assets/images/next.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.containerBtDepositoModal}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.navegarTelaCriarConfig(2);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.containerTextBtDepositoModal}>
                    <Text style={styles.textBtDepositoModal}>DEPÓSITO</Text>
                  </View>
                  <View style={styles.imgBtDepositoModal}>
                    <Image
                      style={{height: '37%'}}
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                      source={require('../../assets/images/next.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isVisibleModalApagar}
          style={{alignItems: 'center'}}
          animationIn="slideInRight"
          animationOut="slideOutLeft"
          transparent={true}>
          <View style={styles.containerModalApagar}>
            <Text style={styles.titleModalApagar}>
              Certeza que deseja excluir essa configuração?
            </Text>

            <View style={styles.containerBotoesModalApagar}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isVisibleModalApagar: false});
                }}>
                <Text style={styles.btVoltarModalApagar}>VOLTAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deletarConfig}>
                <Text style={styles.btSalvarModalApagar}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {!this.state.carregamentoTela ? (
          <ScrollView style={{flex: 1}}>
            <View style={styles.conteudoPagina}>
              <View style={styles.containerPrincipal}>
                <View>
                  <CustomHeader
                    title="Configuração Empresa"
                    isHome={true}
                    navigation={this.props.navigation}
                  />
                  <View style={styles.containerSaldo}>
                    <Balance />
                  </View>
                  <Text style={styles.titlePage}>Configurações</Text>
                  <View style={[styles.containerConfiguracoes]}>
                    {this.state.configuracoesSalvas.map(configuracao => (
                      <View
                        key={configuracao.id}
                        style={styles.itemConfiguracao}>
                        <View style={styles.containerToogle}>
                          <Switch
                            trackColor={{false: '#848484', true: '#477E22'}}
                            thumbColor={
                              configuracao.status === 'Ativo'
                                ? '#A2BE90'
                                : '#B3B3B3'
                            }
                            ios_backgroundColor="#A2BE90"
                            onValueChange={() => {
                              this.alterarStatus(
                                configuracao.id,
                                configuracao.status === 'Ativo'
                                  ? 'Inativo'
                                  : 'Ativo',
                              );
                            }}
                            value={configuracao.status === 'Ativo'}
                          />
                        </View>
                        <View style={styles.containerInfo}>
                          <Text style={styles.titleItem}>
                            {this.descricaoTipo(
                              configuracao.configuration_type,
                            )}
                          </Text>
                          <Text style={styles.daysItem}>
                            {configuracao.days.join(', ')}
                          </Text>
                          <Text style={styles.horasItem}>
                            {configuracao.start_time} às{' '}
                            {configuracao.finish_time}
                          </Text>
                          <Text
                            style={[
                              styles.statusItem,
                              configuracao.status === 'Ativo'
                                ? {color: '#007F0B'}
                                : {color: '#ED3832'},
                            ]}>
                            {configuracao.status}
                          </Text>
                        </View>
                        <View style={styles.containerOptions}>
                          <TouchableOpacity
                            onPress={() => {
                              this.ativarModalApagar(configuracao.id);
                            }}>
                            <Image
                              source={trashImg}
                              style={styles.imgItem}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.navegarTelaEditarConfig({
                                configuration_type:
                                  configuracao.configuration_type,
                                configuration_id: configuracao.id,
                              });
                            }}>
                            <Image
                              source={pencilImg}
                              style={styles.imgItem}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                    <View>
                      <CheckBox
                        title="Marque essa opção se abre nos feriados nacionais."
                        fontFamily="Montserrat-Medium"
                        checked={this.state.checkedFeriado}
                        checkedColor="#007F0B"
                        onPress={() => {
                          this.marcaFeriado();
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ButtonCustom
                  rippleCentered={true}
                  navegar={this.abrirModalCriarConfig}
                  textButton={'ADICIONAR'}
                  btnColor={'#007F0B'}
                  textColor={'white'}
                  borderColor={'#007f0b'}
                  styleCustom={{marginVertical: 30}}
                />
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(ConfigEmpresa);
