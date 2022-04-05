import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles.js';
import Logo from '../../components/Logo/LogoBlomia.js';
import Button from '../../components/ButtonCustom/ButtonCustom.js';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

class FaleConosco extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>
        <View style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={[styles.text, {fontFamily: 'Montserrat-SemiBold'}]}>
              Fale com a gente
            </Text>
          </View>
          <View style={styles.containerPhrase}>
            <Text style={styles.phrase}>
              Queremos ouvir o que você tem a dizer sobre o Blomia, fique à
              vontade para nos contatar:
            </Text>
          </View>
          <View style={styles.containerMail}>
            <Text style={styles.mail}>contato@blomia.com.br</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            ação={() =>
              this.props.navigation.navigate(
                this.props.client.company ? 'HomeCompany' : 'HomeClient',
              )
            }
            textButton={'FECHAR'}
            textColor="#FFFFFF"
            btnColor="#333333"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(FaleConosco);
