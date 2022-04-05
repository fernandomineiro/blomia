import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

export default class ModalDuplo extends Component {
  render() {
    return (
      <Modal
        useNativeDriver
        isVisible={this.props.visibleExit}
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalFiller} />
          <View style={styles.modalTitleContainer}>
            <Text style={styles.textTitle}>{this.props.titulo}</Text>
            <Text style={styles.text}>{this.props.conteudo}</Text>
          </View>
          <View style={styles.modalButtonFooter}>
            <TouchableOpacity onPress={this.props.function}>
              <Text style={[styles.text, { color: 'green' }]}>
                {this.props.buttonFunctionText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
