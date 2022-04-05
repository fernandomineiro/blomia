import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Logo from '../../components/Logo/LogoBlomia.js';
import Button from '../../components/ButtonCustom/ButtonCustom.js';
import {styles} from './styles';
import api from '../../config/api';

class Contrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contrato: '',
    };
  }
  getTerms = async () => {
    api
      .get('/terms_and_conditions')
      .then(response => {
        this.setState({contrato: response.data.content});
      })
      .catch(error => {});
  };
  componentDidMount() {
    this.getTerms();
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
              Termos de Uso
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14}}>
              {this.state.contrato}
            </Text>
            {/* <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14}}>
                            Quisque nunc sapien,
                            efficitur at justo vel, lobortis commodo nisi. Sed nec
                            urna et quam feugiat venenatis. Ut tincidunt nulla ac
                            dui tempor porttitor. Vivamus vitae arcu nec felis
                            ullamcorper dapibus. In sit amet est egestas,
                            interdum mi in, vulputate mi. Mauris condimentum
                            urna id nulla auctor congue. Cras in velit ut mauris
                            porttitor rhoncus.
                        </Text>
                        <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14}}>
                            Donec non neque nec mi auctor congue nec a mauris.
                            Phasellus odio purus, efficitur vel aliquet feugiat,
                            dapibus a urna. Curabitur vulputate nisi quis sapien
                            tincidunt bibendum. Mauris at arcu blandit, vehicula
                            enim aliquam, pulvinar felis. Nam ultrices justo quis
                            consectetur facilisis. Fusce sagittis tellus et metus.
                        </Text> */}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button
            ação={() =>
              this.props.navigation.navigate(
                this.props.client.company ? 'HomeCompany' : 'HomeClient',
              )
            }
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

export default connect(mapStateToProps)(Contrato);
