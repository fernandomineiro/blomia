import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import IconFeather from 'react-native-vector-icons/Feather';
import { currencyFormat } from '../../utils/funcoes';

import styles from './styles';

function ModalCoast({ isVisible, handleClose, coastValue, requisitionValue }) {
  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      onSwipeComplete={handleClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      transparent
      onBackdropPress={handleClose}
      style={{ margin: 0 }}
    >
      <View style={{ flex: 1 }} />
      <View style={styles.container}>
        <IconFeather name="minus" color="#E8E8E8" size={30} />
        <Text style={styles.textTitleModal}>Detalhamento dos Custos</Text>
        <View style={styles.containerText}>
          <Text style={styles.textLabel}>
            {'Valor escolhido: '}
            <Text style={styles.textValueLabel}>
              {currencyFormat(requisitionValue)}
            </Text>
          </Text>
          <Text style={styles.textLabel}>
            {'Custo: '}
            <Text style={styles.textValueLabel}>
              {currencyFormat(coastValue)}
            </Text>
          </Text>
          <Text style={styles.textLabel}>
            {'Valor total: '}
            <Text style={styles.textValueLabel}>
              {currencyFormat(requisitionValue + coastValue)}
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.buttonClose}>
          <Text style={styles.textButtonClose}>ENTENDI</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ModalCoast;
