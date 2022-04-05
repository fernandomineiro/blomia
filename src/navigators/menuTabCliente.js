import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { NavigationActions } from 'react-navigation';
import { heightPercentageToDP } from 'react-native-responsive-screen';

// PAGINAS IMPORTADDAS
import Home from '../pages/homeClient';
import Saque from '../pages/saque/saque';
import extrato from '../pages/extrato/extrato';
import DepositoScreen from '../pages/deposito';

const configTab = () => {
  return {
    inicioCliente: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Início
              </Text>
            )
          );
        },
        labelStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require('../assets/images/icon-inicio-ativo.png')
            : require('../assets/images/icon-inicio.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={focused ? styles.iconTabAtive : styles.iconTabInative}
            />
          );
        },
      },
    },
    sacarCliente: {
      screen: Saque,
      navigationOptions: {
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Sacar
              </Text>
            )
          );
        },
        labelStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require('../assets/images/icon-sacar-ativo.png')
            : require('../assets/images/icon-sacar.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={focused ? styles.iconTabAtive : styles.iconTabInative}
            />
          );
        },
      },
    },
    depositoCliente: {
      screen: DepositoScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Depositar
              </Text>
            )
          );
        },
        labelStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require('../assets/images/icon-depositar-ativo.png')
            : require('../assets/images/icon-depositar.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={focused ? styles.iconTabAtive : styles.iconTabInative}
            />
          );
        },
      }),
    },
    extratoCliente: {
      screen: extrato,
      navigationOptions: {
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Extrato
              </Text>
            )
          );
        },
        labelStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require('../assets/images/icon-extrato-ativo.png')
            : require('../assets/images/icon-extrato.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={focused ? styles.iconTabAtive : styles.iconTabInative}
            />
          );
        },
      },
    },
  };
};

// const tabConfig = {
//   headerMode: 'none',
//   initialRouteName: 'inicioCliente',
//   activeColor: '#f0edf6',
//   inactiveColor: '#3e2465',
//   navigationOptions: {
//     headerVisible: false,
//   },
//   tabBarOptions: {
//     showLabel: true,
//   },
// };

const styles = StyleSheet.create({
  iconTabAtive: {
    height: heightPercentageToDP('7%'),
    width: heightPercentageToDP('7%'),
  },
  iconTabInative: {
    height: heightPercentageToDP('4%'),
    width: heightPercentageToDP('5%'),
    marginTop: heightPercentageToDP('1%'),
  },
});

const MenuTab = createBottomTabNavigator(configTab(), {
  barStyle: { justifyContent: 'center' },
  tabBarOptions: {
    style: { height: heightPercentageToDP('7%') },
  },
});

export default MenuTab;
