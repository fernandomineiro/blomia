import React, {Component} from 'react';
import {Text} from 'react-native';
import styles from './styles';
import Ripple from 'react-native-material-ripple';

export default class ButtonCustom extends Component {
  render() {
    return (
      <Ripple
        rippleCentered={true}
        onPress={this.props.navegar || this.props.ação}
        style={[
          styles.btnCustom,
          {
            backgroundColor: this.props.btnColor,
            borderColor: this.props.borderColor,
          },
          {...this.props.styleCustom},
        ]}>
        <Text style={[styles.textBtnCustom, {color: this.props.textColor}]}>
          {this.props.textButton}
        </Text>
      </Ripple>
    );
  }
}
