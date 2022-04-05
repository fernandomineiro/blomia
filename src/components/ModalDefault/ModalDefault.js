import React, {Component, useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

function ModalDefault({imageAdd, ...props}) {
  // Declare uma nova variável de state, a qual chamaremos de "count"
  const [modal, setModal] = useState(true);

  useEffect(() => {
    // setModal(props.modalState);
  }, []);

  return (
    <Modal
      useNativeDriver={true}
      animationType="fade"
      isVisible={props.openModal}>
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          {props.tipoModal == 'erro' && (
            <Text style={styles.titulo}> Algo errado! </Text>
          )}
          {props.tipoModal == 'alerta' && (
            <Text style={styles.tituloAlert}> Atenção! </Text>
          )}
        </View>
        <View style={styles.modalContent}>
          {props.MsgErro.map(msg => {
            return (
              <Text key={Math.random} style={styles.MsgContent}>
                • {msg}
              </Text>
            );
          })}
          {imageAdd && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Image
                style={styles.imgPadLock}
                resizeMethod="resize"
                resizeMode="contain"
                source={imageAdd}
              />
            </View>
          )}
        </View>

        <View style={styles.modalFooter}>
          <TouchableOpacity onPress={props.closeModal}>
            <Text style={styles.BtnFechar}>FECHAR</Text>
          </TouchableOpacity>

          {props.tipoModal == 'alerta' && (
            <TouchableOpacity onPress={props.loginPgLoad}>
              <Text style={styles.BtnEntrar}>ENTRAR</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
export default ModalDefault;
