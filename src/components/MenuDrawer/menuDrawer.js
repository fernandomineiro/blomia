import React, { useState, useCallback, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { responsiveFontSize as rf } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import styles from './styles';
import { shortName, limitadorString } from '../../utils/funcoes';
import api from '../../config/api';

const DrawerContentComponents = ({ client, navigation }) => {
  const [clientLogged, setClientLogged] = useState(null);

  const logout = useCallback(async () => {
    await api.delete('/auth/sign_out').then(async response => {
      await AsyncStorage.removeItem('blomia@tipoAutoLogin');
      await AsyncStorage.removeItem('blomia@textAutoLogin');
      await AsyncStorage.removeItem('blomia@passwordAutoLogin');
      await AsyncStorage.removeItem('blomia@idCompanyAutoLogin');
      await AsyncStorage.removeItem('tipoEmpresa');

      navigation.navigate('Login');
    });
  }, [navigation]);

  useEffect(() => {
    setClientLogged(client);
  }, [client]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {clientLogged && (
        <>
          <View style={styles.headerMenu}>
            <Text
              style={{ fontFamily: 'Montserrat-SemiBold', fontSize: rf(2) }}
            >
              {limitadorString(
                clientLogged.company
                  ? clientLogged.company.name
                  : shortName(clientLogged.name),
                20,
              )}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Text style={styles.labelScore}>
                {clientLogged.score_rating
                  ? clientLogged.score_rating.toFixed(1)
                  : '0.0'}
              </Text>
              <View style={styles.lineScore}>
                {clientLogged.score_rating >= 1 && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#DAA520"
                  />
                )}
                {clientLogged.score_rating >= 2 && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#DAA520"
                  />
                )}
                {clientLogged.score_rating >= 3 && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#DAA520"
                  />
                )}
                {clientLogged.score_rating >= 4 && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#DAA520"
                  />
                )}
                {clientLogged.score_rating >= 5 && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#DAA520"
                  />
                )}

                {(clientLogged.score_rating < 1 ||
                  !clientLogged.score_rating) && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#E9E9E9"
                  />
                )}
                {(clientLogged.score_rating < 2 ||
                  !clientLogged.score_rating) && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#E9E9E9"
                  />
                )}
                {(clientLogged.score_rating < 3 ||
                  !clientLogged.score_rating) && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#E9E9E9"
                  />
                )}
                {(clientLogged.score_rating < 4 ||
                  !clientLogged.score_rating) && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#E9E9E9"
                  />
                )}
                {(clientLogged.score_rating < 5 ||
                  !clientLogged.score_rating) && (
                  <Icon
                    size={24}
                    style={{ marginLeft: 5 }}
                    type="octicon"
                    name="star"
                    color="#E9E9E9"
                  />
                )}
              </View>
              <Text style={styles.labelScore}>
                {clientLogged.score_quantity
                  ? clientLogged.score_quantity
                  : '0'}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: '20%' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company
                      ? 'DadosPessoaisCompany'
                      : 'DadosPessoaisClient',
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Dados de cadastro</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company
                      ? 'SwiperScreensCompany'
                      : 'SwiperScreensClient',
                    {
                      tipoSwiper: 'logado',
                    },
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Como funciona o Blomia?</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>

              {clientLogged.company && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MinhasSenhasCompany')}
                >
                  <View style={styles.boxMenu}>
                    <Text style={styles.textmenu}>Minhas Senhas</Text>
                    <Image
                      source={require('../../assets/images/next.png')}
                      style={styles.icoMenu}
                    />
                  </View>
                </TouchableOpacity>
              )}
              {!clientLogged.company && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MinhasEmpresasClient')}
                >
                  <View style={styles.boxMenu}>
                    <Text style={styles.textmenu}>
                      {clientLogged.number_of_companies > 0
                        ? 'Minhas Empresas'
                        : 'Cadastrar meu Negócio'}
                    </Text>
                    <Image
                      source={require('../../assets/images/next.png')}
                      style={styles.icoMenu}
                    />
                  </View>
                </TouchableOpacity>
              )}
              {!clientLogged.company && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('SenhaUserClient')}
                >
                  <View style={styles.boxMenu}>
                    <Text style={styles.textmenu}>Alterar Senha</Text>
                    <Image
                      source={require('../../assets/images/next.png')}
                      style={styles.icoMenu}
                    />
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company
                      ? 'FaleConoscoCompany'
                      : 'FaleConoscoClient',
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Fale com a gente</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company ? 'TermosCompany' : 'TermosClient',
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Termos de Uso</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company
                      ? 'PrivacidadeCompany'
                      : 'PrivacidadeClient',
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Política de Privacidade</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company
                      ? 'DesativaPerfilCompany'
                      : 'DesativaPerfilClient',
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Desativar meu perfil</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    clientLogged.company ? 'CreditosCompany' : 'CreditosClient',
                  )
                }
              >
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Créditos técnicos</Text>
                  <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.icoMenu}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.boxMenu}>
                  <Text style={styles.textmenu}>Sair</Text>
                  {/* <Image source={require('../../assets/images/next.png')} style={styles.icoMenu} /> */}
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ client }) => {
  return {
    client,
  };
};

export default connect(mapStateToProps)(DrawerContentComponents);
