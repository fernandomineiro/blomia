import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import {styles} from './styles.js';
import Logo from '../../components/Logo/LogoBlomia.js';
import Button from '../../components/ButtonCustom/ButtonCustom.js';
import RNExitApp from 'react-native-exit-app';
// RNExitApp.exitApp();
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../config/api';
import ModalDuplo from '../../components/ModalDuplo/ModalDuplo.js';
class DesativaPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleExit: false,
    };
  }
  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };
  toggleExitModal = () => {
    this.setState({
      visibleExit: !this.state.visibleExit,
      visible: !this.state.visible,
    });
    this.deleteUser();
  };
  deleteUser = async () => {
    await api.delete('/auth');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Desativar meu perfil</Text>
          <View style={styles.firstParagraph}>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', paddingHorizontal: wp(17)},
              ]}>
              Tem certeza que deseja desativar seu perfil no Blomia?
            </Text>
          </View>
          <View style={styles.secondParagraph}>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', paddingHorizontal: wp(10)},
              ]}>
              Somente desative seu perfil se não deseja mais utilizar o
              aplicativo Blomia.
            </Text>
          </View>
          <View style={styles.thirdParagraph}>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', paddingHorizontal: wp(4)},
              ]}>
              Caso no futuro deseje voltar a utilize entre em contato com o{' '}
              <Text style={{fontFamily: 'Montserrat-Bold'}}>
                fale com a gente
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            ação={() =>
              this.props.navigation.navigate(
                this.props.client.company ? 'HomeCompany' : 'HomeClient',
              )
            }
            textButton="VOLTAR"
            textColor="white"
            btnColor="#333333"
            borderColor="#333333"
          />
          <Button
            ação={this.toggleModal}
            textButton="DESATIVAR PERFIL"
            textColor="white"
            btnColor="#ED3832"
            borderColor="#ED3832"
          />
        </View>
        <Modal
          useNativeDriver={true}
          isVisible={this.state.visible}
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.text}>
                Tem certeza que deseja desativar seu perfil?
              </Text>
            </View>
            <View style={styles.modalFiller} />
            <View style={styles.modalButtonFooter}>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text style={styles.text}>VOLTAR</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.toggleExitModal}>
                <Text style={styles.text}>SIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Modal useNativeDriver={true} isVisible={this.state.visibleExit} style={{height: 50, width: '100%', backgroundColor: 'white'}}>
                    <View style={{height: 100}}>
                    <View style={styles.modalFiller}/>
                        <Text>Seu perfil foi desativado.</Text>
                        <TouchableOpacity onPress={this.toggleExitModal}>
                            <Text style={styles.text}>FECHAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> */}
        <ModalDuplo
          conteudo={'Seu perfil foi desativado.'}
          function={RNExitApp.exitApp}
          buttonFunctionText={'FECHAR'}
          visibleExit={this.state.visibleExit}
        />
      </View>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(DesativaPerfil);
