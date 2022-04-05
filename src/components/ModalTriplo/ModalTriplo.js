import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';
import { styles } from './styles';

export default class ModalTriplo extends Component {
  render() {
    return (
      <Modal
        useNativeDriver
        animationType="fade"
        isVisible={this.props.isModalVisible}
      >
        <View style={[styles.container]}>
          <Text
            style={[
              styles.conteudoTexto,
              { fontSize: this.props.TamanhoDoTexto },
            ]}
          >
            {this.props.ConteudoTextoModal}
          </Text>
          <View style={styles.botões}>
            <TouchableOpacity style={styles.buttom} onPress={this.props.Fechar}>
              <Text
                style={[
                  styles.estiloTextoBotão1,
                  { color: this.props.CorBotãoFechar },
                ]}
              >
                {this.props.TextoBotãoFechar}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttom} onPress={this.props.Função}>
              <Text
                style={[
                  styles.estiloTextoBotão2,
                  { color: this.props.CorBotãoFunção },
                ]}
              >
                {this.props.TextoBotãoFunção}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

/*
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EXEMPLO DE UTILIZAÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>                    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>                    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                Necessário definir toggleModal no componente onde será usado.
                <ModalTriplo
                    ConteudoTextoModal={'Isso é um teste de modal Isso é um teste de modal Isso é um teste de modal Isso é um teste de modal'}
                    TextoBotãoFechar={'FECHAR'}
                    TextoBotãoFunção={'FUNÇÃO'}
                    TamanhoDoTexto={20}
                    CorBotãoFechar={'red'}
                    CorBotãoFunção={'green'}
                    isModalVisible={this.state.isModalVisible}
                    Fechar={() => this.toggleModal()}
                />
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>                    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>                    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
