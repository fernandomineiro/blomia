import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize as rf } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

class CustomHeader extends Component {
  render() {
    const {
      navigation,
      client,
      isHome,
      hiddenButton,
      handleGoBack,
      buttonCancelled = false,
    } = this.props;

    const goBack = () => {
      if (handleGoBack) {
        handleGoBack();
      } else {
        navigation.goBack();
      }
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          height: hp('8%'),
          borderBottomColor: '#E6E6E6',
          borderBottomWidth: 2,
        }}
      >
        <View style={{ flex: 0.4, justifyContent: 'center' }}>
          {isHome && !hiddenButton ? (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{ width: wp(11), height: wp(11), marginLeft: wp(1) }}
                source={require('../../assets/images/icon_drawer.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            !hiddenButton && (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                // onPress={() => navigation.goBack()}>
                onPress={goBack}
              >
                <Icon
                  name="arrow-left"
                  size={28}
                  color="#007f0b"
                  style={styles.btBackHome}
                />
              </TouchableOpacity>
            )
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={styles.imgLogo}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../assets/images/blomialogo.png')}
          />
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {buttonCancelled && (
            <TouchableOpacity
              onPress={() => {
                if (client.company) {
                  navigation.navigate('inicioEmpresa');
                } else {
                  navigation.navigate('inicioCliente');
                }
              }}
            >
              <Text style={styles.textButtonCancelled}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ client }) => {
  return { client };
};

export default connect(mapStateToProps)(CustomHeader);
