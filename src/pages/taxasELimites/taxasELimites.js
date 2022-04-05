import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Logo from '../../components/Logo/LogoBlomia.js';
import Button from '../../components/ButtonCustom/ButtonCustom.js';
import api from '../../config/api';
import {connect} from 'react-redux';

class TaxasELimites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fee: [],
    };
  }
  getTaxes = async () => {
    if (!this.props.client.company) {
      api
        .get('/requisition_settings/user/expenses')
        .then(response => {
          let feesReturned = [];

          feesReturned = response.data.map(item => item.fee);
          this.setState({fee: feesReturned});
        })
        .catch(error => {});
    }
  };
  componentDidMount() {
    this.getTaxes();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.text}>Taxas e limites</Text>
          </View>
          <View style={styles.guidance}>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Veja abaixo as taxas que você paga para utilizar o aplicativo
              Blomia:
            </Text>
          </View>
          <View style={styles.guidance2}>
            <Text
              style={[
                styles.text,
                {fontSize: 15, textAlign: 'center', paddingHorizontal: wp(2)},
              ]}>
              As empresas não têm custo ao liberar saques e depósitos
            </Text>
          </View>
          <View style={styles.rows}>
            <View style={styles.columns}>
              <View style={styles.column1}>
                <Text style={styles.textColumn1}>LIBERAÇÃO SAQUE</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.textColumn2}>{this.state.fee[5]}</Text>
              </View>
            </View>
            <View
              style={[
                styles.columns,
                {borderTopWidth: 0.6, borderTopColor: 'black'},
              ]}>
              <View style={styles.column1}>
                <Text style={styles.textColumn1}>LIBERAÇÃO DEPÓSITO</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.textColumn2}>{this.state.fee[6]}</Text>
              </View>
            </View>
            <View
              style={[
                styles.columns,
                {borderTopWidth: 0.6, borderTopColor: 'black'},
              ]}>
              <View style={styles.column1}>
                <Text style={[styles.textColumn1, {paddingLeft: wp(3)}]}>
                  DEPÓSITO EM BOLETO EMPRESA
                </Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.textColumn2}>{this.state.fee[7]}</Text>
              </View>
            </View>
            <View
              style={[
                styles.columns,
                {borderTopWidth: 0.6, borderTopColor: 'black'},
              ]}>
              <View style={styles.column1}>
                <Text
                  style={[
                    styles.textColumn1,
                    {paddingLeft: wp(3), paddingTop: hp(3)},
                  ]}>
                  TRANSFERÊNCIA SALDO EMPRESA *por tempo determinado
                </Text>
              </View>
              <View style={styles.column2}>
                {/* <Image source={require('../../assets/images/values.png')}/> */}
                <Text
                  style={[
                    styles.textColumn2,
                    {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                      paddingTop: hp(2.7),
                    },
                  ]}>
                  {this.state.fee[7]}
                </Text>
                <Text style={styles.textColumn2}>R$ 0,00</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            ação={() => this.props.navigation.goBack()}
            btnColor="#333333"
            textButton="FECHAR"
            textColor="white"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({client}) => {
  return {
    client,
  };
};

export default connect(mapStateToProps)(TaxasELimites);
