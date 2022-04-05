import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {TextInputMask as TextInputMoney} from 'react-native-masked-text';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

import api from '../../config/api';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

import CustomHeader from '../../components/CustomHeader/CustomHeader';

import tickImg from '../../assets/images/tick.png';

import styles from './stylesCadastroConfigEmpresa';

import Balance from '../../components/Balance';

class CadastroConfigEmpresa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carregamentoTela: true,
      horaInicio: '',
      horaFim: '',
      diasDaSemana: [],
      isVisibleSetValues: false,
      saqueDia: '',
      depositoDia: '',
      solicitacaoSaqueDiaMin: '',
      solicitacaoSaqueDiaMax: '',
      solicitacaoDepositoDiaMin: '',
      solicitacaoDepositoDiaMax: '',
      textModalNotificacao: '',
      isFocusCampoHoraInicio: false,
      isFocusCampoHoraFim: false,
      isFocusCampoSaqueDia: false,
      isFocusCampoSaqueSolicitaMax: false,
      isFocusCampoSaqueSolicitaMin: false,
      isFocusCampoDepositoDia: false,
      isFocusCampoDepositoSolicitaMax: false,
      isFocusCampoDepositoSolicitaMin: false,
      spinner: false,
      idTypeRequisition: '',
    };

    this.idEditRequisition = this.props.navigation.getParam('configuration_id');
  }

  marcarDesmarcarDia = dia => {
    const day = this.state.diasDaSemana.findIndex(diaIndex => diaIndex === dia);

    if (day < 0) {
      this.setState({diasDaSemana: [...this.state.diasDaSemana, dia]});
    } else {
      this.setState({
        diasDaSemana: this.state.diasDaSemana.filter(
          diaIndex => diaIndex !== dia,
        ),
      });
    }
  };

  removeMascara(valor) {
    return Number(
      String(valor)
        .replace('.', '')
        .replace('R$', '')
        .replace(',', '.'),
    ).toFixed(2);
  }

  verificarDia = dia => {
    return this.state.diasDaSemana.findIndex(diaIndex => diaIndex === dia) >= 0;
  };

  salvarConfiguracao = async () => {
    try {
      const valorSaqueDia = this.removeMascara(this.state.saqueDia);

      const valorSolicitacaoSaqueMax = this.removeMascara(
        this.state.solicitacaoSaqueDiaMax,
      );

      const valorSolicitacaoSaqueMin = this.removeMascara(
        this.state.solicitacaoSaqueDiaMin,
      );

      const valorDepositoDia = this.removeMascara(this.state.depositoDia);

      const valorSolicitacaoDepositoMax = this.removeMascara(
        this.state.solicitacaoDepositoDiaMax,
      );

      const valorSolicitacaoDepositoMin = this.removeMascara(
        this.state.solicitacaoDepositoDiaMin,
      );

      if (
        (this.state.idTypeRequisition !== 1 &&
          Number(valorSolicitacaoDepositoMax) > Number(valorDepositoDia)) ||
        (this.state.idTypeRequisition !== 2 &&
          Number(valorSolicitacaoSaqueMax) > Number(valorSaqueDia))
      ) {
        this.setState({
          textModalNotificacao:
            'O valor máximo por solicitação não pode ser maior que o valor disponível por dia.',
        });
        return;
      }
      if (
        (this.state.idTypeRequisition !== 1 &&
          Number(valorSolicitacaoDepositoMin) >=
            Number(valorSolicitacaoDepositoMax)) ||
        (this.state.idTypeRequisition !== 2 &&
          Number(valorSolicitacaoSaqueMin) >= Number(valorSolicitacaoSaqueMax))
      ) {
        this.setState({
          textModalNotificacao:
            'O valor máximo por solicitação deve ser maior que o valor mínimo por solicitação.',
        });
        return;
      }

      let company_configuration_id;

      this.setState({spinner: true});

      if (!this.idEditRequisition) {
        const response = await api.post(
          `company_configurations/new?configuration_type=${
            this.state.idTypeRequisition
          }&company_id=${this.props.client.company.id}`,
        );

        const configuracaoEmpresa = response.data.company_configuration;
        company_configuration_id = String(configuracaoEmpresa.id);
      } else {
        company_configuration_id = this.idEditRequisition;
      }

      const start_time = this.state.horaInicio;
      const finish_time = this.state.horaFim;
      const day = this.state.diasDaSemana.join(';');
      const total_value_day_withdrawal = String(
        this.removeMascara(this.state.saqueDia),
      );
      const total_value_day_deposit = String(
        this.removeMascara(this.state.depositoDia),
      );
      const minimum_value_withdrawal = String(
        this.removeMascara(this.state.solicitacaoSaqueDiaMin),
      );
      const maximun_value_withdrawal = String(
        this.removeMascara(this.state.solicitacaoSaqueDiaMax),
      );
      const minimum_value_deposit = String(
        this.removeMascara(this.state.solicitacaoDepositoDiaMin),
      );
      const maximun_value_deposit = String(
        this.removeMascara(this.state.solicitacaoDepositoDiaMax),
      );

      const params = {
        company_configuration_id,
        start_time,
        finish_time,
        day,
        total_value_day_withdrawal,
        total_value_day_deposit,
        minimum_value_withdrawal,
        maximun_value_withdrawal,
        minimum_value_deposit,
        maximun_value_deposit,
      };

      if (this.state.idTypeRequisition === 1) {
        delete params.minimum_value_deposit;
        delete params.maximun_value_deposit;
        delete params.total_value_day_deposit;
      } else if (this.state.idTypeRequisition === 2) {
        delete params.minimum_value_withdrawal;
        delete params.maximun_value_withdrawal;
        delete params.total_value_day_withdrawal;
      }

      let urlRequest = '';

      if (!this.idEditRequisition) {
        urlRequest = '/roles/new';
      } else {
        urlRequest = '/roles/update';
      }
      const responseSave = await api.post(urlRequest, params);

      this.setState({spinner: false});

      this.props.navigation.navigate('EmpresaNavigation');
    } catch (error) {
      this.setState({spinner: false});

      if (error.response.data.error) {
        if (
          error.response.data.error ===
          'Conflict between days and hours already configurated. Also check inactive settings'
        ) {
          this.setState({
            isVisibleSetValues: false,
            textModalNotificacao:
              'Conflito de dias e horas! Já existem configurações para este dia e horário salvas.',
          });
        }
      }
    }
  };

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

  validadeDays = () => {
    const horaInicio = String(this.state.horaInicio).split(':')[0];
    const minutosInicio = String(this.state.horaInicio).split(':')[1];
    const horaFim = String(this.state.horaFim).split(':')[0];
    const minutosFim = String(this.state.horaFim).split(':')[1];

    if (!horaInicio || !minutosInicio || (!horaFim || !minutosFim)) {
      this.setState({
        textModalNotificacao:
          'Preencha corretamente a hora de início e fim da configuração.',
      });
      return;
    }

    if (
      Number(horaInicio) > 23 ||
      Number(horaFim) > 23 ||
      Number(minutosInicio) > 59 ||
      Number(minutosFim) > 59
    ) {
      this.setState({
        textModalNotificacao: 'Hora inválida',
      });
      return;
    }

    if (
      Number(this.state.horaFim.replace(':', '')) <=
      Number(this.state.horaInicio.replace(':', ''))
    ) {
      this.setState({
        textModalNotificacao:
          'A hora inicial deve ser maior que a hora de final em pelo menos um minuto.',
      });
      return;
    }

    if (this.state.diasDaSemana.length === 0) {
      this.setState({
        textModalNotificacao: 'Selecione ao menos um dia para continuar',
      });
      return;
    }

    this.setState({isVisibleSetValues: true});
  };

  carregarDadosEdicao = async () => {
    try {
      const response = await api.get(
        `/company_configurations/${this.idEditRequisition}`,
      );

      const configuracao = response.data;

      if (this.state.idTypeRequisition !== 1) {
        this.setState({
          depositoDia: configuracao.total_value_day_deposit,
          solicitacaoDepositoDiaMax: configuracao.maximun_value_deposit,
          solicitacaoDepositoDiaMin: configuracao.minimum_value_deposit,
        });
      }

      if (this.state.idTypeRequisition !== 2) {
        this.setState({
          saqueDia: configuracao.total_value_day_withdrawal,
          solicitacaoSaqueDiaMax: configuracao.maximun_value_withdrawal,
          solicitacaoSaqueDiaMin: configuracao.minimum_value_withdrawal,
        });
      }

      this.setState({
        horaInicio: configuracao.start_time,
        horaFim: configuracao.finish_time,
        diasDaSemana: configuracao.days,
      });
    } catch (error) {}
  };

  resetPage = async () => {
    await this.setState({
      carregamentoTela: true,
      horaInicio: '',
      horaFim: '',
      diasDaSemana: [],
      isVisibleSetValues: false,
      saqueDia: '',
      depositoDia: '',
      solicitacaoSaqueDiaMin: '',
      solicitacaoSaqueDiaMax: '',
      solicitacaoDepositoDiaMin: '',
      solicitacaoDepositoDiaMax: '',
      textModalNotificacao: '',
      isFocusCampoHoraInicio: false,
      isFocusCampoHoraFim: false,
      isFocusCampoSaqueDia: false,
      isFocusCampoSaqueSolicitaMax: false,
      isFocusCampoSaqueSolicitaMin: false,
      isFocusCampoDepositoDia: false,
      isFocusCampoDepositoSolicitaMax: false,
      isFocusCampoDepositoSolicitaMin: false,
      spinner: false,
    });

    if (!this.state.carregamentoTela) {
      this.setState({carregamentoTela: true});
    }

    if (this.idEditRequisition) {
      await this.carregarDadosEdicao();
    }

    this.setState({carregamentoTela: false});

    this.setState({idTypeRequisition: this.props.navigation.getParam(
      'configuration_type',
    )});
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.resetPage();
    });

    this.resetPage();
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.setState({isVisibleModalWelcome: false, isVisibleModalCreate: false});
  }

  render() {
    let diasDaSemana = [
      {
        dia: 'Segunda-feira',
        chave: 'Monday',
      },
      {
        dia: 'Terça-feira',
        chave: 'Tuesday',
      },
      {
        dia: 'Quarta-feira',
        chave: 'Wednesday',
      },
      {
        dia: 'Quinta-feira',
        chave: 'Thursday',
      },
      {
        dia: 'Sexta-feira',
        chave: 'Friday',
      },
      {
        dia: 'Sábado',
        chave: 'Saturday',
      },
      {
        dia: 'Domingo',
        chave: 'Sunday',
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.conteudoPagina}>
          {!this.state.carregamentoTela ? (
            <>
              <Spinner visible={this.state.spinner} color="white" />
              <Modal
                isVisible={this.state.textModalNotificacao !== ''}
                style={{alignItems: 'center'}}
                animationIn="slideInRight"
                animationOut="slideOutLeft"
                transparent={true}>
                <View style={styles.containerModalNotificacao}>
                  <Text style={styles.titleModalNotificacao}>
                    {this.state.textModalNotificacao}
                  </Text>

                  <View style={styles.containerBotoesModalNotificacao}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({textModalNotificacao: ''});
                      }}>
                      <Text style={styles.btVoltarModalNotificacao}>
                        VOLTAR
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <ScrollView style={{flex: 1}}>
                <CustomHeader
                  title="Cadastro configuração Empresa"
                  navigation={this.props.navigation}
                />
                <View style={styles.content}>
                  <View style={styles.containerSaldo}>
                    <Balance />
                  </View>

                  {!this.state.isVisibleSetValues ? (
                    <View style={styles.contentAlinhamento}>
                      <Text style={styles.titleDescription}>
                        Horário de funcionamento
                      </Text>
                      <View style={styles.containerOptionHeader}>
                        <View style={{alignItems: 'center'}}>
                          <Text style={styles.labelOptionHeader}>
                            Hora início
                          </Text>
                          <View
                            style={[
                              styles.fieldInput,
                              this.state.isFocusCampoHoraInicio
                                ? {borderColor: '#007F0B'}
                                : {borderColor: '#B3B3B3'},
                            ]}>
                            <TextInputMask
                              style={[styles.textFieldInput]}
                              onFocus={() => {
                                this.setState({isFocusCampoHoraInicio: true});
                              }}
                              onBlur={() => {
                                this.setState({isFocusCampoHoraInicio: false});
                              }}
                              value={this.state.horaInicio}
                              placeholder="08:00"
                              keyboardType="number-pad"
                              mask="[00]:[00]"
                              onChangeText={text => {
                                this.setState({horaInicio: text});
                              }}
                            />
                          </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                          <Text style={styles.labelOptionHeader}>Hora fim</Text>
                          <View
                            style={[
                              styles.fieldInput,
                              this.state.isFocusCampoHoraFim
                                ? {borderColor: '#007F0B'}
                                : {borderColor: '#B3B3B3'},
                            ]}>
                            <TextInputMask
                              style={[styles.textFieldInput]}
                              onFocus={() => {
                                this.setState({isFocusCampoHoraFim: true});
                              }}
                              onBlur={() => {
                                this.setState({isFocusCampoHoraFim: false});
                              }}
                              value={this.state.horaFim}
                              keyboardType="number-pad"
                              placeholder="18:00"
                              mask="[00]:[00]"
                              onChangeText={text => {
                                this.setState({horaFim: text});
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <Text style={styles.titlePage}>
                        Clique para selecionar os dias para ativar
                      </Text>
                      <Text style={styles.titleCadastro}>
                        {this.descricaoTipo(this.state.idTypeRequisition)}
                      </Text>
                      {diasDaSemana.map(diaSemana => (
                        <TouchableOpacity
                          key={diaSemana.chave}
                          style={styles.btTouch}
                          onPress={() => {
                            this.marcarDesmarcarDia(diaSemana.chave);
                          }}>
                          <View
                            style={[
                              styles.btDiaDaSemana,
                              this.verificarDia(diaSemana.chave)
                                ? {borderColor: '#007F0B'}
                                : {borderColor: '#B3B3B3'},
                            ]}>
                            <Text
                              style={[
                                styles.textBtDiaDaSemana,
                                this.verificarDia(diaSemana.chave)
                                  ? {color: '#007F0B'}
                                  : {color: '#B3B3B3'},
                              ]}>
                              {diaSemana.dia}
                            </Text>
                            {this.verificarDia(diaSemana.chave) && (
                              <Image
                                source={tickImg}
                                style={styles.tickImgDay}
                                resizeMode="stretch"
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <>
                      <View style={styles.contentAlinhamento}>
                        <Text style={styles.titlePage}>
                          Clique para informar os limites para ativar
                        </Text>
                        <Text style={styles.titleCadastro}>
                          {this.descricaoTipo(this.state.idTypeRequisition)}
                        </Text>
                        <View style={styles.containerOptionHeader}>
                          {this.state.idTypeRequisition !== 2 && (
                            <View style={styles.itemOptionHeader}>
                              <Text style={styles.labelOptionHeader}>
                                R$ disponível Saques por dia
                              </Text>
                              <View
                                style={[
                                  styles.fieldInput,
                                  this.state.isFocusCampoSaqueDia
                                    ? {borderColor: '#007F0B'}
                                    : {borderColor: '#B3B3B3'},
                                ]}>
                                <TextInputMoney
                                  style={[styles.textFieldInput]}
                                  onFocus={() => {
                                    this.setState({isFocusCampoSaqueDia: true});
                                  }}
                                  onBlur={() => {
                                    this.setState({
                                      isFocusCampoSaqueDia: false,
                                    });
                                  }}
                                  value={this.state.saqueDia}
                                  placeholder="R$0,00"
                                  keyboardType="number-pad"
                                  type={'money'}
                                  options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                  }}
                                  onChangeText={text => {
                                    this.setState({saqueDia: text});
                                  }}
                                />
                              </View>
                            </View>
                          )}
                          {this.state.idTypeRequisition !== 1 && (
                            <View style={styles.itemOptionHeader}>
                              <Text style={styles.labelOptionHeader}>
                                R$ Total em depósitos por dia
                              </Text>
                              <View
                                style={[
                                  styles.fieldInput,
                                  this.state.isFocusCampoDepositoDia
                                    ? {borderColor: '#007F0B'}
                                    : {borderColor: '#B3B3B3'},
                                ]}>
                                <TextInputMoney
                                  style={[styles.textFieldInput]}
                                  onFocus={() => {
                                    this.setState({
                                      isFocusCampoDepositoDia: true,
                                    });
                                  }}
                                  onBlur={() => {
                                    this.setState({
                                      isFocusCampoDepositoDia: false,
                                    });
                                  }}
                                  value={this.state.depositoDia}
                                  placeholder="R$0,00"
                                  keyboardType="number-pad"
                                  type={'money'}
                                  options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                  }}
                                  onChangeText={text => {
                                    this.setState({depositoDia: text});
                                  }}
                                />
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                      {this.state.idTypeRequisition !== 2 && (
                        <>
                          <View style={styles.titleValores}>
                            <Text style={styles.textTileValores}>
                              Saques (valores por solicitação)
                            </Text>
                          </View>
                          <View style={styles.contentAlinhamento}>
                            <View style={styles.containerOptionHeader}>
                              <View style={styles.itemOptionHeader}>
                                <Text style={styles.labelOptionHeader}>
                                  Mínimo
                                </Text>
                                <View
                                  style={[
                                    styles.fieldInput,
                                    this.state.isFocusCampoSaqueSolicitaMin
                                      ? {borderColor: '#007F0B'}
                                      : {borderColor: '#B3B3B3'},
                                  ]}>
                                  <TextInputMoney
                                    style={[styles.textFieldInput]}
                                    onFocus={() => {
                                      this.setState({
                                        isFocusCampoSaqueSolicitaMin: true,
                                      });
                                    }}
                                    onBlur={() => {
                                      this.setState({
                                        isFocusCampoSaqueSolicitaMin: false,
                                      });
                                    }}
                                    value={this.state.solicitacaoSaqueDiaMin}
                                    keyboardType="number-pad"
                                    placeholder="R$0,00"
                                    type={'money'}
                                    options={{
                                      precision: 2,
                                      separator: ',',
                                      delimiter: '.',
                                      unit: 'R$',
                                    }}
                                    onChangeText={text => {
                                      this.setState({
                                        solicitacaoSaqueDiaMin: text,
                                      });
                                    }}
                                  />
                                </View>
                              </View>
                              <View style={styles.itemOptionHeader}>
                                <Text style={styles.labelOptionHeader}>
                                  Máximo
                                </Text>
                                <View
                                  style={[
                                    styles.fieldInput,
                                    this.state.isFocusCampoSaqueSolicitaMax
                                      ? {borderColor: '#007F0B'}
                                      : {borderColor: '#B3B3B3'},
                                  ]}>
                                  <TextInputMoney
                                    style={[styles.textFieldInput]}
                                    onFocus={() => {
                                      this.setState({
                                        isFocusCampoSaqueSolicitaMax: true,
                                      });
                                    }}
                                    onBlur={() => {
                                      this.setState({
                                        isFocusCampoSaqueSolicitaMax: false,
                                      });
                                    }}
                                    value={this.state.solicitacaoSaqueDiaMax}
                                    keyboardType="number-pad"
                                    placeholder="R$0,00"
                                    type={'money'}
                                    options={{
                                      precision: 2,
                                      separator: ',',
                                      delimiter: '.',
                                      unit: 'R$',
                                    }}
                                    onChangeText={text => {
                                      this.setState({
                                        solicitacaoSaqueDiaMax: text,
                                      });
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                      {this.state.idTypeRequisition !== 1 && (
                        <>
                          <View style={styles.titleValores}>
                            <Text style={styles.textTileValores}>
                              Depósitos (valores por solicitação)
                            </Text>
                          </View>
                          <View style={styles.contentAlinhamento}>
                            <View style={styles.containerOptionHeader}>
                              <View style={styles.itemOptionHeader}>
                                <Text style={styles.labelOptionHeader}>
                                  Mínimo
                                </Text>
                                <View
                                  style={[
                                    styles.fieldInput,
                                    this.state.isFocusCampoDepositoSolicitaMin
                                      ? {borderColor: '#007F0B'}
                                      : {borderColor: '#B3B3B3'},
                                  ]}>
                                  <TextInputMoney
                                    style={[styles.textFieldInput]}
                                    onFocus={() => {
                                      this.setState({
                                        isFocusCampoDepositoSolicitaMin: true,
                                      });
                                    }}
                                    onBlur={() => {
                                      this.setState({
                                        isFocusCampoDepositoSolicitaMin: false,
                                      });
                                    }}
                                    value={this.state.solicitacaoDepositoDiaMin}
                                    keyboardType="number-pad"
                                    placeholder="R$0,00"
                                    type={'money'}
                                    options={{
                                      precision: 2,
                                      separator: ',',
                                      delimiter: '.',
                                      unit: 'R$',
                                    }}
                                    onChangeText={text => {
                                      this.setState({
                                        solicitacaoDepositoDiaMin: text,
                                      });
                                    }}
                                  />
                                </View>
                              </View>
                              <View style={styles.itemOptionHeader}>
                                <Text style={styles.labelOptionHeader}>
                                  Máximo
                                </Text>
                                <View
                                  style={[
                                    styles.fieldInput,
                                    this.state.isFocusCampoDepositoSolicitaMax
                                      ? {borderColor: '#007F0B'}
                                      : {borderColor: '#B3B3B3'},
                                  ]}>
                                  <TextInputMoney
                                    style={[styles.textFieldInput]}
                                    onFocus={() => {
                                      this.setState({
                                        isFocusCampoDepositoSolicitaMax: true,
                                      });
                                    }}
                                    onBlur={() => {
                                      this.setState({
                                        isFocusCampoDepositoSolicitaMax: false,
                                      });
                                    }}
                                    value={this.state.solicitacaoDepositoDiaMax}
                                    keyboardType="number-pad"
                                    placeholder="R$0,00"
                                    type={'money'}
                                    options={{
                                      precision: 2,
                                      separator: ',',
                                      delimiter: '.',
                                      unit: 'R$',
                                    }}
                                    onChangeText={text => {
                                      this.setState({
                                        solicitacaoDepositoDiaMax: text,
                                      });
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                    </>
                  )}
                </View>

                <View style={styles.containerButtonBottom}>
                  <ButtonCustom
                    rippleCentered={true}
                    navegar={() => {
                      if (!this.state.isVisibleSetValues) {
                        this.validadeDays();
                      } else {
                        this.salvarConfiguracao();
                      }
                    }}
                    textButton={
                      !this.state.isVisibleSetValues
                        ? 'CONTINUAR'
                        : !this.idEditRequisition
                        ? 'SALVAR'
                        : 'ALTERAR'
                    }
                    btnColor={'#007F0B'}
                    textColor={'white'}
                    borderColor={'#007f0b'}
                    styleCustom={{marginBottom: 30}}
                  />
                </View>
              </ScrollView>
            </>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(CadastroConfigEmpresa);
