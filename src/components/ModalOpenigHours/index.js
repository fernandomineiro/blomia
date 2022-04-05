import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import IconFeather from 'react-native-vector-icons/Feather';
import IconOctions from 'react-native-vector-icons/Octicons';

import styles from './styles';

function ModalCoast({ isVisible, handleClose }) {
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
        <Text style={styles.textTitleModal}>Detalhamento dos horários</Text>
        <View style={styles.containerText}>
          <View style={styles.paragraph}>
            <IconOctions name="primitive-dot" color="#007f0b" size={24} />
            <Text style={styles.textLabel}>
              Em pagamentos de boleto rápido efetuados até ás 20:00 em dias
              úteis o dinheiro fica disponível no mesmo dia.
            </Text>
          </View>
          <View style={styles.paragraph}>
            <IconOctions name="primitive-dot" color="#007f0b" size={24} />
            <Text style={styles.textLabel}>
              Em pagamentos de boleto rápido efetuados após ás 20:00 em dias
              úteis o dinheiro fica disponível no próximo dia útil.
            </Text>
          </View>
          <View style={styles.paragraph}>
            <IconOctions name="primitive-dot" color="#007f0b" size={24} />
            <Text style={styles.textLabel}>
              Em pagamentos de boleto rápido efetuados em dias não utéis o
              dinheiro ficará disponível no próximo dia útil.
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.buttonClose}>
          <Text style={styles.textButtonClose}>ENTENDI</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ModalCoast;
