import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import IconOctions from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';

import styles from './stylesBoleto';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Balance from '../../components/Balance';
import TipApresentation from '../../components/TipApresentation';
import api from '../../config/api';

function DepositoBoletoOpcao({ navigation }) {
  const [coastBankSplitCommon, setCoastBankSplitCommon] = useState('');
  const [coastBankSplitFast, setCoastBankSplitFast] = useState('');
  const [loadPage, setLoadPage] = useState(true);

  const findCoastPage = useCallback(async () => {
    const responseCommon = await api.get(
      '/requisition_settings/user/expenses?requisition_type=4',
    );
    setCoastBankSplitCommon(responseCommon.data[0].fee);

    const responseFast = await api.get(
      '/requisition_settings/user/expenses?requisition_type=19',
    );

    setCoastBankSplitFast(responseFast.data[0].fee);

    setLoadPage(false);
  }, []);

  useEffect(() => {
    setLoadPage(true);
    findCoastPage();
  }, [findCoastPage]);

  if (loadPage) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#007f0b" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Home" isHome={false} navigation={navigation} />
      <View style={styles.header}>
        <Balance />
      </View>
      <View style={styles.containerBotoes}>
        <Text style={styles.tituloPagina}>Selecione o tipo de boleto</Text>
        <View style={styles.cardInfo}>
          <View style={styles.botao}>
            <RectButton
              style={styles.touchableBox}
              onPress={() =>
                navigation.navigate('FormDepositoBoletoRapidoCliente')
              }
            >
              <IconOctions name="primitive-dot" color="#007f0b" size={24} />
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={styles.titleButton}>Criar boleto rápido</Text>
                <TipApresentation>Novo!</TipApresentation>
              </View>
              <IconFeather name="chevron-right" color="#B3B3B3" size={24} />
            </RectButton>
          </View>
          <View style={styles.containerTextInfo}>
            <Text style={styles.titleTextInfo}>
              Precisando de dinheiro agora?
            </Text>
            <Text style={styles.contentTextInfo}>
              Pague o boleto rápido e o saldo fica disponível em até 1 hora em
              dias úteis.
            </Text>
            <Text style={styles.contentTextInfo}>
              {`Custo: ${coastBankSplitFast}`}
            </Text>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.botao}>
            <RectButton
              style={styles.touchableBox}
              onPress={() => navigation.navigate('FormDepositoBoletoCliente')}
            >
              <IconOctions name="primitive-dot" color="#007f0b" size={24} />
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={styles.titleButton}>Criar boleto comum</Text>
              </View>
              <IconFeather name="chevron-right" color="#B3B3B3" size={24} />
            </RectButton>
          </View>
          <View style={styles.containerTextInfo}>
            <Text style={styles.titleTextInfo}>Sem pressa?</Text>
            <Text style={styles.contentTextInfo}>
              Pague o boleto comum, o saldo fica disponível em até 3 dias uteis.
            </Text>
            <Text style={styles.contentTextInfo}>
              {`Custo: ${coastBankSplitCommon}`}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DepositoBoletoOpcao;
