import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { heightPercentageToDP } from 'react-native-responsive-screen';

// PAGINAS IMPORTADDAS
import Home from '../pages/homeCompany';
import Saque from '../pages/saqueEmpresa/saqueEmpresa';
import DepositoNav from './depositoEmpresaNav';
import EmpresaNav from '../pages/configEmpresa/configEmpresa';

const configTab = () => {
  return {
    inicioEmpresa: {
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
    sacarEmpresa: {
      screen: Saque,
      navigationOptions: {
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Saque
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
    depositoEmpresa: {
      screen: DepositoNav,
      navigationOptions: {
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Depósito
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
      },
    },
    EmpresaNavigation: {
      screen: EmpresaNav,
      navigationOptions: () => ({
        tabBarLabel: ({ focused }) => {
          const colorText = '#007F0B';
          return (
            !focused && (
              <Text style={[{ textAlign: 'center', color: colorText }]}>
                Configuração
              </Text>
            )
          );
        },
        labelStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require('../assets/images/icon-config-ativo.png')
            : require('../assets/images/icon-config.png');
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
  };
};

// const tabConfig = {
//   headerMode: 'none',
//   initialRouteName: 'inicioEmpresa',
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
