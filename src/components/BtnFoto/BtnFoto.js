/* eslint-disable */
import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity, Alert, TouchableHighlight, Modal } from "react-native";
import Button from 'apsl-react-native-button';


import styles from './styles';
import Camera from "../Camera";

export default class BtnFoto extends Component {
  state = {
    modalVisible: false,
  }

  pickImage =  (uri) => {
    this.props.SetStatusFoto(uri, this.props.idButton);
    this.setModalVisible(false);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  save = async () => {
    Alert.alert('Imagem adicionada!');
  }

  handleClose = () => {
    this.setModalVisible(false);
    this.props.SetStatusFoto('cancelado', this.props.idButton);
  }

render() {
  return (
    <>
      <Button style={styles.btnCustom} onPress={() => this.setModalVisible(true)} >
        <Text style={styles.textBtnCustom}>{this.props.textButton}</Text>
      </Button>
      <Camera handleCloseCamera={this.handleClose} isVisible={this.state.modalVisible} onChangePicture={this.pickImage} />
    </>
  );
}

}

