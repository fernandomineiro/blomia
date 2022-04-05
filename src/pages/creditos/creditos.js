import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Logo from '../../components/Logo/LogoBlomia';
import Button from '../../components/ButtonCustom/ButtonCustom';

import { styles } from './styles';

class Creditos extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo />
          </View>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text
                style={[styles.text, { fontFamily: 'Montserrat-SemiBold' }]}
              >
                Créditos
              </Text>
            </View>
            <View style={styles.paragraph}>
              <Text
                style={[
                  styles.text,
                  {
                    textAlign: 'center',
                    fontSize: 15,
                    paddingHorizontal: wp(8),
                  },
                ]}
              >
                Aquele agradecimento especial aos designers deste planeta que
                criaram nossos ícones incríveis!
              </Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.textList}>Pixel perfect</Text>
              <Text style={styles.textList}>Monkey</Text>
              <Text style={styles.textList}>Freepik</Text>
              <Text style={styles.textList}>Itim2101</Text>
              <Text style={styles.textList}>Retinaicons</Text>
              <Text style={styles.textList}>Monkik</Text>
              <Text style={styles.textList}>Smashicons</Text>
              <Text style={styles.textList}>Those-icons</Text>
              <Text style={styles.textList}>Kiranshastry</Text>
              <Text style={styles.textList}>Xnimrodx</Text>
              <Text style={styles.textListCredit}>por www.flaticon.com</Text>
            </View>
            <Button
              ação={() =>
                this.props.navigation.navigate(
                  this.props.client.company ? 'HomeCompany' : 'HomeClient',
                )
              }
              textButton="VOLTAR"
              btnColor="#333333"
              textColor="white"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ client }) => {
  return { client };
};

export default connect(mapStateToProps)(Creditos);
