import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import setVisibilityBalanceRedux from '../../store/actions/setVisibilityBalance';

import styles from './styles';

function Balance({ balance, setVisibilityBalance }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textPrefix}>{'Dinheiro \ndisponível:'}</Text>
      <Text style={styles.textValueBalance}>
        {balance.visibility && `R$${balance.value}`}
      </Text>
      <TouchableOpacity
        onPress={() => setVisibilityBalance(!balance.visibility)}
      >
        <Icon
          name={balance.visibility ? 'eye' : 'eye-off'}
          size={30}
          color="#007f0b"
        />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = ({ balance }) => {
  return {
    balance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setVisibilityBalance: visibility =>
      dispatch(setVisibilityBalanceRedux(visibility)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
