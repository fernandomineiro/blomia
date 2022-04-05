import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../config/api';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {limitadorString} from '../../utils/funcoes';

import roadImage from '../../assets/images/roadImage.png';

import styles from './styles';

function MinhasEmpresas({navigation}) {
  const [saldo, setSaldo] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getInfo() {
      setLoading(true);
      await getBalance();
      await getMyCompanies();
      setLoading(false);
    }

    getInfo();
  }, [getBalance, getMyCompanies]);

  const getMyCompanies = useCallback(async () => {
    const response = await api.get('companies');
    if (!response.data.message) {
      setCompanies(response.data);
    }
  }, []);

  const handleEntry = async id => {
    setLoading(true);
    await AsyncStorage.setItem('blomia@idCompanyAutoLogin', String(id));
    setLoading(false);
    navigation.navigate('Login');
  };

  const getBalance = useCallback(async () => {
    await api
      .get('simple_balance')
      .then(async response => {
        setSaldo(response.data.balance.replace('R$', ''));
      })
      .catch(async error => {
        //Atualiza tokens para proxima requisição
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <CustomHeader title="Setting" isHome={false} navigation={navigation} />
      {!loading ? (
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.saldoText}>
                Dinheiro disponível R${saldo}
              </Text>
            </View>
            <Text style={styles.headerText}>Empresas Cadastradas</Text>
            {companies.length > 0 ? (
              <View style={styles.containerList}>
                {companies.map(({company}) => (
                  <View key={company.id} style={styles.containerItemList}>
                    <View style={{flex: 1}}>
                      <Text style={styles.textItemNome}>
                        {limitadorString(company.company_name, 20)}
                      </Text>
                      <Text style={styles.textItemEndereco}>
                        {/* {limitadorString(company.address.street, 25)},{' '}
                        {company.address.number} */}
                        {company.address?.street}, {company.address?.number}
                      </Text>
                      <Text style={styles.textItem}>
                        Status:{' '}
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            color: company.status ? '#007F0B' : '#DAA520',
                          }}>
                          {company.status}
                        </Text>
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleEntry(company.id);
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          color: '#007F0B',
                          paddingLeft: 15,
                        }}>
                        Entrar
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.containerEmpty}>
                <Image
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={styles.roadImage}
                  source={roadImage}
                />
                <Text style={styles.textEmpty}>
                  Se você também é comerciante cadastre seu comércio e seja um
                  ponto de saque e depósito!
                </Text>
              </View>
            )}
          </View>
          <ButtonCustom
            rippleCentered={true}
            navegar={() => {
              navigation.navigate('CadastroEmpresaNav');
            }}
            textButton={'ADICIONAR EMPRESA'}
            btnColor={'#007F0B'}
            textColor={'white'}
            borderColor={'#007f0b'}
            styleCustom={styles.buttonCustom}
          />
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default MinhasEmpresas;
