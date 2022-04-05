import React from 'react';
import {SafeAreaView, Image, View, Text} from 'react-native';
import TedEmpresaWelcome from './tedEmpresaWelcome';

class TedEmpresa extends React.Component {
  render() {
    return <TedEmpresaWelcome navigation={this.props.navigation} />;
  }
}

export default TedEmpresa;
