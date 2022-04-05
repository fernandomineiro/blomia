import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Logo from '../../components/Logo/LogoBlomia.js';
import Button from '../../components/ButtonCustom/ButtonCustom.js';
import {styles} from './styles';
import api from '../../config/api';

class Privacidade extends Component {
  getPolicy = async () => {
    api
      .get('/privacy')
      .then(response => {
        this.setState({privacyPolicy: response.data.content});
      })
      .catch(error => {});
  };

  constructor(props) {
    super(props);
    this.state = {
      privacyPolicy: '',
    };
  }

  async componentDidMount() {
    await this.getPolicy();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>
        <View style={styles.content}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 15}}>
              Política de privacidade
            </Text>
          </View>
          <ScrollView
            enabled={true}
            contentContainerStyle={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14}}>
              {this.state.privacyPolicy}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button
            ação={() => {
              if (this.props.tipoChamada === 'modal') {
                this.props.functionSair();
              } else {
                this.props.navigation.navigate(
                  this.props.client.company ? 'HomeCompany' : 'HomeClient',
                );
              }
            }}
            textButton={'VOLTAR'}
            btnColor="#333333"
            textColor="white"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {client};
};

export default connect(mapStateToProps)(Privacidade);
