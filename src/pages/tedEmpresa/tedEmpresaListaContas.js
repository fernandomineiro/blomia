import React, { useEffect, useState, useCallback } from 'react';

import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import api from '../../config/api';
// import TextInputMask from 'react-native-text-input-mask';
// import ModalTriplo from '../../components/ModalTriplo/ModalTriplo';

import Balance from '../../components/Balance';

import styles from './stylesListaContas';

function TedEmpresaListaContas({ client, navigation }) {
  const [contas, setContas] = useState([]);
  const [valueTransfer, setValueTransfer] = useState(0);
  const [coastTransfer, setCoastTransfer] = useState(0);

  useEffect(() => {
    const { requisitionValue, coastValue } = navigation.state.params;

    buscarContas();

    setValueTransfer(requisitionValue);
    setCoastTransfer(coastValue);
  }, [buscarContas, navigation.state.params]);

  const buscarContas = useCallback(async () => {
    await api
      .get(`/bank_accounts?company_id=${client.company.id}`)
      .then(async response => {
        // Atualiza tokens para proxima requisição

        setContas(response.data);
      });
  }, [client.company.id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      {contas ? (
        <>
          <CustomHeader
            title="Setting"
            navigation={navigation}
            isHome={false}
          />
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Balance />
              </View>
              <Text style={styles.headerText}>Selecione a conta bancária</Text>
              <View style={styles.containerList}>
                {contas &&
                  contas.map(conta => (
                    <View style={styles.containerItemList} key={conta.id}>
                      <TouchableOpacity
                        onPress={() => {
                          const dataPageSend = {
                            data: conta,
                            urlSalvarConta: 'bank_accounts',
                            requisitionValue: valueTransfer,
                            coastValue: coastTransfer,
                            nameBank: conta.bank_name,
                            descriptionAccountType: conta.account_type,
                            accountId: conta.id,
                          };

                          console.log('dados da conta', dataPageSend);

                          navigation.navigate(
                            'confirmationTransferenciaCompany',
                            dataPageSend,
                          );
                        }}
                        style={styles.containerDescriptionItemList}
                      >
                        <View style={styles.descriptionItemList}>
                          <Text style={styles.textItem}>
                            {conta.owner_name}
                          </Text>
                          <Text style={styles.textItem}>{conta.bank_name}</Text>
                          <Text style={styles.textItem}>
                            {`Agência ${conta.agency} Conta ${conta.account_number}-${conta.account_digit}`}
                          </Text>
                        </View>
                        <Icon
                          name="chevron-right"
                          type="font-awesome"
                          color="#333333"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </View>
            <ButtonCustom
              rippleCentered
              navegar={() => {
                navigation.navigate('tedEmpresaCadastro', {
                  requisitionValue: valueTransfer,
                  coastValue: coastTransfer,
                });
              }}
              textButton="OUTRA CONTA"
              btnColor="#007F0B"
              textColor="white"
              borderColor="#007f0b"
              styleCustom={{ marginVertical: 30 }}
            />
          </ScrollView>
        </>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = ({ client }) => {
  return { client };
};

export default connect(mapStateToProps)(TedEmpresaListaContas);
